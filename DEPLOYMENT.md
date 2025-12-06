# Guide de déploiement sur Vercel

Ce projet est un monorepo avec plusieurs sites Next.js déployables sur Vercel.

## 🚀 Sites disponibles

1. **Landing** (`website/landing`) - Site principal
2. **Docs** (`website/docs`) - Documentation avec Nextra
3. **Theme** (`website/theme`) - Site de démonstration des thèmes

## 📋 Configuration Vercel

Chaque site a son propre fichier `vercel.json` avec la configuration appropriée.

### Option 1 : Déploiement via l'interface Vercel (Recommandé)

1. **Pour chaque site**, créez un nouveau projet sur Vercel :
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Add New Project"
   - Importez votre repository

2. **Configuration pour Landing** :
   - **Root Directory**: `website/landing`
   - **Build Command**: `yarn workspace @codesandbox/sandpack-client build && yarn workspace @codesandbox/sandpack-react build && yarn workspace @codesandbox/sandpack-themes build && yarn build`
   - **Install Command**: `yarn install`
   - **Output Directory**: `.next`

3. **Configuration pour Docs** :
   - **Root Directory**: `website/docs`
   - **Build Command**: `yarn workspace @codesandbox/sandpack-client build && yarn workspace @codesandbox/sandpack-react build && yarn workspace @codesandbox/sandpack-themes build && yarn build`
   - **Install Command**: `yarn install`
   - **Output Directory**: `.next`

4. **Configuration pour Theme** :
   - **Root Directory**: `website/theme`
   - **Build Command**: `yarn workspace @codesandbox/sandpack-client build && yarn workspace @codesandbox/sandpack-react build && yarn workspace @codesandbox/sandpack-themes build && yarn build`
   - **Install Command**: `yarn install`
   - **Output Directory**: `.next`

### Option 2 : Déploiement via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Pour chaque site, depuis la racine du projet :
cd website/landing
vercel

# ou pour docs :
cd website/docs
vercel

# ou pour theme :
cd website/theme
vercel
```

## ⚙️ Prérequis

- Node.js 16+ (recommandé : 18+)
- Yarn (pour la gestion du monorepo)

## 🔧 Détails techniques

- Les sites dépendent de packages locaux (`@codesandbox/sandpack-*`) qui doivent être construits avant le build
- Le monorepo utilise Yarn Workspaces et Turbo
- Les fichiers `vercel.json` dans chaque dossier `website/*` contiennent la configuration nécessaire

## ⚠️ Notes importantes

1. **Dépendances locales** : Les packages `sandpack-client`, `sandpack-react`, et `sandpack-themes` doivent être construits avant chaque déploiement
2. **Base paths** :
   - Docs utilise le basePath `/docs`
   - Theme utilise le basePath `/theme`
   - Landing n'a pas de basePath
3. **Environnement** : Assurez-vous que les variables d'environnement nécessaires sont configurées dans Vercel

## ✅ Compatibilité Vercel

- ✅ Next.js 14
- ✅ Monorepo avec Yarn Workspaces
- ✅ Build de dépendances locales
- ✅ Configuration via vercel.json

