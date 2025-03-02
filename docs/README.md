# Hat Dynamic Template (HDT)

## 🌟 Introduction

Hat Dynamic Template est un framework de développement front-end conçu pour créer des sites web modulaires et maintenables. Il combine les technologies suivantes :

- **Eleventy** : Générateur de sites statiques
- **Nunjucks** : Moteur de templates
- **TailwindCSS v4** : Framework CSS utility-first
- **Storybook** : Développement de composants isolés
- **Decap CMS** : Gestion de contenu

### Architecture

Le projet suit l'architecture OMA (Organism-Molecule-Atom) pour garantir une structure de composants claire et évolutive.

## 🔧 Prérequis

- Node.js (v20.0.0 recommandé, minimum v18.0.0)
- npm (dernière version)
- Git

## 🚀 Installation Rapide

### Sur Linux/macOS

```sh
curl -O https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.sh && chmod +x setup-project.sh && ./setup-project.sh
```

### Sur Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/theHat13/dynamic-template/main/docs/scripts/setup-project.ps1" -OutFile "setup-project.ps1" ; .\setup-project.ps1
```

## 📦 Installation Manuelle

1. **Cloner le dépôt**

   ```sh
   git clone https://github.com/theHat13/dynamic-template.git votre-projet
   cd votre-projet
   ```

2. **Installer les dépendances**

   ```sh
   npm install
   ```

3. **Installer Storybook**

   ```sh
   npm install --save-dev @storybook/html @storybook/addon-essentials
   npx storybook init --builder webpack5
   ```

## 🖥 Scripts NPM

- `npm start` : Démarrer le serveur de développement
- `npm run build` : Compiler le site pour la production
- `npm run refresh` : Nettoyer le cache et les fichiers générés
- `npm run storybook` : Démarrer Storybook
- `npm run build-storybook` : Compiler Storybook pour la production

## 🛠 Personnalisation

### Styles

- Modifier `src/input.css` pour ajouter des styles personnalisés
- Utiliser le thème Tailwind pour maintenir la cohérence visuelle

### Composants

Suivre l'architecture OMA :

- **Atoms** : Composants de base (boutons, champs de formulaire)
- **Molecules** : Combinaisons d'atoms (cartes, en-têtes de section)
- **Organisms** : Sections complètes (en-tête, pied de page)

### Storybook

- Créer des stories de composants dans le dossier `stories`
- Développer et documenter les composants de manière isolée
- Suivre la convention de nommage : `nomComposant.stories.js`

## 🚢 Déploiement

### Netlify

1. Connecter le dépôt GitHub à Netlify
2. Configurer les paramètres de build :
   - Commande de build : `npm run build`
   - Répertoire de publication : `public`

### Configuration Decap CMS

1. Activer l'authentification Netlify Identity
2. Inviter les administrateurs via le panneau Netlify Identity
3. Configurer `src/admin/config.yml` selon vos besoins

## 🔄 Maintenance des Technologies

Utilisez le script `check_web_versions.sh` (Unix) ou `check_web_versions.ps1` (Windows) pour :

- Vérifier les versions actuelles
- Comparer avec les dernières versions disponibles
- Mettre à jour de manière interactive

Technologies surveillées :

- Node.js
- npm
- Eleventy
- Nunjucks
- TailwindCSS
- Storybook
- Decap CMS

## 🤝 Contribution

Les contributions sont les bienvenues ! Créez une pull request ou ouvrez une issue pour discuter des améliorations.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

Pour toute question ou assistance, contactez : <carpentier.dev@gmail.com>