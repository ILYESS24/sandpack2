# 🚀 Déploiement Rapide sur Render

## Étapes rapides

### 1. Préparer le repository

Assurez-vous que votre code est poussé sur GitHub/GitLab/Bitbucket.

### 2. Créer un compte Render

1. Allez sur [render.com](https://render.com)
2. Créez un compte (gratuit disponible)
3. Connectez votre compte GitHub/GitLab/Bitbucket

### 3. Déployer avec Blueprint (Recommandé)

1. Dans le dashboard Render, cliquez sur **"New"** → **"Blueprint"**
2. Sélectionnez votre repository `sandpack2-main`
3. Render détectera automatiquement le fichier `render.yaml`
4. Cliquez sur **"Apply"**
5. Render créera automatiquement les 3 services :
   - `sandpack-landing`
   - `sandpack-docs`
   - `sandpack-theme`

### 4. Configurer les variables d'environnement (optionnel)

Si vous utilisez Amplitude pour analytics :
1. Allez dans chaque service → **Environment**
2. Ajoutez : `NEXT_PUBLIC_AMPLITUDE_API_KEY` = votre clé

### 5. Attendre le déploiement

- Le premier build peut prendre 5-10 minutes
- Vous pouvez suivre la progression dans les logs
- Une fois terminé, chaque service aura son URL

## 📍 URLs après déploiement

- Landing: `https://sandpack-landing.onrender.com`
- Docs: `https://sandpack-docs.onrender.com`
- Theme: `https://sandpack-theme.onrender.com`

## ⚡ Déploiement manuel (si Blueprint ne fonctionne pas)

### Service Landing uniquement

1. **New** → **Web Service**
2. Connectez votre repository
3. Configuration :
   - **Name**: `sandpack-landing`
   - **Root Directory**: `website/landing`
   - **Build Command**:
     ```bash
     yarn install && yarn workspace @codesandbox/sandpack-client build && yarn workspace @codesandbox/sandpack-react build && yarn workspace @codesandbox/sandpack-themes build && cd website/landing && yarn build
     ```
   - **Start Command**: `cd website/landing && yarn start`
   - **Plan**: Starter (gratuit)

4. Cliquez sur **Create Web Service**

## ✅ Vérification

Une fois déployé, vérifiez que :
- [ ] Les 3 services sont en ligne (status: Live)
- [ ] Les URLs sont accessibles
- [ ] L'assistant IA fonctionne (bouton 🤖 en bas à droite)

## 🔧 Dépannage

**Build échoue ?**
- Vérifiez les logs dans Render
- Assurez-vous que Node.js 18+ est sélectionné
- Vérifiez que toutes les dépendances sont installées

**Service ne démarre pas ?**
- Vérifiez les logs de démarrage
- Assurez-vous que le port est bien configuré (Next.js utilise 3000 par défaut)

**Timeout de build ?**
- Le plan Starter a un timeout de 45 minutes
- Si nécessaire, passez au plan Standard

## 📚 Documentation complète

Pour plus de détails, consultez [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

