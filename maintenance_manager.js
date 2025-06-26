/**
 * BOHÈME PRODUCTION - GESTIONNAIRE DE MAINTENANCE
 * Fonctions avancées séparées du workflow principal
 */

const fs = require('fs');
const { execSync } = require('child_process');

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
// CONFIGURATION
// ================================

const PROJECT_CONFIG = {
    name: 'Bohème Production',
    deployUrl: 'https://GitHublien.github.io/boheme-prod-plaquette-2/',
    criticalFiles: [
        'index.html',
        'css/variables.css',
        'css/layout.css',
        'css/components.css',
        'css/responsive.css',
        'js/script.js',
        'workflow.js',
        'asset-manager.js'
    ]
};

// ================================
// CLASSE MAINTENANCE MANAGER
// ================================

class MaintenanceManager {
    
    // ================================
    // DIAGNOSTIC DE SANTÉ
    // ================================

    async healthCheck() {
        log('\n🏥 DIAGNOSTIC DE SANTÉ DU PROJET', 'magenta');
        log('================================', 'magenta');
        
        const issues = [];
        const warnings = [];
        
        // 1. Vérifier les fichiers critiques
        log('\n📁 Vérification des fichiers critiques...', 'blue');
        PROJECT_CONFIG.criticalFiles.forEach(file => {
            if (fs.existsSync(file)) {
                const stats = fs.statSync(file);
                if (stats.size === 0) {
                    issues.push(`Fichier vide: ${file}`);
                    log(`❌ Fichier vide: ${file}`, 'red');
                } else {
                    log(`✅ ${file} (${this.formatSize(stats.size)})`, 'green');
                }
            } else {
                issues.push(`Fichier manquant: ${file}`);
                log(`❌ Manquant: ${file}`, 'red');
            }
        });
        
        // 2. Vérifier la structure des dossiers
        log('\n📂 Vérification de la structure...', 'blue');
        const requiredDirs = ['assets', 'css', 'js', 'assets/videos', 'assets/audio', 'assets/images'];
        requiredDirs.forEach(dir => {
            if (fs.existsSync(dir)) {
                log(`✅ Dossier: ${dir}`, 'green');
            } else {
                warnings.push(`Dossier manquant: ${dir}`);
                log(`⚠️ Dossier manquant: ${dir}`, 'yellow');
            }
        });
        
        // 3. Vérifier Git
        log('\n🔄 Vérification Git...', 'blue');
        try {
            const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
            if (gitStatus.trim() === '') {
                log('✅ Repository Git propre', 'green');
            } else {
                warnings.push('Modifications non commitées');
                log('⚠️ Modifications non commitées', 'yellow');
            }
        } catch (error) {
            issues.push('Problème Git détecté');
            log('❌ Problème Git détecté', 'red');
        }
        
        // 4. Rapport final
        log('\n📊 RÉSUMÉ DU DIAGNOSTIC', 'magenta');
        if (issues.length === 0 && warnings.length === 0) {
            log('🎉 Projet en parfaite santé !', 'green');
        } else {
            if (issues.length > 0) {
                log(`❌ ${issues.length} problème(s) critique(s)`, 'red');
                issues.forEach(issue => log(`   - ${issue}`, 'red'));
            }
            if (warnings.length > 0) {
                log(`⚠️ ${warnings.length} avertissement(s)`, 'yellow');
                warnings.forEach(warning => log(`   - ${warning}`, 'yellow'));
            }
        }
        
        return { healthy: issues.length === 0, issues, warnings };
    }

    // ================================
    // ÉTAT DU PROJET
    // ================================

    async status() {
        log('\n📊 ÉTAT DU PROJET', 'magenta');
        log('================', 'magenta');
        
        // Informations générales
        log(`\n🎭 Projet: ${PROJECT_CONFIG.name}`, 'cyan');
        log(`🌐 URL: ${PROJECT_CONFIG.deployUrl}`, 'cyan');
        
        // Statut Git
        try {
            const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
            const lastCommit = execSync('git log -1 --pretty=format:"%h - %an, %ar : %s"', { encoding: 'utf8' });
            
            log(`\n🔄 Branche Git: ${branch}`, 'blue');
            log(`📝 Dernier commit: ${lastCommit}`, 'blue');
            
            const status = execSync('git status --porcelain', { encoding: 'utf8' });
            if (status.trim() === '') {
                log('✅ Aucune modification en attente', 'green');
            } else {
                log('⚠️ Modifications non commitées:', 'yellow');
                status.trim().split('\n').forEach(line => {
                    log(`   ${line}`, 'yellow');
                });
            }
        } catch (error) {
            log('❌ Impossible de lire le statut Git', 'red');
        }
        
        // Statistiques des fichiers
        this.displayFileStats();
    }

