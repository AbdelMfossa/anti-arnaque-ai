# Anti-Arnaque Bouclier 🛡️

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://anti-arnaque-bouclier-763148804756.europe-west2.run.app/)

**Anti-Arnaque Bouclier** est une application web interactive qui utilise l'IA multimodale pour aider les personnes vulnérables à détecter instantanément les escroqueries en ligne. 

Elle analyse les textes (fausses offres d'emploi, phishing) et les fichiers audio (deepfakes vocaux) pour évaluer le niveau de risque et fournir un conseil de sécurité immédiat.

## ✨ Fonctionnalités

- 📝 **Analyse Textuelle** : Détection des techniques de manipulation, du jargon suspect et des tactiques d'urgence dans les emails, SMS ou offres d'emploi.
- 🎙️ **Détection de Deepfake Vocal** : Analyse des fichiers audio (.mp3, .wav) pour identifier les anomalies vocales et les clones IA utilisés pour l'usurpation d'identité.
- ⚖️ **Évaluation du Risque** : Un score clair (Sûr, Suspect, Danger) accompagné d'un diagnostic détaillé et des "signaux d'alarme" repérés.
- 💡 **Conseils Immédiats** : Recommandations concrètes sur la marche à suivre pour se protéger.
- 🔒 **Vie Privée** : Analyse en direct via l'API Gemini sans stockage persistant des données utilisateur.

## 🚀 Technologies utilisées

- **Frontend** : [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Intelligence Artificielle** : [Google Gemini API](https://ai.google.dev/) (SDK `@google/genai`)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Animations** : [Motion](https://motion.dev/) (framer-motion)
- **Icons** : [Lucide React](https://lucide.dev/)

## 🛠️ Installation et configuration

### Prérequis
- Node.js (version 18 ou supérieure)
- Une clé API Gemini (disponible sur [Google AI Studio](https://aistudio.google.com/))

### Étapes

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-utilisateur/anti-arnaque-bouclier.git
   cd anti-arnaque-bouclier
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Créez un fichier `.env` à la racine du projet :
   ```env
   VITE_GEMINI_API_KEY=votre_cle_api_ici
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

## 📦 Build pour la production

```bash
npm run build
```

## 🛡️ Confidentialité

Ce projet a été conçu avec une approche "Privacy-First". Les contenus soumis pour analyse sont envoyés à l'API de Google Gemini pour traitement mais ne sont ni stockés en base de données, ni conservés par l'application elle-même.

---

*Développé avec passion pour protéger les citoyens contre la cybercriminalité.*
