/**
 * Script pour mettre à jour automatiquement tous les chemins vers les assets
 * Lancez ce script Node.js après avoir organisé vos fichiers
 */

const fs = require('fs');
const path = require('path');

// Configuration des chemins
const pathMappings = {
    // Vidéos
    'magique-fumee.mp4': 'assets/videos/magique-fumee.mp4',
    'lasers-couleur-mouvement.mp4': 'assets/videos/lasers-couleur-mouvement.mp4',
    'smoke_red_bg.mp4': 'assets/videos/smoke_red_bg.mp4',
    'partitions_flow.mp4': 'assets/videos/partitions_flow.mp4',
    
    // Audio
    'AIR_SING_BOHEME.mp3': 'assets/audio/AIR_SING_BOHEME.mp3',
    
    // Images - Logos
    'logo-boheme-en-or.png': 'assets/images/logos/logo-boheme-en-or.png',
    'Boheme Production en blanc.png': 'assets/images/logos/Boheme Production en blanc.png',
    'image-en-or.png': '../assets/images/logos/image-en-or.png', // Pour CSS
    'images-en-or-2.png': '../assets/images/logos/images-en-or-2.png', // Pour CSS
    
    // Images - Photos
    'artistes-boheme.jpg': 'assets/images/photos/artistes-boheme.jpg',
    'Elie Féré HD.jpg': 'assets/images/photos/Elie Féré HD.jpg',
    
    // Images - Graphiques
    'boheme-artistic-collage.png': 'assets/images/graphics/boheme-artistic-collage.png',
    'trilogie_lyrique.png': 'assets/images/graphics/trilogie_lyrique.png',
    'trio_piano.png': 'assets/images/graphics/trio_piano.png'
};

// Fichiers à mettre à jour
const filesToUpdate = [
    'index.html',
    'css/variables.css',
    'css/layout.css',
    'css/components.css',
    'css/responsive.css'
];

// Fonction pour mettre à jour un fichier
function updateFilePaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;
        
        // Pour les fichiers CSS, ajuster les chemins relatifs
        const isCSSFile = filePath.includes('.css');
        
        for (const [oldPath, newPath] of Object.entries(pathMappings)) {
            const searchPath = isCSSFile && newPath.startsWith('../') ? newPath : newPath.replace('../', '');
            const finalNewPath = isCSSFile ? (newPath.startsWith('../') ? newPath : `../${newPath}`) : newPath;
            
            if (content.includes(oldPath)) {
                content = content.replace(new RegExp(oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 
                                        isCSSFile ? finalNewPath : newPath);
                updated = true;
                console.log(`✅ ${filePath}: ${oldPath} → ${isCSSFile ? finalNewPath : newPath}`);
            }
        }
        
        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`📝 Fichier mis à jour: ${filePath}\n`);
        } else {
            console.log(`ℹ️ Aucun changement nécessaire: ${filePath}\n`);
        }
        
    } catch (error) {
        console.error(`❌ Erreur lors du traitement de ${filePath}:`, error.message);
    }
}

// Créer la structure de dossiers
function createAssetDirectories() {
    const directories = [
        'assets',
        'assets/videos',
        'assets/audio', 
        'assets/images',
        'assets/images/logos',
        'assets/images/photos',
        'assets/images/graphics'
    ];
    
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Dossier créé: ${dir}`);
        }
    });
}

// Exécution du script
console.log('🚀 Démarrage de la mise à jour des chemins...\n');

// Créer les dossiers
createAssetDirectories();

console.log('\n📝 Mise à jour des fichiers...\n');

// Mettre à jour chaque fichier
filesToUpdate.forEach(updateFilePaths);

console.log('✨ Mise à jour terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Déplacez vos fichiers médias dans les dossiers assets/ correspondants');
console.log('2. Testez votre site pour vérifier que tous les assets se chargent correctement');
console.log('3. Supprimez les anciens fichiers médias de la racine du projet');
