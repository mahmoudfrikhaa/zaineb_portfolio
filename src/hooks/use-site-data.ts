import { useQuery } from "@tanstack/react-query";

export interface SiteData {
  site: {
    title: string;
    author: string;
    logo: string; // public path
    favicon?: string;
  };
  hero: {
    welcome: string;
    titleLeft: string;
    titleAccent: string;
    titleRight: string;
    subtitle: string | any;
    primaryCta: string;
    secondaryCta: string;
    cv: string; // public path
    profileImage: string; // public path
  };
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  about?: any;
  skills?: any;
  projects?: any;
  experience?: any;
  contact?: any;
  footer?: any;
}

async function fetchSiteData(): Promise<SiteData> {
  const res = await fetch("/data.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load data.json: ${res.status}`);
  return res.json();
}

export function useSiteData() {
  return useQuery({
    queryKey: ["site-data"],
    queryFn: fetchSiteData,
    staleTime: 5 * 60 * 1000,
  });
}
