/**
 * BOHÈME PRODUCTION - GESTIONNAIRE D'ASSETS
 * Gestion complète des médias, optimisation et vérification
 */

const fs = require('fs');
const path = require('path');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// ================================
// CONFIGURATION DES ASSETS
// ================================

const ASSET_CONFIG = {
    directories: {
        base: 'assets',
        videos: 'assets/videos',
        audio: 'assets/audio',
        images: 'assets/images',
        logos: 'assets/images/logos',
        photos: 'assets/images/photos',
        graphics: 'assets/images/graphics'
    },
    extensions: {
        videos: ['.mp4', '.webm', '.mov'],
        audio: ['.mp3', '.wav', '.ogg'],
        images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
    },
    maxSizes: {
        video: 50 * 1024 * 1024,      // 50MB
        audio: 10 * 1024 * 1024,      // 10MB
        image: 5 * 1024 * 1024        // 5MB
    }
};

// ================================
// CLASSE PRINCIPALE ASSET MANAGER
// ================================

class AssetManager {
    constructor() {
        this.stats = {
            total: 0,
            videos: 0,
            audio: 0,
            images: 0,
            size: 0,
            broken: []
        };
    }

    // ================================
    // ANALYSE COMPLÈTE DU PROJET
    // ================================

    async analyzeProject() {
        log('\n🔍 ANALYSE COMPLÈTE DU PROJET', 'magenta');
        log('==============================', 'magenta');

        await this.scanAssets();
        await this.verifyLinks();
        await this.checkOptimization();
        this.generateReport();
    }

    // ================================
    // SCAN DES ASSETS
    // ================================

