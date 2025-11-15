# Script de déploiement pour GitHub Pages (PowerShell)

Write-Host "🚀 Déploiement du portfolio vers GitHub Pages..." -ForegroundColor Green

# Build du projet
Write-Host "📦 Construction du projet..." -ForegroundColor Yellow
npm run build

# Ajout du fichier CNAME pour le domaine personnalisé
Write-Host "📝 Création du fichier CNAME..." -ForegroundColor Yellow
"zainebchakroun.me" | Out-File -FilePath "dist\CNAME" -Encoding ASCII

# Ajout des fichiers de build au git
Write-Host "📝 Ajout des fichiers de build..." -ForegroundColor Yellow
git add dist/ -f

# Commit des changements
Write-Host "💾 Commit des changements..." -ForegroundColor Yellow
$currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Update portfolio build - $currentDate"

# Push vers GitHub Pages avec git subtree
Write-Host "🚀 Déploiement vers GitHub Pages..." -ForegroundColor Yellow
git subtree push --prefix=dist origin main

Write-Host "✅ Déploiement terminé ! Votre site sera disponible sur https://zainebchakroun.me dans quelques minutes." -ForegroundColor Green
