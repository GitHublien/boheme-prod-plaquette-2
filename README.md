# 🎭 Bohème Production - Site Web Interactif

Un site web moderne et interactif pour Bohème Production, conçu comme une expérience immersive de type magazine avec navigation fluide entre les sections.

## 📋 Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Structure du Projet](#structure-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Configuration](#configuration)
- [Navigation](#navigation)
- [Responsive Design](#responsive-design)
- [Accessibilité](#accessibilité)
- [Performance](#performance)
- [Développement](#développement)
- [Dépannage](#dépannage)

## 🎯 Aperçu

Le site Bohème Production est une expérience web immersive qui présente la compagnie théâtrale à travers différentes sections navigables :

- **Cover** : Page d'accueil avec logo animé
- **Intro** : Présentation de la compagnie (format magazine)
- **Bureau** : Équipe dirigeante
- **Artistes** : Présentation des artistes
- **Productions** : Spectacles et créations
- **Contact** : Informations de contact

## ✨ Fonctionnalités

### Navigation Avancée
- 🖱️ **Navigation molette** avec accumulation intelligente
- 👆 **Navigation tactile** optimisée (swipe vertical)
- ⌨️ **Navigation clavier** complète (flèches, espace, Page Up/Down)
- 🎯 **Navigation par points** (dots navigation)
- 🖥️ **Mode présentation** avec support plein écran

### Expérience Utilisateur
- 🎵 **Audio ambiant** avec transitions fluides
- 🎬 **Vidéos d'arrière-plan** intégrées
- ✨ **Animations CSS** sophistiquées
- 📱 **Design responsive** adaptatif
- ♿ **Accessibilité** complète (ARIA, navigation clavier)

### Performance
- ⚡ **Chargement optimisé** des médias
- 🔄 **Lazy loading** des ressources
- 📊 **Monitoring des performances**
- 🛡️ **Gestion d'erreurs** robuste

## 📁 Structure du Projet

```
boheme-production/
├── index.html              # Page principale
├── README.md              # Documentation
├── config.js              # Configuration globale
├── navigation.js          # Système de navigation
├── css/
│   ├── variables.css      # Variables CSS (couleurs, espacements)
│   ├── base.css          # Styles de base et reset
│   ├── sections.css      # Styles des sections Cover + Intro
│   ├── sections-complement.css  # Styles sections Bureau, Artistes, etc.
│   ├── components.css    # Composants réutilisables
│   └── responsive.css    # Media queries et responsive
└── assets/
    ├── images/           # Images et logos
    ├── videos/           # Vidéos d'arrière-plan
    └── audio/            # Fichiers audio
```

## 🚀 Installation

### Prérequis
- Serveur web local (Apache, Nginx, ou serveur de développement)
- Navigateur moderne supportant ES6+

### Installation Simple
1. **Télécharger** tous les fichiers du projet
2. **Placer** les fichiers dans votre répertoire web
3. **Créer** le dossier `assets/` avec les sous-dossiers :
   ```
   assets/
   ├── images/
   ├── videos/
   └── audio/
   ```
4. **Ajouter** vos médias dans les dossiers correspondants
5. **Ouvrir** `index.html` dans votre navigateur

### Serveur de Développement
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

## 🎮 Utilisation

### Navigation
- **Molette souris** : Scroll vers le haut/bas pour naviguer
- **Tactile** : Swipe vertical sur mobile/tablette
- **Clavier** :
  - `↑/↓` : Section précédente/suivante
  - `Page Up/Down` : Navigation rapide
  - `Home/End` : Première/dernière section
  - `Espace` : Section suivante
  - `F11` ou `F` : Mode plein écran
  - `Échap` : Sortir du mode présentation

### Points de Navigation
Cliquez sur les points à droite de l'écran pour naviguer directement vers une section.

## ⚙️ Configuration

Le fichier `config.js` contient tous les paramètres personnalisables :

### Navigation
```javascript
navigation: {
    touchThreshold: 250,        // Distance minimum pour swipe
    velocityThreshold: 1.2,     // Vitesse minimum
    wheelThreshold: 200,        // Seuil molette
    // ...
}
```

### Performance
```javascript
performance: {
    lazyLoadOffset: '100px',    // Offset lazy loading
    videoPreload: 'metadata',   // Préchargement vidéo
    transitionDuration: 600     // Durée transitions
}
```

### Audio
```javascript
audio: {
    defaultVolume: 0.3,         // Volume par défaut
    fadeInDuration: 1000,       // Durée fade in
    fadeOutDuration: 500        // Durée fade out
}
```

## 🎨 Personnalisation

### Variables CSS
Modifiez `css/variables.css` pour personnaliser :
- **Couleurs** : `--gold`, `--cream`, `--dark`
- **Typographie** : `--font-primary`, `--font-secondary`
- **Espacements** : `--spacing-sm`, `--spacing-md`, etc.
- **Transitions** : `--transition-fast`, `--transition-slow`

### Sections
Ajoutez de nouvelles sections dans `config.js` :
```javascript
sections: {
    list: ['cover', 'intro', 'nouvelle-section'],
    names: ['Couverture', 'Présentation', 'Nouvelle Section']
}
```

## 📱 Responsive Design

Le site s'adapte automatiquement à tous les écrans :
- **Mobile** : < 768px (navigation tactile optimisée)
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px (navigation molette)

### Points de Rupture
```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablette */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

## ♿ Accessibilité

### Fonctionnalités Incluses
- **Navigation clavier** complète
- **Attributs ARIA** appropriés
- **Contraste** respectant WCAG 2.1
- **Respect des préférences** de mouvement réduit
- **Focus visible** sur tous les éléments interactifs

### Préférences Utilisateur
Le site respecte automatiquement :
- `prefers-reduced-motion` : Désactive les animations
- `prefers-color-scheme` : Mode sombre (si implémenté)

## ⚡ Performance

### Optimisations Incluses
- **Lazy loading** des images et vidéos
- **Préchargement intelligent** des médias
- **Debouncing/Throttling** des événements
- **Monitoring des performances** intégré

### Métriques
Le système surveille automatiquement :
- Temps de chargement initial
- Performance des transitions
- Erreurs de chargement des médias

## 🛠️ Développement

### Structure du Code
- **Modulaire** : Chaque fonctionnalité dans son fichier
- **Configurable** : Paramètres centralisés
- **Extensible** : API publique pour extensions
- **Maintenable** : Code documenté et structuré

### API JavaScript
```javascript
// Accès à l'instance de navigation
const nav = window.BohemeNavigation;

// Méthodes publiques
nav.getCurrentSection();        // Section actuelle
nav.getSectionName();          // Nom de la section
nav.navigateToSection(2);      // Aller à la section 2
nav.isNavigationBlocked();     // État de la navigation
```

### Événements Personnalisés
```javascript
// Écouter les changements de section
document.addEventListener('boheme:section-change', (e) => {
    console.log('Section changée:', e.detail);
});

// Autres événements disponibles
// - boheme:audio-change
// - boheme:presentation-toggle
// - boheme:navigation-block
// - boheme:media-error
```

## 🐛 Dépannage

### Problèmes Courants

#### Navigation ne fonctionne pas
- Vérifiez que `config.js` est chargé avant `navigation.js`
- Contrôlez la console pour les erreurs JavaScript
- Assurez-vous que les IDs des sections correspondent à `CONFIG.sections.list`

#### Médias ne se chargent pas
- Vérifiez les chemins dans `CONFIG.media.paths`
- Contrôlez les permissions des fichiers
- Vérifiez les formats supportés par le navigateur

#### Performance lente
- Réduisez la taille des vidéos d'arrière-plan
- Optimisez les images (WebP recommandé)
- Ajustez `CONFIG.performance.lazyLoadOffset`

#### Navigation tactile sensible
- Augmentez `CONFIG.navigation.touchThreshold`
- Ajustez `CONFIG.navigation.velocityThreshold`
- Modifiez `CONFIG.navigation.timeThreshold`

### Debug
Activez le mode debug dans la console :
```javascript
// Afficher l'état global
console.log(GLOBAL_STATE);

// Afficher la configuration
console.log(CONFIG);

// Tester la navigation
BohemeNavigation.navigateToSection(1);
```

## 📞 Support

Pour toute question ou problème :
1. Consultez cette documentation
2. Vérifiez la console du navigateur
3. Testez avec les paramètres par défaut
4. Contactez l'équipe de développement

## 📄 Licence

© 2024 Bohème Production. Tous droits réservés.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Juin 2024  
**Compatibilité** : Navigateurs modernes (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