    async scanAssets() {
        log('\n📁 Scan des assets...', 'blue');
        
        this.resetStats();

        // Créer les dossiers manquants
        this.ensureDirectories();

        // Scanner chaque dossier
        for (const [name, dirPath] of Object.entries(ASSET_CONFIG.directories)) {
            if (name === 'base') continue;
            
            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath);
                log(`📂 ${dirPath}: ${files.length} fichiers`, 'cyan');
                
                files.forEach(file => {
                    const filePath = path.join(dirPath, file);
                    const stats = fs.statSync(filePath);
                    const ext = path.extname(file).toLowerCase();
                    
                    this.stats.total++;
                    this.stats.size += stats.size;
                    
                    // Catégoriser par type
                    if (ASSET_CONFIG.extensions.videos.includes(ext)) {
                        this.stats.videos++;
                        this.checkFileSize(filePath, stats.size, 'video');
                    } else if (ASSET_CONFIG.extensions.audio.includes(ext)) {
                        this.stats.audio++;
                        this.checkFileSize(filePath, stats.size, 'audio');
                    } else if (ASSET_CONFIG.extensions.images.includes(ext)) {
                        this.stats.images++;
                        this.checkFileSize(filePath, stats.size, 'image');
                    }
                });
            } else {
                log(`⚠️ Dossier manquant: ${dirPath}`, 'yellow');
            }
        }
    }

    // ================================
    // VÉRIFICATION DES LIENS
    // ================================

    async verifyLinks() {
        log('\n🔗 Vérification des liens...', 'blue');
        
        const filesToCheck = [
            'index.html',
            'css/variables.css',
            'css/layout.css',
            'css/components.css',
            'css/responsive.css'
        ];

        let brokenLinks = [];
        let totalLinks = 0;

        for (const file of filesToCheck) {
            if (fs.existsSync(file)) {
                const content = fs.readFileSync(file, 'utf8');
                const links = this.extractAssetLinks(content, file);
                
                log(`📄 ${file}: ${links.length} liens trouvés`, 'cyan');
                totalLinks += links.length;
                
                links.forEach(link => {
                    const assetPath = this.resolveAssetPath(link.path, file);
                    if (!fs.existsSync(assetPath)) {
                        brokenLinks.push({
                            file: file,
                            link: link.path,
                            line: link.line,
                            resolved: assetPath
                        });
                    }
                });
            }
        }

        this.stats.broken = brokenLinks;
        
        if (brokenLinks.length === 0) {
            log(`✅ Tous les ${totalLinks} liens sont valides !`, 'green');
        } else {
            log(`❌ ${brokenLinks.length} liens cassés trouvés`, 'red');
            brokenLinks.forEach(broken => {
                log(`   ${broken.file}:${broken.line} → ${broken.link}`, 'red');
            });
        }
    }

    // ================================
    // VÉRIFICATION DE L'OPTIMISATION
    // ================================

    async checkOptimization() {
        log('\n⚡ Vérification de l\'optimisation...', 'blue');
        
        const suggestions = [];

        // Vérifier les gros fichiers
        this.scanDirectory(ASSET_CONFIG.directories.videos, (file, stats) => {
            if (stats.size > 20 * 1024 * 1024) { // 20MB
                suggestions.push({
                    type: 'compression',
                    file: file,
                    size: this.formatSize(stats.size),
                    suggestion: 'Vidéo volumineuse - envisager la compression'
                });
            }
        });

        // Vérifier les formats d'images
        this.scanDirectory(ASSET_CONFIG.directories.images, (file, stats) => {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.png' && stats.size > 1024 * 1024) {
                suggestions.push({
                    type: 'format',
                    file: file,
                    size: this.formatSize(stats.size),
                    suggestion: 'PNG volumineux - envisager WebP ou JPEG'
                });
            }
        });

        if (suggestions.length === 0) {
            log('✅ Optimisation correcte !', 'green');
        } else {
            log(`💡 ${suggestions.length} suggestions d'optimisation:`, 'yellow');
            suggestions.forEach(s => {
                log(`   ${s.file} (${s.size}) - ${s.suggestion}`, 'yellow');
            });
        }

        this.stats.suggestions = suggestions;
    }

    // ================================
    // MAINTENANCE ET NETTOYAGE
    // ================================

    async cleanProject() {
        log('\n🧹 NETTOYAGE DU PROJET', 'magenta');
        log('======================', 'magenta');

        // Supprimer les fichiers temporaires
        const tempPatterns = ['*.tmp', '*.temp', '.DS_Store', 'Thumbs.db'];
        let cleaned = 0;

        const cleanDirectory = (dir) => {
            if (!fs.existsSync(dir)) return;
            
            fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
                const fullPath = path.join(dir, dirent.name);
                
                if (dirent.isDirectory()) {
                    cleanDirectory(fullPath);
                } else {
                    const shouldDelete = tempPatterns.some(pattern => {
                        const regex = new RegExp(pattern.replace('*', '.*'));
                        return regex.test(dirent.name);
                    });
                    
                    if (shouldDelete) {
                        fs.unlinkSync(fullPath);
                        log(`🗑️ Supprimé: ${fullPath}`, 'yellow');
                        cleaned++;
                    }
                }
            });
        };

        cleanDirectory('.');
        
        if (cleaned === 0) {
            log('✅ Aucun fichier temporaire trouvé', 'green');
        } else {
            log(`✅ ${cleaned} fichiers temporaires supprimés`, 'green');
        }
    }

    // ================================
    // SAUVEGARDE DES ASSETS
    // ================================

    async backupAssets() {
        log('\n💾 SAUVEGARDE DES ASSETS', 'magenta');
        log('========================', 'magenta');

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const backupDir = `backup-assets-${timestamp}`;

        try {
            // Créer le dossier de sauvegarde
            fs.mkdirSync(backupDir, { recursive: true });
            
            // Copier récursivement le dossier assets
            this.copyDirectory(ASSET_CONFIG.directories.base, path.join(backupDir, 'assets'));
            
            // Créer un fichier de métadonnées
            const metadata = {
                timestamp: new Date().toISOString(),
                stats: this.stats,
                project: 'Bohème Production',
                version: '1.0'
            };
            
            fs.writeFileSync(
                path.join(backupDir, 'backup-info.json'), 
                JSON.stringify(metadata, null, 2)
            );
            
            log(`✅ Sauvegarde créée: ${backupDir}`, 'green');
            log(`📊 ${this.stats.total} fichiers sauvegardés (${this.formatSize(this.stats.size)})`, 'cyan');
            
        } catch (error) {
            log(`❌ Erreur lors de la sauvegarde: ${error.message}`, 'red');
        }
    }

    // ================================
    // GÉNÉRATION DE RAPPORT
    // ================================

    generateReport() {
        log('\n📊 RAPPORT D\'ANALYSE', 'magenta');
        log('===================', 'magenta');
        
        log(`📁 Total des assets: ${this.stats.total}`, 'cyan');
        log(`🎬 Vidéos: ${this.stats.videos}`, 'cyan');
        log(`🎵 Audio: ${this.stats.audio}`, 'cyan');
        log(`🖼️ Images: ${this.stats.images}`, 'cyan');
        log(`💾 Taille totale: ${this.formatSize(this.stats.size)}`, 'cyan');
        
        if (this.stats.broken.length > 0) {
            log(`❌ Liens cassés: ${this.stats.broken.length}`, 'red');
        } else {
            log(`✅ Tous les liens fonctionnent`, 'green');
        }
        
        // Sauvegarder le rapport
        const report = {
            timestamp: new Date().toISOString(),
            stats: this.stats,
            status: this.stats.broken.length === 0 ? 'healthy' : 'needs_attention'
        };
        
        fs.writeFileSync('asset-report.json', JSON.stringify(report, null, 2));
        log('\n💾 Rapport sauvegardé: asset-report.json', 'green');
    }

    // ================================
    // MÉTHODES UTILITAIRES
    // ================================

    resetStats() {
        this.stats = {
            total: 0,
            videos: 0,
            audio: 0,
            images: 0,
            size: 0,
            broken: [],
            suggestions: []
        };
    }

    ensureDirectories() {
        Object.values(ASSET_CONFIG.directories).forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                log(`📁 Dossier créé: ${dir}`, 'yellow');
            }
        });
    }

    checkFileSize(filePath, size, type) {
        const maxSize = ASSET_CONFIG.maxSizes[type];
        if (size > maxSize) {
            log(`⚠️ Fichier volumineux: ${filePath} (${this.formatSize(size)})`, 'yellow');
        }
    }

    extractAssetLinks(content, filename) {
        const links = [];
        const patterns = [
            // HTML src et href
            /(?:src|href)=["']([^"']+)["']/g,
            // CSS url()
            /url\(["']?([^"')]+)["']?\)/g
        ];

        patterns.forEach(pattern => {
            let match;
            while ((match = pattern.exec(content)) !== null) {
                const link = match[1];
                // Filtrer les liens d'assets locaux
                if (link.startsWith('assets/') || link.includes('assets/') || 
                    ASSET_CONFIG.extensions.videos.some(ext => link.endsWith(ext)) ||
                    ASSET_CONFIG.extensions.audio.some(ext => link.endsWith(ext)) ||
                    ASSET_CONFIG.extensions.images.some(ext => link.endsWith(ext))) {
                    
                    links.push({
                        path: link,
                        line: content.substring(0, match.index).split('\n').length
                    });
                }
            }
        });

        return links;
    }

    resolveAssetPath(linkPath, fromFile) {
        // Résoudre les chemins relatifs
        if (linkPath.startsWith('../')) {
            const fileDir = path.dirname(fromFile);
            return path.resolve(fileDir, linkPath);
        }
        return linkPath;
    }

    scanDirectory(dir, callback) {
        if (!fs.existsSync(dir)) return;
        
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            if (stats.isFile()) {
                callback(filePath, stats);
            }
        });
    }

    copyDirectory(src, dest) {
        if (!fs.existsSync(src)) return;
        
        fs.mkdirSync(dest, { recursive: true });
        
        fs.readdirSync(src).forEach(file => {
            const srcPath = path.join(src, file);
            const destPath = path.join(dest, file);
            const stats = fs.statSync(srcPath);
            
            if (stats.isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }

    formatSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ================================
    // AIDE ET MENU
    // ================================

    showHelp() {
        log('\n🎭 BOHÈME PRODUCTION - GESTIONNAIRE D\'ASSETS', 'magenta');
        log('============================================', 'magenta');
        log('\n📝 COMMANDES DISPONIBLES:', 'blue');
        log('  node asset-manager.js analyze           # Analyse complète du projet', 'reset');
        log('  node asset-manager.js verify            # Vérifier les liens uniquement', 'reset');
        log('  node asset-manager.js clean             # Nettoyer les fichiers temporaires', 'reset');
        log('  node asset-manager.js backup            # Sauvegarder tous les assets', 'reset');
        log('  node asset-manager.js report            # Générer un rapport détaillé', 'reset');
        log('  node asset-manager.js help              # Afficher cette aide', 'reset');
        log('\n✨ EXEMPLES:', 'green');
        log('  node asset-manager.js analyze           # Analyse + rapport complet', 'reset');
        log('  node asset-manager.js verify            # Vérification rapide des liens', 'reset');
    }
}

// ================================
// INTERFACE EN LIGNE DE COMMANDE
// ================================

async function main() {
    const manager = new AssetManager();
    const args = process.argv.slice(2);
    const command = args[0];

    switch(command) {
        case 'analyze':
            await manager.analyzeProject();
            break;
        case 'verify':
            await manager.verifyLinks();
            break;
        case 'clean':
            await manager.cleanProject();
            break;
        case 'backup':
            await manager.backupAssets();
            break;
        case 'report':
            await manager.scanAssets();
            manager.generateReport();
            break;
        case 'help':
        default:
            manager.showHelp();
    }
}

// Exporter pour utilisation dans d'autres scripts
module.exports = AssetManager;

// Exécution si appelé directement
if (require.main === module) {
    main().catch(error => {
        log(`❌ Erreur: ${error.message}`, 'red');
        process.exit(1);
    });
}