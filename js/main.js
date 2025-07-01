// SOLUTION ULTRA-SIMPLE - Ne touche pas au système existant
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const plaquetteBtn = document.querySelector('.cover-interactive-text');
        if (plaquetteBtn) {
            plaquetteBtn.style.cursor = 'pointer';
            plaquetteBtn.onclick = function() {
                console.log('Plaquette cliquée - Simulation clic nav dot');
                // Simuler clic sur le 2ème nav dot (index 1 = Présentation)
                const navDots = document.querySelectorAll('.nav-dot');
                if (navDots[1]) {
                    navDots[1].click();
                }
            };
            console.log('Plaquette Interactive configurée (méthode simple)');
        }
    }, 2000); // Attendre 2 secondes que tout soit initialisé
});