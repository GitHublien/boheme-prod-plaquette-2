/**
 * BOHÈME PRODUCTION - WORKFLOW SÉCURISÉ AMÉLIORÉ
 * Version simple avec fonctions de maintenance intégrées
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
// AIDE PRINCIPALE
// ================================

function showHelp() {
    log('\n🎭 BOHÈME PRODUCTION - WORKFLOW COMPLET', 'magenta');
    log('=======================================', 'magenta');
    log('\n🎨 MODIFICATION SÉCURISÉE:', 'blue');
    log('  node workflow.js change-color [nom] [valeur]  # Changer une couleur', 'reset');
    log('\n🚀 DÉPLOIEMENT:', 'blue');
    log('  node workflow.js deploy [message]            # Déployer sur GitHub', 'reset');
    log('  node workflow.js deploy-quick                # Déploiement rapide', 'reset');
    log('\n💾 SAUVEGARDE:', 'blue');
    log('  node workflow.js backup                      # Sauvegarde Git', 'reset');
    log('  node workflow.js backup-full                 # Sauvegarde complète', 'reset');
    log('\n🔧 MAINTENANCE:', 'blue');
    log('  node workflow.js status                      # État du projet', 'reset');
    log('  node workflow.js health                      # Diagnostic complet', 'reset');
    log('  node workflow.js clean                       # Nettoyage sécurisé', 'reset');
    log('\n📊 ANALYSE:', 'blue');
    log('  node workflow.js verify                      # Vérifier les liens', 'reset');
    log('  node workflow.js help                        # Cette aide', 'reset');
    log('\n✨ EXEMPLES:', 'green');
    log('  node workflow.js change-color gold "#8B0000"', 'reset');
    log('  node workflow.js health                      # Diagnostic rapide', 'reset');
    log('  node workflow.js deploy "Nouvelles modifications"', 'reset');
}

// ================================
// FONCTIONS EXISTANTES (CONSERVÉES)
// ================================

function changeColor(colorName, newValue) {
    log('🎨 Modification des couleurs...', 'blue');
    
    try {
        const cssContent = fs.readFileSync('css/variables.css', 'utf8');
        const colorRegex = new RegExp(`(--${colorName}:\\s*)(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})(;)`, 'g');
        
        if (!cssContent.match(colorRegex)) {
            log(`❌ Couleur --${colorName} non trouvée`, 'red');
            listAvailableColors();
            return;
        }
        
        const updatedCss = cssContent.replace(colorRegex, `$1${newValue}$3`);
        fs.writeFileSync('css/variables.css', updatedCss);
        log(`✅ Couleur --${colorName} changée vers ${newValue}`, 'green');
    } catch (error) {
        log('❌ Erreur lors de la modification', 'red');
    }
}

function listAvailableColors() {
    log('💡 Couleurs disponibles: gold, gold-light, gold-dark, cream, dark', 'yellow');
}

function deploy(message = 'Update: modifications via workflow') {
    log('🚀 Déploiement sur GitHub...', 'blue');
    
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        log('✅ Déploiement réussi !', 'green');
        log('🌐 Site mis à jour: https://GitHublien.github.io/boheme-prod-plaquette-2/', 'yellow');
    } catch (error) {
        log('❌ Erreur lors du déploiement', 'red');
        if (error.message.includes('nothing to commit')) {
            log('💡 Aucune modification à déployer', 'yellow');
        }
    }
}

function deployQuick() {
    const timestamp = new Date().toLocaleString('fr-FR');
    deploy(`Quick update - ${timestamp}`);
}

function backup() {
    log('💾 Sauvegarde Git...', 'blue');
    
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "Backup: sauvegarde automatique"', { stdio: 'inherit' });
        log('✅ Sauvegarde Git créée', 'green');
    } catch (error) {
        log('⚠️ Rien de nouveau à sauvegarder', 'yellow');
    }
}

// ================================
// NOUVELLES FONCTIONS DE MAINTENANCE
// ================================

function status() {
    log('\n📊 ÉTAT DU PROJET', 'magenta');
    log('================', 'magenta');
    
    log('\n🎭 Projet: Bohème Production', 'cyan');
    log('🌐 URL: https://GitHublien.github.io/boheme-prod-plaquette-2/', 'cyan');
    
    // Statut Git
    try {
        const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
        const lastCommit = execSync('git log -1 --pretty=format:"%h - %an, %ar : %s"', { encoding: 'utf8' });
        
        log(`\n🔄 Branche Git: ${branch}`, 'blue');
        log(`📝 Dernier commit: ${lastCommit}`, 'blue');
        
        const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
        if (gitStatus.trim() === '') {
            log('✅ Aucune modification en attente', 'green');
        } else {
            log('⚠️ Modifications non commitées:', 'yellow');
            gitStatus.trim().split('\n').forEach(line => {
                log(`   ${line}`, 'yellow');
            });
        }
    } catch (error) {
        log('❌ Impossible de lire le statut Git', 'red');
    }
    
    // Statistiques des fichiers
    displayFileStats();
}

function healthCheck() {
    log('\n🏥 DIAGNOSTIC DE SANTÉ DU PROJET', 'magenta');
    log('================================', 'magenta');
    
    const issues = [];
    const warnings = [];
    
    // Vérifier les fichiers critiques
    log('\n📁 Vérification des fichiers critiques...', 'blue');
    const criticalFiles = [
        'index.html',
        'css/variables.css',
        'css/layout.css',
        'css/components.css',
        'css/responsive.css',
        'js/script.js',
        'workflow.js',
        'asset-manager.js'
    ];
    
    criticalFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const stats = fs.statSync(file);
            if (stats.size === 0) {
                issues.push(`Fichier vide: ${file}`);
                log(`❌ Fichier vide: ${file}`, 'red');
            } else {
                log(`✅ ${file} (${formatSize(stats.size)})`, 'green');
            }
        } else {
            issues.push(`Fichier manquant: ${file}`);
            log(`❌ Manquant: ${file}`, 'red');
        }
    });
    
    // Vérifier la structure des dossiers
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
    
    // Vérifier Git
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
    
    // Rapport final
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
}

function cleanProject() {
    log('\n🧹 NETTOYAGE DU PROJET', 'magenta');
    log('======================', 'magenta');
    
    // Supprimer les fichiers temporaires
    const tempPatterns = ['.DS_Store', 'Thumbs.db', 'asset-report.json'];
    let cleaned = 0;
    
    const cleanDirectory = (dir) => {
        if (!fs.existsSync(dir)) return;
        
        fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
            const fullPath = `${dir}/${dirent.name}`;
            
            if (dirent.isDirectory()) {
                cleanDirectory(fullPath);
            } else {
                const shouldDelete = tempPatterns.some(pattern => {
                    return dirent.name === pattern;
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

function verifyLinks() {
    log('\n🔗 VÉRIFICATION DES LIENS', 'magenta');
    log('=========================', 'magenta');
    
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

function backupFull() {
    log('\n💾 SAUVEGARDE COMPLÈTE', 'magenta');
    log('======================', 'magenta');
    
    // Sauvegarde Git normale
    backup();
    
    // Créer une sauvegarde des fichiers critiques
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const backupDir = `backup-complete-${timestamp}`;
    
    try {
        fs.mkdirSync(backupDir, { recursive: true });
        
        const criticalFiles = [
            'index.html',
            'css/variables.css',
            'css/layout.css',
            'css/components.css',
            'css/responsive.css',
            'js/script.js',
            'workflow.js',
            'asset-manager.js'
        ];
        
        criticalFiles.forEach(file => {
            if (fs.existsSync(file)) {
                const destPath = `${backupDir}/${file.replace(/\//g, '-')}`;
                fs.copyFileSync(file, destPath);
            }
        });
        
        log(`✅ Sauvegarde complète créée: ${backupDir}`, 'green');
        
    } catch (error) {
        log(`❌ Erreur lors de la sauvegarde: ${error.message}`, 'red');
    }
}

// ================================
// FONCTIONS UTILITAIRES
// ================================

function displayFileStats() {
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
                log(`${indent}📄 ${item} (${formatSize(stats.size)})`, 'cyan');
            }
        });
    };
    
    ['css', 'js'].forEach(dir => {
        if (fs.existsSync(dir)) {
            log(`\n📁 ${dir}/`, 'cyan');
            scanDir(dir, '  ');
        }
    });
    
    log(`\n📊 Total: ${fileCount} fichiers, ${formatSize(totalSize)}`, 'green');
}

function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ================================
// INTERFACE PRINCIPALE
// ================================

const args = process.argv.slice(2);
const command = args[0];

switch(command) {
    case 'change-color':
        changeColor(args[1], args[2]);
        break;
    case 'deploy':
        deploy(args.slice(1).join(' '));
        break;
    case 'deploy-quick':
        deployQuick();
        break;
    case 'backup':
        backup();
        break;
    case 'backup-full':
        backupFull();
        break;
    case 'status':
        status();
        break;
    case 'health':
        healthCheck();
        break;
    case 'clean':
        cleanProject();
        break;
    case 'verify':
        verifyLinks();
        break;
    case 'help':
    default:
        showHelp();
}