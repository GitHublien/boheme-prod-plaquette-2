 const fs = require('fs');

console.log('🚀 Démarrage de la mise à jour des chemins...\n');

// Créer la structure de dossiers
const directories = [
    'assets',
    'assets/videos',
    'assets/audio', 
    'assets/images',
    'assets/images/logos',
    'assets/images/photos',
    'assets/images/graphics'
];

console.log('📁 Création des dossiers...');
directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`✅ Dossier créé: ${dir}`);
    } else {
        console.log(`ℹ️ Dossier existe déjà: ${dir}`);
    }
});

// Configuration des remplacements pour HTML
const htmlReplacements = {
    'magique-fumee.mp4': 'assets/videos/magique-fumee.mp4',
    'lasers-couleur-mouvement.mp4': 'assets/videos/lasers-couleur-mouvement.mp4',
    'smoke_red_bg.mp4': 'assets/videos/smoke_red_bg.mp4',
    'partitions_flow.mp4': 'assets/videos/partitions_flow.mp4',
    'AIR_SING_BOHEME.mp3': 'assets/audio/AIR_SING_BOHEME.mp3',
    'logo-boheme-en-or.png': 'assets/images/logos/logo-boheme-en-or.png',
    'artistes-boheme.jpg': 'assets/images/photos/artistes-boheme.jpg',
    'Elie Féré HD.jpg': 'assets/images/photos/Elie Féré HD.jpg',
    'boheme-artistic-collage.png': 'assets/images/graphics/boheme-artistic-collage.png',
    'trilogie_lyrique.png': 'assets/images/graphics/trilogie_lyrique.png',
    'trio_piano.png': 'assets/images/graphics/trio_piano.png',
    'Boheme Production en blanc.png': 'assets/images/logos/Boheme Production en blanc.png'
};

// Configuration des remplacements pour CSS
const cssReplacements = {
    "url('image-en-or.png')": "url('../assets/images/logos/image-en-or.png')",
    'url("image-en-or.png")': 'url("../assets/images/logos/image-en-or.png")',
    "url('images-en-or-2.png')": "url('../assets/images/logos/images-en-or-2.png')",
    'url("images-en-or-2.png")': 'url("../assets/images/logos/images-en-or-2.png")'
};

// Fonction pour mettre à jour un fichier
function updateFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ Fichier non trouvé: ${filePath}`);
        return;
    }

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasChanges = false;

        for (const [oldPath, newPath] of Object.entries(replacements)) {
            if (content.includes(oldPath)) {
                content = content.replaceAll(oldPath, newPath);
                console.log(`✅ ${filePath}: ${oldPath} → ${newPath}`);
                hasChanges = true;
            }
        }

        if (hasChanges) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`📝 Fichier mis à jour: ${filePath}\n`);
        } else {
            console.log(`ℹ️ Aucun changement nécessaire: ${filePath}\n`);
        }
    } catch (error) {
        console.error(`❌ Erreur: ${filePath} - ${error.message}`);
    }
}

console.log('\n📝 Mise à jour des fichiers...\n');

// Mettre à jour index.html
updateFile('index.html', htmlReplacements);

// Mettre à jour les fichiers CSS
const cssFiles = [
    'css/variables.css',
    'css/layout.css', 
    'css/components.css',
    'css/responsive.css'
];

cssFiles.forEach(file => {
    updateFile(file, cssReplacements);
});

console.log('✨ Mise à jour terminée !');
console.log('\n📋 Prochaines étapes:');
console.log('1. Déplacez vos fichiers médias dans les dossiers assets/ correspondants');
console.log('2. Testez votre site pour vérifier que tout fonctionne');
console.log('3. Supprimez les anciens fichiers de la racine une fois que tout marche');
