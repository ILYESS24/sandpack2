# Guide de déploiement sur Render

Ce guide explique comment déployer Sandpack sur Render.

## 🚀 Déploiement automatique avec render.yaml

Le fichier `render.yaml` à la racine du projet configure automatiquement tous les services.

### Services configurés

1. **sandpack-landing** - Site principal (website/landing)
2. **sandpack-docs** - Documentation (website/docs)
3. **sandpack-theme** - Démonstration des thèmes (website/theme)

## 📋 Étapes de déploiement

### Option 1 : Déploiement via render.yaml (Recommandé)

1. **Connecter votre repository GitHub/GitLab/Bitbucket à Render** :
   - Allez sur [dashboard.render.com](https://dashboard.render.com)
   - Cliquez sur "New" → "Blueprint"
   - Connectez votre repository
   - Render détectera automatiquement le fichier `render.yaml`

2. **Configurer les variables d'environnement** :
   - Dans le dashboard Render, allez dans les paramètres de chaque service
   - Ajoutez les variables d'environnement nécessaires :
     - `NEXT_PUBLIC_AMPLITUDE_API_KEY` (optionnel, pour analytics)

3. **Déployer** :
   - Render déploiera automatiquement tous les services configurés
   - Chaque service aura son propre URL

### Option 2 : Déploiement manuel service par service

#### Service Landing

1. Créez un nouveau **Web Service** sur Render
2. Configuration :
   - **Name**: `sandpack-landing`
   - **Runtime**: Node
   - **Region**: Oregon (ou votre région préférée)
   - **Root Directory**: `website/landing`
   - **Build Command**:
     ```bash
     yarn install && \
     yarn workspace @codesandbox/sandpack-client build && \
     yarn workspace @codesandbox/sandpack-react build && \
     yarn workspace @codesandbox/sandpack-themes build && \
     yarn workspace sandpack-landing build
     ```
   - **Start Command**: `yarn workspace sandpack-landing start`
   - **Plan**: Starter (ou supérieur selon vos besoins)

#### Service Docs

1. Créez un nouveau **Web Service** sur Render
2. Configuration :
   - **Name**: `sandpack-docs`
   - **Runtime**: Node
   - **Region**: Oregon
   - **Root Directory**: `website/docs`
   - **Build Command**:
     ```bash
     yarn install && \
     yarn workspace @codesandbox/sandpack-client build && \
     yarn workspace @codesandbox/sandpack-react build && \
     yarn workspace @codesandbox/sandpack-themes build && \
     yarn workspace sandpack-docs build
     ```
   - **Start Command**: `yarn workspace sandpack-docs start`

#### Service Theme

1. Créez un nouveau **Web Service** sur Render
2. Configuration :
   - **Name**: `sandpack-theme`
   - **Runtime**: Node
   - **Region**: Oregon
   - **Root Directory**: `website/theme`
   - **Build Command**:
     ```bash
     yarn install && \
     yarn workspace @codesandbox/sandpack-client build && \
     yarn workspace @codesandbox/sandpack-react build && \
     yarn workspace @codesandbox/sandpack-themes build && \
     yarn workspace sandpack-theme build
     ```
   - **Start Command**: `yarn workspace sandpack-theme start`

## ⚙️ Prérequis

- Node.js 18+ (Render utilise Node 18 par défaut)
- Yarn (pour la gestion du monorepo)
- Un compte Render (gratuit disponible)

## 🔧 Détails techniques

### Structure du monorepo

Le projet utilise Yarn Workspaces et Turbo pour gérer les dépendances :

```
sandpack/
├── sandpack-client/      # Package client (doit être buildé en premier)
├── sandpack-react/       # Package React (dépend de client)
├── sandpack-themes/      # Package themes (dépend de client)
└── website/
    ├── landing/          # Site principal
    ├── docs/             # Documentation
    └── theme/            # Démo des thèmes
```

### Ordre de build

Les packages doivent être construits dans cet ordre :
1. `@codesandbox/sandpack-client`
2. `@codesandbox/sandpack-react`
3. `@codesandbox/sandpack-themes`
4. Enfin, le site web (landing/docs/theme)

### Variables d'environnement

- `NODE_ENV`: `production` (défini automatiquement)
- `NEXT_PUBLIC_AMPLITUDE_API_KEY`: Clé API Amplitude pour analytics (optionnel)

## 📝 Notes importantes

1. **Build time** : Le premier build peut prendre 5-10 minutes car tous les packages doivent être construits
2. **Cache** : Render met en cache les `node_modules` entre les builds
3. **Monorepo** : Render supporte nativement les monorepos avec Yarn Workspaces
4. **Auto-deploy** : Par défaut, Render déploie automatiquement à chaque push sur la branche principale

## 🚨 Dépannage

### Erreur de build

Si le build échoue, vérifiez :
1. Que tous les workspaces sont correctement configurés
2. Que les commandes de build sont dans le bon ordre
3. Les logs de build dans le dashboard Render

### Erreur de dépendances

Si les dépendances locales ne sont pas trouvées :
1. Vérifiez que les packages sont bien buildés avant le site
2. Assurez-vous que `yarn install` est exécuté à la racine

### Timeout de build

Si le build prend trop de temps :
1. Augmentez le timeout dans les paramètres du service
2. Vérifiez que le cache est activé
3. Considérez utiliser un plan supérieur (Standard ou Pro)

## 🔗 URLs après déploiement

Après le déploiement, chaque service aura une URL comme :
- Landing: `https://sandpack-landing.onrender.com`
- Docs: `https://sandpack-docs.onrender.com`
- Theme: `https://sandpack-theme.onrender.com`

Vous pouvez configurer des domaines personnalisés dans les paramètres de chaque service.

## ✅ Checklist de déploiement

- [ ] Repository connecté à Render
- [ ] Fichier `render.yaml` présent à la racine
- [ ] Variables d'environnement configurées (si nécessaire)
- [ ] Build réussi pour tous les services
- [ ] Services accessibles via leurs URLs
- [ ] Domaines personnalisés configurés (optionnel)

## 📚 Ressources

- [Documentation Render](https://render.com/docs)
- [Guide des monorepos sur Render](https://render.com/docs/monorepos)
- [Configuration Next.js sur Render](https://render.com/docs/nextjs)

