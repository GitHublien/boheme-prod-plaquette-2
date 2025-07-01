# 🎭 Bohème Production - Plaquette Interactive

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://GitHublien.github.io/boheme-prod-plaquette-2/)
[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> **Une expérience interactive premium présentant l'excellence artistique de Bohème Production**

Plaquette web interactive moderne et élégante pour Bohème Production, organisme de spectacle dédié à l'excellence lyrique en Côte d'Azur. Cette application web offre une expérience immersive avec navigation fluide, design responsive et intégration multimédia complète.

**🌐 Site en ligne :** https://GitHublien.github.io/boheme-prod-plaquette-2/

## 🌟 Aperçu du Projet

**Bohème Production** réunit une constellation artistique exceptionnelle de **41 chanteurs de renommée internationale**, créant une alchimie parfaite entre opéra traditionnel, pop lyrique et variété internationale. Cette plaquette interactive présente l'univers artistique de la compagnie avec une technologie web de pointe.

## ✨ Fonctionnalités

### 🎵 **Expérience Multimédia**
- **Audio ambiant** avec contrôles intégrés (lecture/pause, volume, sourdine)
- **Vidéos de fond** dynamiques et immersives
- **Animations fluides** respectant les préférences d'accessibilité
- **Transitions élégantes** entre les sections
- **Police personnalisée** Cloister Black pour les titres

### 🖱️ **Navigation Avancée**
- **Navigation tactile optimisée** pour mobile et tablette
- **Support molette** intelligent pour desktop
- **Navigation clavier** complète (flèches, Page Up/Down, Home/End)
- **Points de navigation** visuels avec tooltips
- **Mode présentation** plein écran pour projections

### 📱 **Design Responsive**
- **Mobile-first** avec breakpoints optimisés (320px à 4K+)
- **Adaptatif** sur tous les écrans
- **Performance optimisée** avec lazy loading
- **Accessibilité** WCAG 2.1 compliant

### 🎭 **Sections Interactives**
- **Couverture** avec logo animé et call-to-action
- **Présentation** type magazine avec contenu riche
- **Notre Bureau** - galerie de l'équipe dirigeante
- **Nos Artistes** - navigation par catégories (Sopranos, Ténors, Barytons, Pianistes)
- **Productions** - showcase des créations
- **Contact** - informations et localisation

## 🏗️ Architecture Technique

### 📁 **Structure Modulaire**

```
boheme-production/
├── 📄 index.html                    # Structure HTML principale
├── 📁 css/                          # Styles modulaires (4 fichiers)
│   ├── variables.css                # Variables CSS et base (233 lignes)
│   ├── layout.css                  # Structure et navigation (477 lignes)
│   ├── components.css              # Composants spécifiques (138 lignes)
│   └── responsive.css              # Media queries (653 lignes)
├── 📁 js/                           # Logique JavaScript
│   ├── main.js                     # Navigation et interactions
│   ├── navigation.js               # Gestion navigation spécialisée
│   └── workflow.js                 # Utilitaires développement
├── 📁 fonts/                       # Polices personnalisées
│   └── CloisterBlack/              # Police titre (CRITIQUE)
│       └── CloisterBlack.ttf       # Fichier police personnalisée
├── 📁 assets/                      # Ressources multimédia
│   ├── 📁 videos/                  # Vidéos de fond (.mp4)
│   ├── 📁 audio/                   # Musique d'ambiance (.mp3)
│   └── 📁 images/                  # Images organisées
│       ├── logos/                  # Logos et icônes
│       │   ├── image-en-or.png     # Logo principal doré
│       │   └── images-en-or-2.png  # Logo secondaire
│       ├── photos/                 # Photos des artistes
│       └── graphics/               # Illustrations et graphiques
├── 📄 workflow.js                  # Script de gestion workflow
├── 📄 font-changer.js              # Script modification polices
├── 📄 font-diagnostic.js           # Diagnostic problèmes polices
├── 📄 github-deploy-fix.bat        # Script déploiement automatique
└── 📄 README.md                    # Cette documentation
```

### 🎨 **Technologies Utilisées**

| Technologie | Version | Usage |
|-------------|---------|--------|
| **HTML5** | Latest | Structure sémantique |
| **CSS3** | Latest | Styles avec variables custom |
| **JavaScript ES6+** | Latest | Logique interactive |
| **Google Fonts** | API | Typographies premium |
| **Material Icons** | Latest | Iconographie cohérente |
| **GitHub Pages** | - | Hébergement automatique |

## 🚀 Installation et Déploiement

### **Prérequis**
- Navigateur moderne (Chrome 90+, Firefox 88+, Safari 14+)
- Git installé
- Connexion internet (pour les polices et icônes)

### **Installation Locale**

```bash
# Cloner le repository
git clone https://github.com/GitHublien/boheme-prod-plaquette-2.git

# Naviguer dans le dossier
cd boheme-prod-plaquette-2

# Ouvrir le site
# Option 1: Double-clic sur index.html
# Option 2: Serveur local (recommandé)
python -m http.server 8000
# ou
npx serve .

# Accéder à http://localhost:8000
```

### **Déploiement Automatique GitHub**

```bash
# Script de déploiement complet (RECOMMANDÉ)
github-deploy-fix.bat

# Le script va :
# 1. Vérifier la configuration Git
# 2. Copier tous les fichiers dans deploy-temp/
# 3. Pousser vers GitHub automatiquement
# 4. Configurer GitHub Pages
```

### **Déploiement Manuel**

```bash
# Si le script automatique échoue
cd deploy-temp
git add .
git commit -m "Update: description des changements"
git push -u origin main

# Puis activer GitHub Pages :
# Repository Settings → Pages → Deploy from branch → main
```

## 🎮 Utilisation

### **Navigation**

| Action | Desktop | Mobile |
|--------|---------|--------|
| **Section suivante** | ↓ Flèche / Page Down / Molette bas | Swipe vers le haut |
| **Section précédente** | ↑ Flèche / Page Up / Molette haut | Swipe vers le bas |
| **Première section** | Home | Navigation dots |
| **Dernière section** | End | Navigation dots |
| **Mode présentation** | F11 | Bouton audio controls |

### **Contrôles Audio**
- 🔄 **Play/Pause** : Lecture de la musique d'ambiance
- 🔇 **Mute/Unmute** : Contrôle du son
- 🔊 **Volume** : Slider de réglage
- 📺 **Mode Présentation** : Plein écran optimisé

### **Sections Artistes**
- Navigation par **onglets** : Sopranos, Ténors, Barytons, Pianistes
- **41 artistes** présentés avec catégorisation professionnelle
- Lien vers le **site complet** pour découvrir tous les talents

## 🛠️ Architecture CSS Modulaire

### **Variables CSS (variables.css)**
```css
:root {
  --gold: #D4AF37;           /* Or principal */
  --gold-light: #F9F1DB;     /* Or clair */
  --gold-dark: #A58728;      /* Or foncé */
  --cream: #FFFCF6;          /* Crème */
  --dark: #1A1A1A;           /* Texte principal */
  --shadow-gold: 0 0 15px rgba(212,175,55,0.3);
}
```

### **Structure (layout.css)**
```css
/* Navigation par points */
.navigation { /* Points de navigation fixes */ }

/* Sections principales */
.section-container { /* Containers des sections */ }

/* Mode présentation */
.presentation-mode { /* Plein écran optimisé */ }
```

### **Composants (components.css)**
```css
/* Contrôles audio */
.audio-controls { /* Interface audio intégrée */ }

/* Cartes équipe */
.bureau-grid { /* Grille responsive équipe */ }

/* Points de fin de section */
.section-end-point { /* Transitions entre sections */ }
```

### **Responsive (responsive.css)**
```css
/* Mobile et tablettes */
@media (max-width: 768px) { /* Navigation mobile */ }
@media (max-width: 576px) { /* Mobile strict */ }

/* Desktop large */
@media (min-width: 1200px) { /* Optimisations grand écran */ }

/* Mode impression */
@media print { /* Optimisations impression */ }
```

## 🔧 Scripts de Développement

### **Scripts Utilitaires Disponibles**

| Script | Usage | Description |
|--------|-------|-------------|
| `github-deploy-fix.bat` | **Déploiement** | Script principal de déploiement GitHub |
| `font-diagnostic.js` | `node font-diagnostic.js` | Diagnostic problèmes de police |
| `workflow.js` | `node workflow.js` | Utilitaires de workflow |

### **Workflow de Développement**

```bash
# 1. Développement local
# Modifier les fichiers CSS/HTML/JS
# Tester dans le navigateur

# 2. Test responsive
# Utiliser DevTools pour tester mobile/tablette

# 3. Déploiement
github-deploy-fix.bat

# 4. Vérification
# Contrôler https://GitHublien.github.io/boheme-prod-plaquette-2/
```

## 🎯 Performance et Optimisations

### **Optimisations Implémentées**
- ✅ **CSS modulaire** pour chargement efficace
- ✅ **Font-display: swap** pour la police Cloister Black
- ✅ **Transform3D** pour accélération GPU
- ✅ **Will-change** sur les éléments animés
- ✅ **Lazy loading** concept pour les images
- ✅ **Compression** des assets

### **Métriques Cibles**
- 🟢 **Performance** : 90+
- 🟢 **Accessibilité** : 95+
- 🟢 **Bonnes Pratiques** : 100
- 🟢 **SEO** : 90+

### **Taille du Déploiement**
- **Total** : ~184 Mo (principalement assets et police)
- **HTML/CSS/JS** : < 200 Ko
- **Police Cloister Black** : Majorité du poids
- **Assets** : Images et vidéos optimisées

## 📱 Compatibilité

### **Navigateurs Supportés**
| Navigateur | Desktop | Mobile |
|------------|---------|--------|
| **Chrome** | ✅ 90+ | ✅ 90+ |
| **Firefox** | ✅ 88+ | ✅ 88+ |
| **Safari** | ✅ 14+ | ✅ 14+ |
| **Edge** | ✅ 90+ | ✅ 90+ |

### **Résolutions Testées**
- 📱 **Mobile** : 320px - 768px
- 📊 **Tablette** : 768px - 1024px
- 🖥️ **Desktop** : 1024px - 4K+

### **Points de Rupture Responsive**
```css
/* Mobile */
@media (max-width: 576px)

/* Tablette */
@media (max-width: 768px)

/* Desktop */
@media (min-width: 1200px)

/* Mode paysage mobile */
@media (max-height: 600px) and (orientation: landscape)
```

## 🐛 Résolution de Problèmes

### **Problèmes Courants et Solutions**

| Problème | Symptôme | Solution |
|----------|----------|----------|
| **Police Cloister Black** | Titres en Great Vibes | `Ctrl+F5` pour vider le cache |
| **Navigation bloquée** | Sections ne changent pas | Vérifier console JavaScript (F12) |
| **Déploiement échoue** | Erreur Git | Utiliser `github-deploy-fix.bat` |
| **Images manquantes** | Placeholders dorés | Vérifier chemins dans `assets/` |

### **Scripts de Diagnostic**

```bash
# Diagnostic complet police
node font-diagnostic.js

# Test isolé police
node font-diagnostic.js test
# Crée test-font.html pour test direct

# Vérification configuration Git
git remote -v
git status
```

## 🎭 À Propos de Bohème Production

**Bohème Production** est un organisme de spectacle fondé par **Patrick Elie Féré**, baryton verdien et producteur reconnu. L'aventure artistique naît de la rencontre créative avec **Richard Alexandre Rittelmann** et **Norah Amsellem**, créant une synergie unique qui révolutionne l'univers du spectacle vivant.

### **Notre Vision**
Créer une alchimie parfaite entre l'opéra traditionnel, la pop lyrique et la variété internationale, touchant le cœur de chaque spectateur, qu'il soit novice ou connaisseur éclairé.

### **Notre Équipe Artistique**
- **41 chanteurs** de renommée internationale
- **Sopranos, Ténors, Barytons** de premier plan
- **3 maîtres du piano** et chefs d'orchestre
- **Direction artistique** multi-facettes
- **Rayonnement** Côte d'Azur et international

### **Équipe de Production**
- **Patrick Elie Féré** - Fondateur, Direction artistique
- **Richard Alexandre Rittelmann** - Co-fondateur
- **Norah Amsellem** - Co-fondatrice

## 📞 Contact & Localisation

- 🌐 **Site Principal** : [bohemeproduction.com](https://www.bohemeproduction.com)
- 📧 **Email** : contact@bohemeproduction.com
- 📍 **Localisation** : Côte d'Azur, France
- ⏰ **Disponibilité** : 7j/7 pour vos projets artistiques

### **Réseaux Sociaux**
- 📘 Facebook : Bohème Production
- 📷 Instagram : @bohemeproduction
- 🎵 YouTube : Bohème Production Officiel

## 🤝 Contribution et Développement

### **Standards de Code**
- **HTML** : HTML5 sémantique, indentation 2 espaces
- **CSS** : Organisation modulaire, variables CSS, mobile-first
- **JavaScript** : ES6+, commentaires explicites, fonctions pures

### **Workflow Git**
```bash
# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Faire les modifications
git add .
git commit -m "feat: description de la fonctionnalité"

# Déployer
github-deploy-fix.bat
```

### **Structure des Commits**
```bash
feat: nouvelle fonctionnalité
fix: correction de bug
style: amélioration CSS
perf: optimisation performance
docs: mise à jour documentation
```

## 📚 Documentation Technique

### **Fichiers de Documentation**
- **README.md** : Documentation utilisateur (ce fichier)
- **AI-HANDOVER.md** : Briefing technique complet pour développeurs
- **Workflow intégré** : Scripts automatisés inclus

### **Pour Développeurs Externes**
Le fichier `AI-HANDOVER.md` contient toutes les informations techniques nécessaires pour reprendre le développement, incluant l'historique des problèmes résolus et l'architecture complète.

## 📄 Licence et Crédits

© 2025 **Bohème Production**. Tous droits réservés.

### **Équipe de Développement Web**
- **Mickaël Guedj** - Conception d'expérience interactive et musicale, Design numérique, Musique originale, Réalisation, Production assistée par IA
- **Stéphanie Doméjean** - Créations textuelles et visuelles, Paroles, Photographies
- **Développement technique** - Architecture web moderne et responsive

### **Technologies & Ressources**
- **Google Fonts** - Typographies premium
- **Material Design Icons** - Iconographie
- **GitHub Pages** - Hébergement
- **Web APIs** modernes - Fonctionnalités avancées

---

## 🌟 Changelog

### **Version Actuelle (Décembre 2024)**
- ✅ Police Cloister Black intégrée et fonctionnelle
- ✅ Architecture CSS modulaire complète (4 fichiers)
- ✅ Navigation responsive perfectionnée
- ✅ Déploiement GitHub Pages automatisé
- ✅ Mode présentation opérationnel
- ✅ Contrôles audio intégrés
- ✅ 41 artistes catégorisés et présentés

### **Améliorations Futures**
- 🔮 PWA (Progressive Web App)
- 🔮 Animations CSS avancées
- 🔮 Intégration CMS headless
- 🔮 Optimisations SEO avancées

---

**Transformez vos rêves artistiques en réalité avec Bohème Production** ✨

[![Découvrir Bohème Production](https://img.shields.io/badge/🎭%20Découvrir%20Bohème%20Production-Live%20Demo-gold?style=for-the-badge)](https://GitHublien.github.io/boheme-prod-plaquette-2/)