    // ================================
    // OPTIMISATION
    // ================================

    async optimize() {
        log('\n⚡ OPTIMISATION DU PROJET', 'magenta');
        log('=========================', 'magenta');
        
        let optimized = 0;
        
        // 1. Nettoyer les fichiers temporaires
        log('\n🧹 Nettoyage des fichiers temporaires...', 'blue');
        const tempFiles = ['.DS_Store', 'Thumbs.db', '*.tmp', '*.temp'];
        
        const cleanDir = (dir) => {
            if (!fs.existsSync(dir)) return;
            
            fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
                const fullPath = `${dir}/${dirent.name}`;
                
                if (dirent.isDirectory()) {
                    cleanDir(fullPath);
                } else {
                    const shouldDelete = tempFiles.some(pattern => {
                        if (pattern.startsWith('*')) {
                            return dirent.name.endsWith(pattern.substring(1));
                        }
                        return dirent.name === pattern;
                    });
                    
                    if (shouldDelete) {
                        fs.unlinkSync(fullPath);
                        log(`🗑️ Supprimé: ${fullPath}`, 'yellow');
                        optimized++;
                    }
                }
            });
        };
        
        cleanDir('.');
        
        // 2. Vérifier les doublons dans assets/
        log('\n🔍 Recherche de doublons...', 'blue');
        await this.findDuplicates();
        
        // 3. Compacter Git si nécessaire
        log('\n📦 Optimisation Git...', 'blue');
        try {
            execSync('git gc --prune=now', { stdio: 'pipe' });
            log('✅ Cache Git optimisé', 'green');
        } catch (error) {
            log('⚠️ Optimisation Git non nécessaire', 'yellow');
        }
        
        if (optimized === 0) {
            log('\n✅ Projet déjà optimisé !', 'green');
        } else {
            log(`\n✅ ${optimized} optimisations effectuées`, 'green');
        }
    }

    // ================================
    // VÉRIFICATION AVANCÉE
    // ================================

    async verify() {
        log('\n🔍 VÉRIFICATION AVANCÉE', 'magenta');
        log('=======================', 'magenta');
        
        // 1. Vérifier la syntaxe HTML
        log('\n📄 Vérification HTML...', 'blue');
        await this.verifyHTML();
        
        // 2. Vérifier la syntaxe CSS
        log('\n🎨 Vérification CSS...', 'blue');
        await this.verifyCSS();
        
        // 3. Vérifier la syntaxe JavaScript
        log('\n⚡ Vérification JavaScript...', 'blue');
        await this.verifyJS();
        
        // 4. Vérifier les liens internes
        log('\n🔗 Vérification des liens...', 'blue');
        await this.verifyLinks();
    }

    // ================================
    // SAUVEGARDE AVANCÉE
    // ================================

    async backupFull() {
        log('\n💾 SAUVEGARDE COMPLÈTE', 'magenta');
        log('======================', 'magenta');
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const backupDir = `backup-complete-${timestamp}`;
        
        try {
            // Créer le dossier de sauvegarde
            fs.mkdirSync(backupDir, { recursive: true });
            
            // Copier les fichiers critiques
            PROJECT_CONFIG.criticalFiles.forEach(file => {
                if (fs.existsSync(file)) {
                    const destPath = `${backupDir}/${file.replace(/\//g, '-')}`;
                    fs.copyFileSync(file, destPath);
                }
            });
            
            // Copier le dossier assets complet
            if (fs.existsSync('assets')) {
                this.copyDirectory('assets', `${backupDir}/assets`);
            }
            
            // Créer un fichier de métadonnées
            const metadata = {
                timestamp: new Date().toISOString(),
                project: PROJECT_CONFIG.name,
                files: PROJECT_CONFIG.criticalFiles.filter(f => fs.existsSync(f)),
                gitBranch: this.getCurrentBranch(),
                gitCommit: this.getLastCommit()
            };
            
            fs.writeFileSync(
                `${backupDir}/backup-info.json`, 
                JSON.stringify(metadata, null, 2)
            );
            
            log(`✅ Sauvegarde complète créée: ${backupDir}`, 'green');
            
        } catch (error) {
            log(`❌ Erreur lors de la sauvegarde: ${error.message}`, 'red');
        }
    }

    // ================================
    // MÉTHODES UTILITAIRES
    // ================================

    displayFileStats() {
        log('\n📊 Statistiques des fichiers:', 'blue');
        
        let totalSize = 0;
        let fileCount = 0;
        
        const scanDir = (dir, indent = '') => {
            if (!fs.existsSync(dir)) return;
            
            const items = fs.readdirSync(dir);
            items.forEach(item => {
                const fullPath = `${dir}/${item}`;
                const stats = fs.statSync(fullPath);
                
                if (stats.isDirectory()) {
                    log(`${indent}📁 ${item}/`, 'cyan');
                    scanDir(fullPath, indent + '  ');
                } else {
                    fileCount++;
                    totalSize += stats.size;
                    log(`${indent}📄 ${item} (${this.formatSize(stats.size)})`, 'cyan');
                }
            });
        };
        
        ['css', 'js', 'assets'].forEach(dir => {
            if (fs.existsSync(dir)) {
                log(`\n📁 ${dir}/`, 'cyan');
                scanDir(dir, '  ');
            }
        });
        
        log(`\n📊 Total: ${fileCount} fichiers, ${this.formatSize(totalSize)}`, 'green');
    }

    async findDuplicates() {
        const fileHashes = new Map();
        let duplicates = 0;
        
        const scanForDuplicates = (dir) => {
            if (!fs.existsSync(dir)) return;
            
            fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
                const fullPath = `${dir}/${dirent.name}`;
                
                if (dirent.isDirectory()) {
                    scanForDuplicates(fullPath);
                } else {
                    const stats = fs.statSync(fullPath);
                    const sizeKey = `${stats.size}-${dirent.name}`;
                    
                    if (fileHashes.has(sizeKey)) {
                        log(`🔄 Doublon possible: ${fullPath}`, 'yellow');
                        duplicates++;
                    } else {
                        fileHashes.set(sizeKey, fullPath);
                    }
                }
            });
        };
        
        scanForDuplicates('assets');
        
        if (duplicates === 0) {
            log('✅ Aucun doublon détecté', 'green');
        } else {
            log(`⚠️ ${duplicates} doublons possibles trouvés`, 'yellow');
        }
    }

    async verifyHTML() {
        try {
            const html = fs.readFileSync('index.html', 'utf8');
            
            // Vérifications basiques
            const checks = [
                { test: /<html[^>]*>/i, name: 'Balise HTML' },
                { test: /<head[^>]*>/i, name: 'Balise HEAD' },
                { test: /<body[^>]*>/i, name: 'Balise BODY' },
                { test: /<title[^>]*>/i, name: 'Balise TITLE' },
                { test: /<!DOCTYPE/i, name: 'DOCTYPE' }
            ];
            
            checks.forEach(check => {
                if (check.test.test(html)) {
                    log(`✅ ${check.name}`, 'green');
                } else {
                    log(`❌ ${check.name} manquant`, 'red');
                }
            });
            
        } catch (error) {
            log('❌ Erreur lecture HTML', 'red');
        }
    }

    async verifyCSS() {
        const cssFiles = ['css/variables.css', 'css/layout.css', 'css/components.css', 'css/responsive.css'];
        
        cssFiles.forEach(file => {
            if (fs.existsSync(file)) {
                try {
                    const content = fs.readFileSync(file, 'utf8');
                    const braceCount = (content.match(/{/g) || []).length - (content.match(/}/g) || []).length;
                    
                    if (braceCount === 0) {
                        log(`✅ ${file} - Syntaxe OK`, 'green');
                    } else {
                        log(`⚠️ ${file} - Accolades déséquilibrées`, 'yellow');
                    }
                } catch (error) {
                    log(`❌ ${file} - Erreur lecture`, 'red');
                }
            } else {
                log(`❌ ${file} - Fichier manquant`, 'red');
            }
        });
    }

    async verifyJS() {
        const jsFiles = ['js/script.js', 'workflow.js', 'asset-manager.js'];
        
        jsFiles.forEach(file => {
            if (fs.existsSync(file)) {
                try {
                    const content = fs.readFileSync(file, 'utf8');
                    // Vérification basique de syntaxe
                    require('vm').createScript(content);
                    log(`✅ ${file} - Syntaxe OK`, 'green');
                } catch (error) {
                    log(`❌ ${file} - Erreur syntaxe: ${error.message}`, 'red');
                }
            } else {
                log(`❌ ${file} - Fichier manquant`, 'red');
            }
        });
    }

    async verifyLinks() {
        try {
            const html = fs.readFileSync('index.html', 'utf8');
            const links = [];
            
            // Extraire les liens vers les assets
            const patterns = [
                /src=["']([^"']+)["']/g,
                /href=["']([^"']+)["']/g
            ];
            
            patterns.forEach(pattern => {
                let match;
                while ((match = pattern.exec(html)) !== null) {
                    const link = match[1];
                    if (link.startsWith('assets/') || link.startsWith('css/') || link.startsWith('js/')) {
                        links.push(link);
                    }
                }
            });
            
            const broken = [];
            links.forEach(link => {
                if (!fs.existsSync(link)) {
                    broken.push(link);
                }
            });
            
            if (broken.length === 0) {
                log(`✅ Tous les ${links.length} liens sont valides`, 'green');
            } else {
                log(`❌ ${broken.length} liens cassés:`, 'red');
                broken.forEach(link => log(`   - ${link}`, 'red'));
            }
            
        } catch (error) {
            log('❌ Erreur vérification liens', 'red');
        }
    }

    copyDirectory(src, dest) {
        fs.mkdirSync(dest, { recursive: true });
        
        fs.readdirSync(src).forEach(item => {
            const srcPath = `${src}/${item}`;
            const destPath = `${dest}/${item}`;
            const stats = fs.statSync(srcPath);
            
            if (stats.isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }

    getCurrentBranch() {
        try {
            return execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        } catch {
            return 'unknown';
        }
    }

    getLastCommit() {
        try {
            return execSync('git log -1 --pretty=format:"%h - %s"', { encoding: 'utf8' }).trim();
        } catch {
            return 'unknown';
        }
    }

    formatSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ================================
    // AIDE
    // ================================

    showHelp() {
        log('\n🎭 BOHÈME PRODUCTION - GESTIONNAIRE DE MAINTENANCE', 'magenta');
        log('=================================================', 'magenta');
        log('\n🏥 DIAGNOSTIC:', 'blue');
        log('  node maintenance.js health                # Diagnostic complet', 'reset');
        log('  node maintenance.js status                # État du projet', 'reset');
        log('  node maintenance.js verify                # Vérification avancée', 'reset');
        log('\n⚡ OPTIMISATION:', 'blue');
        log('  node maintenance.js optimize              # Optimiser le projet', 'reset');
        log('  node maintenance.js clean                 # Nettoyage avancé', 'reset');
        log('\n💾 SAUVEGARDE:', 'blue');
        log('  node maintenance.js backup                # Sauvegarde complète', 'reset');
        log('\n📊 OUTILS:', 'blue');
        log('  node maintenance.js help                  # Cette aide', 'reset');
        log('\n✨ EXEMPLES:', 'green');
        log('  node maintenance.js health                # Vérifier la santé du projet', 'reset');
        log('  node maintenance.js optimize              # Nettoyer et optimiser', 'reset');
    }
}

// ================================
// INTERFACE EN LIGNE DE COMMANDE
// ================================

async function main() {
    const manager = new MaintenanceManager();
    const args = process.argv.slice(2);
    const command = args[0];

    switch(command) {
        case 'health':
            await manager.healthCheck();
            break;
        case 'status':
            await manager.status();
            break;
        case 'verify':
            await manager.verify();
            break;
        case 'optimize':
            await manager.optimize();
            break;
        case 'backup':
            await manager.backupFull();
            break;
        case 'help':
        default:
            manager.showHelp();
    }
}

// Exécution
if (require.main === module) {
    main().catch(error => {
        log(`❌ Erreur: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = MaintenanceManager;