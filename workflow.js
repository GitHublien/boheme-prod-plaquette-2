/**
 * BOHÈME PRODUCTION - WORKFLOW SÉCURISÉ
 * Version récupérée et améliorée
 */

const fs = require('fs');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function showHelp() {
    log('\n🎭 BOHÈME PRODUCTION - WORKFLOW SÉCURISÉ', 'magenta');
    log('==========================================', 'magenta');
    log('\n📝 COMMANDES SÛRES:', 'blue');
    log('  node workflow.js help                    # Afficher cette aide', 'reset');
    log('  node workflow.js change-color [nom] [valeur]  # Changer une couleur', 'reset');
    log('  node workflow.js deploy [message]        # Déployer sur GitHub', 'reset');
    log('  node workflow.js backup                  # Sauvegarder le projet', 'reset');
    log('\n✨ EXEMPLES:', 'green');
    log('  node workflow.js change-color gold "#FF0000"', 'reset');
    log('  node workflow.js deploy "Nouvelles couleurs"', 'reset');
}

function changeColor(colorName, newValue) {
    log('🎨 Modification des couleurs...', 'blue');
    
    try {
        const cssContent = fs.readFileSync('css/variables.css', 'utf8');
        const colorRegex = new RegExp(`(--${colorName}:\\s*)(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})(;)`, 'g');
        
        if (!cssContent.match(colorRegex)) {
            log(`❌ Couleur --${colorName} non trouvée`, 'red');
            log('💡 Couleurs disponibles: gold, gold-light, gold-dark, cream, dark', 'yellow');
            return;
        }
        
        const updatedCss = cssContent.replace(colorRegex, `$1${newValue}$3`);
        fs.writeFileSync('css/variables.css', updatedCss);
        log(`✅ Couleur --${colorName} changée vers ${newValue}`, 'green');
    } catch (error) {
        log('❌ Erreur lors de la modification', 'red');
    }
}

function deploy(message = 'Update: modifications via workflow') {
    log('🚀 Déploiement sur GitHub...', 'blue');
    
    const { execSync } = require('child_process');
    
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
        execSync('git push', { stdio: 'inherit' });
        log('✅ Déploiement réussi !', 'green');
        log('🌐 Site mis à jour: https://GitHublien.github.io/boheme-prod-plaquette-2/', 'yellow');
    } catch (error) {
        log('❌ Erreur lors du déploiement', 'red');
    }
}

function backup() {
    log('💾 Sauvegarde Git...', 'blue');
    
    const { execSync } = require('child_process');
    
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "Backup: sauvegarde automatique"', { stdio: 'inherit' });
        log('✅ Sauvegarde Git créée', 'green');
    } catch (error) {
        log('⚠️ Rien de nouveau à sauvegarder', 'yellow');
    }
}

// Interface principale
const args = process.argv.slice(2);
const command = args[0];

switch(command) {
    case 'change-color':
        changeColor(args[1], args[2]);
        break;
    case 'deploy':
        deploy(args.slice(1).join(' '));
        break;
    case 'backup':
        backup();
        break;
    case 'help':
    default:
        showHelp();
}