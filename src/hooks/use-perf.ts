import { useEffect, useMemo, useRef, useState } from 'react';

export interface PerfMode {
  reducedMotion: boolean;
  saveData: boolean;
  lowEndDevice: boolean;
  lowFpsDetected?: boolean;
  isLowPower: boolean; // any of the above
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function getSaveData(): boolean {
  // Network Information API is not supported everywhere
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nav = typeof navigator !== 'undefined' ? (navigator as any) : undefined;
  return Boolean(nav?.connection?.saveData);
}

function getLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const hc = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dm = (navigator as any).deviceMemory as number | undefined;
  const ua = navigator.userAgent || '';

  const isOldAndroid = /Android\s([0-8])\./i.test(ua);
  const isLowThreads = typeof hc === 'number' && hc > 0 && hc <= 4;
  const isLowMem = typeof dm === 'number' && dm > 0 && dm <= 4;

  return Boolean(isOldAndroid || isLowThreads || isLowMem);
}

export function usePerfMode(): PerfMode {
  const [reducedMotion, setReducedMotion] = useState(getPrefersReducedMotion());
  const [saveData] = useState(getSaveData());
  const [lowEndDevice] = useState(getLowEndDevice());
  const [lowFpsDetected, setLowFpsDetected] = useState(false);
  const fpsCheckDoneRef = useRef(false);
  
  // Detect specifically low-end mobile devices - only once on mount
  const [isLowEndMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isLowEndAndroid = /Android/i.test(ua) && (
      // Detect low-end or older Android devices
      /Android [4-9]\./i.test(ua) || // Android 4-9
      /Android 1[0-1]\./i.test(ua) || // Android 10-11
      window.innerWidth < 768 // Small screen mobile
    );
    return isMobileUA && (isLowEndAndroid || window.innerWidth < 768);
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    // Safari fallback
    // @ts-ignore
    mq.addListener?.(onChange);
    return () => {
      mq.removeEventListener?.('change', onChange);
      // @ts-ignore
      mq.removeListener?.(onChange);
    };
  }, []);

  // Lightweight runtime FPS probe: sample for ~1.5s and mark low power if <45 FPS.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (fpsCheckDoneRef.current) return;
    // Only probe on first mount, and only if not already clearly low power
    const alreadyLow = reducedMotion || saveData || lowEndDevice || isLowEndMobile;
    if (alreadyLow) {
      fpsCheckDoneRef.current = true;
      return;
    }

    let rafId = 0;
    let start = performance.now();
    let frames = 0;
    const DURATION = 1500; // ms

    const loop = () => {
      frames += 1;
      const now = performance.now();
      if (now - start < DURATION) {
        rafId = requestAnimationFrame(loop);
      } else {
        const fps = (frames * 1000) / (now - start);
        if (fps < 45) setLowFpsDetected(true);
        fpsCheckDoneRef.current = true;
      }
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
    // Intentionally run once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLowPower = useMemo(
    () => reducedMotion || saveData || lowEndDevice || isLowEndMobile || lowFpsDetected,
    [reducedMotion, saveData, lowEndDevice, isLowEndMobile, lowFpsDetected]
  );

  return { reducedMotion, saveData, lowEndDevice, lowFpsDetected, isLowPower };
}
