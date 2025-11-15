#!/bin/bash
# Script de déploiement pour GitHub Pages

echo "🚀 Déploiement du portfolio vers GitHub Pages..."

# Build du projet
echo "📦 Construction du projet..."
npm run build

# Ajout du fichier CNAME pour le domaine personnalisé
echo "zainebchakroun.me" > dist/CNAME

# Ajout des fichiers de build au git
echo "📝 Ajout des fichiers de build..."
git add dist/ -f

# Commit des changements
echo "💾 Commit des changements..."
git commit -m "Update portfolio build - $(date)"

# Push vers GitHub Pages avec git subtree
echo "🚀 Déploiement vers GitHub Pages..."
git subtree push --prefix=dist origin main

echo "✅ Déploiement terminé ! Votre site sera disponible sur https://zainebchakroun.me dans quelques minutes."
