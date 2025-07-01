// ================================
// CONFIGURATION GLOBALE
// ================================

// Configuration optimisée pour résoudre les problèmes de scroll
const CONFIG = {
    navigation: {
        // Seuils considérablement augmentés pour mobile
        touchThreshold: 250,           // Augmenté de 100 à 250
        velocityThreshold: 1.2,        // Augmenté de 0.5 à 1.2
        timeThreshold: 600,            // Diminué de 800 à 600ms pour plus de précision

        // Seuils pour la molette PC
        wheelThreshold: 200,           // Augmenté de 50 à 200
        wheelTimeout: 300,             // Augmenté de 100 à 300ms

        // Zone de sécurité élargie
        safetyZoneSize: 200,          // Augmenté de 80 à 200px

        // Délai de confirmation d'intention
        intentionConfirmationDelay: 400,

        // Paramètres de débouncing
        debounceDelay: 150,
        maxAccumulationTime: 500
    },
    performance: {
        lazyLoadOffset: '100px',
        videoPreload: 'metadata',
        transitionDuration: 600
    },
    accessibility: {
        respectReducedMotion: true
    }
};

// ================================
// CLASSE PRINCIPALE
// ================================

class BohemePlaquette {
    constructor() {
        this.currentSection = 0;
        this.sections = ['cover', 'intro', 'bureau', 'artistes', 'productions', 'contact'];
        this.isTransitioning = false;
        this.isPresentationMode = false;

        // Optimisation: Variables de navigation intelligentes
        this.touchStart = { x: 0, y: 0, time: 0 };
        this.touchEnd = { x: 0, y: 0, time: 0 };
        this.intentionTimer = null;
        this.wheelAccumulator = 0;
        this.wheelTimeout = null;
        this.lastWheelDirection = null;
        this.wheelEventCount = 0;
        this.lastNavigationTime = 0;

        // Débouncing pour éviter les navigations multiples
        this.navigationDebounce = null;

        this.init();
    }

    // ================================
    // INITIALISATION
    // ================================

    init() {
        this.setupErrorHandling();
        this.setupLazyLoading();
        this.setupAudio();
        this.setupNavigation();
        this.setupArtisteTabs();
        this.setupOptimizedTouchNavigation();
        this.setupOptimizedWheelNavigation();
        this.setupKeyboardNavigation();
        this.setupPresentationMode();
        this.setupSectionEndPoints(); // Nouveau setup pour les points de fin
        this.startAnimations();
        this.setupAccessibility();

        document.getElementById('start-exploration')?.addEventListener('click', () => {
            this.goToSection(1);
        });

    // PLAQUETTE INTERACTIVE - MÊME PRINCIPE QUE EXPLORER
    document.querySelector('.cover-interactive-text')?.addEventListener('click', () => {
    this.goToSection(1);
        });
    }

    // ================================
    // SETUP DES POINTS DE FIN
    // ================================

    // Nouveau: Setup des points de fin de section
    setupSectionEndPoints() {
        document.querySelectorAll('.section-end-next').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const nextSection = button.dataset.nextSection;
                const sectionIndex = this.sections.indexOf(nextSection);
                if (sectionIndex !== -1) {
                    this.goToSection(sectionIndex);
                }
            });
        });
    }

    // ================================
    // GESTION D'ERREURS
    // ================================

    // Optimisation: Gestion d'erreurs robuste
    setupErrorHandling() {
        // Gestion d'erreurs pour les médias
        document.querySelectorAll('img').forEach(img => {
            img.onerror = () => {
                console.warn(`Image non trouvée: ${img.src}`);
                if (img.alt && img.parentNode) {
                    const placeholder = document.createElement('div');
                    placeholder.className = img.classList.contains('logo') ? 'logo' : 'image-placeholder';
                    placeholder.textContent = img.alt;
                    placeholder.style.cssText = `
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, var(--gold), var(--gold-dark));
                        color: var(--black);
                        font-weight: bold;
                        text-align: center;
                        padding: 20px;
                    `;
                    img.parentNode.replaceChild(placeholder, img);
                }
            };
        });

        document.querySelectorAll('video').forEach(video => {
            video.onerror = () => {
                console.warn(`Vidéo non trouvée: ${video.src}`);
                video.style.display = 'none';
            };
        });
    }

    // ================================
    // LAZY LOADING
    // ================================

    // Optimisation: Lazy loading intelligent
    setupLazyLoading() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: CONFIG.performance.lazyLoadOffset
        };

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, observerOptions);

        // Observer toutes les images avec data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ================================
    // ACCESSIBILITÉ
    // ================================

    // Amélioration accessibilité
    setupAccessibility() {
        // Support du focus clavier pour la navigation
        document.querySelectorAll('.nav-dot, .artiste-tab, .section-end-next').forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Annonces pour lecteurs d'écran
        this.announceToScreenReader = (message) => {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'polite');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.style.cssText = `
                position: absolute !important;
                width: 1px !important;
                height: 1px !important;
                padding: 0 !important;
                margin: -1px !important;
                overflow: hidden !important;
                clip: rect(0,0,0,0) !important;
                border: 0 !important;
            `;
            announcement.textContent = message;
            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
        };
    }

    // ================================
    // AUDIO
    // ================================

    setupAudio() {
        const audio = document.getElementById('background-music');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const muteBtn = document.getElementById('mute-btn');
        const volumeSlider = document.getElementById('volume-slider');

        if (audio) {
            audio.volume = 0.3;

            // Gestion d'erreurs audio
            audio.onerror = () => {
                console.warn('Erreur de chargement audio');
                playPauseBtn.style.display = 'none';
            };
        }

        playPauseBtn?.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => {
                    console.warn('Audio play failed:', e);
                });
                playPauseBtn.innerHTML = '<span class="material-icons">pause</span>';
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
            }
        });

        muteBtn?.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.innerHTML = audio.muted ?
                '<span class="material-icons">volume_off</span>' :
                '<span class="material-icons">volume_up</span>';
        });

        volumeSlider?.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });

        // Auto-play avec gestion d'erreurs
        const tryAutoplay = () => {
            if (audio && !audio.paused) return;
            audio?.play().catch(() => {
                playPauseBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
            });
        };

        document.addEventListener('click', tryAutoplay, { once: true });
        document.addEventListener('touchstart', tryAutoplay, { once: true });
    }

    // ================================
    // MODE PRÉSENTATION
    // ================================

    setupPresentationMode() {
        const presentationBtn = document.getElementById('presentation-mode-btn');
        const exitBtn = document.getElementById('exit-presentation-btn');
        const prevBtn = document.getElementById('prev-section-btn');
        const nextBtn = document.getElementById('next-section-btn');

        presentationBtn?.addEventListener('click', () => {
            this.togglePresentationMode();
        });

        exitBtn?.addEventListener('click', () => {
            this.exitPresentationMode();
        });

        prevBtn?.addEventListener('click', () => {
            if (this.currentSection > 0) {
                this.goToSection(this.currentSection - 1);
            }
        });

        nextBtn?.addEventListener('click', () => {
            if (this.currentSection < this.sections.length - 1) {
                this.goToSection(this.currentSection + 1);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (this.isPresentationMode) {
                switch(e.key) {
                    case 'Escape':
                        this.exitPresentationMode();
                        break;
                    case 'F11':
                        e.preventDefault();
                        break;
                }
            }
        });
    }

    togglePresentationMode() {
        if (this.isPresentationMode) {
            this.exitPresentationMode();
        } else {
            this.enterPresentationMode();
        }
    }

    enterPresentationMode() {
        this.isPresentationMode = true;
        document.body.classList.add('presentation-mode');

        // Tentative de plein écran
        const requestFullscreen = () => {
            if (document.documentElement.requestFullscreen) {
                return document.documentElement.requestFullscreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                return document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                return document.documentElement.msRequestFullscreen();
            }
            return Promise.resolve();
        };

        requestFullscreen().catch(e => {
            console.log('Fullscreen non supporté:', e);
        });

        const presentationBtn = document.getElementById('presentation-mode-btn');
        if (presentationBtn) {
            presentationBtn.innerHTML = '<span class="material-icons">fullscreen_exit</span>';
        }

        this.announceToScreenReader('Mode présentation activé');
    }

    exitPresentationMode() {
        this.isPresentationMode = false;
        document.body.classList.remove('presentation-mode');

        const exitFullscreen = () => {
            if (document.exitFullscreen) {
                return document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                return document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                return document.msExitFullscreen();
            }
            return Promise.resolve();
        };

        exitFullscreen().catch(e => {
            console.log('Exit fullscreen error:', e);
        });

        const presentationBtn = document.getElementById('presentation-mode-btn');
        if (presentationBtn) {
            presentationBtn.innerHTML = '<span class="material-icons">present_to_all</span>';
        }

        this.announceToScreenReader('Mode présentation désactivé');
    }

    // ================================
    // NAVIGATION
    // ================================

    setupNavigation() {
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
        });
    }

    setupArtisteTabs() {
        const tabs = document.querySelectorAll('.artiste-tab');
        const categories = document.querySelectorAll('.artiste-category');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;

                tabs.forEach(t => t.classList.remove('active'));
                categories.forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                const targetCategory = document.getElementById(category);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }

    // ================================
    // NAVIGATION TACTILE OPTIMISÉE
    // ================================

    // RÉSOLUTION DU PROBLÈME DE SCROLL - Navigation tactile optimisée
    setupOptimizedTouchNavigation() {
        let intentionConfirmed = false;

        document.addEventListener('touchstart', (e) => {
            if (this.isTransitioning) return;

            const touch = e.touches[0];
            this.touchStart = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };

            // Reset des variables
            intentionConfirmed = false;

            // Clear any existing intention timer
            if (this.intentionTimer) {
                clearTimeout(this.intentionTimer);
                this.intentionTimer = null;
            }

        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (this.isTransitioning || intentionConfirmed) return;

            const touch = e.touches[0];
            const deltaY = Math.abs(touch.clientY - this.touchStart.y);
            const deltaX = Math.abs(touch.clientX - this.touchStart.x);

            // Si le mouvement est plus horizontal que vertical, ignorer
            if (deltaX > deltaY) return;

            // Si le mouvement dépasse un seuil très élevé, démarrer la confirmation d'intention
            if (deltaY > CONFIG.navigation.touchThreshold * 0.6) {
                this.intentionTimer = setTimeout(() => {
                    intentionConfirmed = true;
                }, CONFIG.navigation.intentionConfirmationDelay);
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;

            const touch = e.changedTouches[0];
            this.touchEnd = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };

            // Clear intention timer
            if (this.intentionTimer) {
                clearTimeout(this.intentionTimer);
                this.intentionTimer = null;
            }

            this.handleOptimizedSwipe(intentionConfirmed);
        }, { passive: true });
    }

    handleOptimizedSwipe(intentionConfirmed) {
        const deltaX = this.touchEnd.x - this.touchStart.x;
        const deltaY = this.touchEnd.y - this.touchStart.y;
        const deltaTime = this.touchEnd.time - this.touchStart.time;
        const distance = Math.abs(deltaY);
        const velocity = distance / (deltaTime || 1);

        // Vérification de direction - ignorer si plus horizontal que vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) return;

        const activeSection = document.querySelector('.section.active');
        const sectionContent = activeSection?.querySelector('.section-content');

        // Si pas de contenu scrollable, navigation directe avec seuils très élevés
        if (!sectionContent) {
            const shouldNavigate = distance > CONFIG.navigation.touchThreshold &&
                                  velocity > CONFIG.navigation.velocityThreshold &&
                                  deltaTime < CONFIG.navigation.timeThreshold;

            if (shouldNavigate) {
                const direction = deltaY > 0 ? 'up' : 'down';
                this.handleDirectionalNavigation(direction);
            }
            return;
        }

        // Pour les sections avec contenu scrollable
        const isInSafetyZone = this.checkAdvancedSafetyZone(sectionContent);

        if (isInSafetyZone) {
            // Critères TRÈS stricts pour la navigation
            const strictNavigation = (
                distance > CONFIG.navigation.touchThreshold &&
                velocity > CONFIG.navigation.velocityThreshold &&
                deltaTime < CONFIG.navigation.timeThreshold &&
                (intentionConfirmed || velocity > CONFIG.navigation.velocityThreshold * 1.5)
            );

            if (strictNavigation) {
                // Anti-rebond de navigation
                const now = Date.now();
                if (now - this.lastNavigationTime < CONFIG.navigation.debounceDelay) {
                    return;
                }
                this.lastNavigationTime = now;

                const direction = deltaY > 0 ? 'up' : 'down';
                this.handleDirectionalNavigation(direction);
            }
        }
    }

    // ================================
    // NAVIGATION MOLETTE OPTIMISÉE
    // ================================

    // RÉSOLUTION DU PROBLÈME DE SCROLL - Navigation molette optimisée
    setupOptimizedWheelNavigation() {
        document.addEventListener('wheel', (e) => {
            if (this.isTransitioning) return;

            const activeSection = document.querySelector('.section.active');
            const sectionContent = activeSection?.querySelector('.section-content');

            // Si pas de contenu scrollable, navigation directe avec seuils élevés
            if (!sectionContent) {
                this.handleWheelNavigation(e);
                return;
            }

            // Pour les sections avec contenu scrollable
            const isInSafetyZone = this.checkAdvancedSafetyZone(sectionContent);

            if (isInSafetyZone) {
                this.handleWheelNavigation(e);
            }
        }, { passive: false });
    }

    handleWheelNavigation(e) {
        const direction = e.deltaY > 0 ? 'down' : 'up';

        // Vérification de consistance de direction
        if (this.lastWheelDirection !== direction) {
            this.wheelAccumulator = 0;
            this.wheelEventCount = 0;
        }
        this.lastWheelDirection = direction;

        // Accumulation des événements molette
        this.wheelAccumulator += Math.abs(e.deltaY);
        this.wheelEventCount++;

        // Clear du timeout précédent
        if (this.wheelTimeout) {
            clearTimeout(this.wheelTimeout);
        }

        // Reset après délai
        this.wheelTimeout = setTimeout(() => {
            this.wheelAccumulator = 0;
            this.wheelEventCount = 0;
            this.lastWheelDirection = null;
        }, CONFIG.navigation.wheelTimeout);

        // Critères TRÈS stricts pour navigation
        const shouldNavigate = (
            this.wheelAccumulator > CONFIG.navigation.wheelThreshold &&
            this.wheelEventCount >= 3 // Au moins 3 événements molette consistants
        );

        if (shouldNavigate) {
            // Anti-rebond
            const now = Date.now();
            if (now - this.lastNavigationTime < CONFIG.navigation.debounceDelay) {
                return;
            }
            this.lastNavigationTime = now;

            this.handleDirectionalNavigation(direction);
            e.preventDefault();

            // Reset immédiat après navigation
            this.wheelAccumulator = 0;
            this.wheelEventCount = 0;
            this.lastWheelDirection = null;
        }
    }

    // ================================
    // ZONE DE SÉCURITÉ
    // ================================

    // Zone de sécurité avancée et intelligente
    checkAdvancedSafetyZone(sectionContent) {
        const scrollTop = sectionContent.scrollTop;
        const scrollHeight = sectionContent.scrollHeight;
        const clientHeight = sectionContent.clientHeight;

        // Si le contenu ne dépasse pas la hauteur visible, autoriser la navigation
        if (scrollHeight <= clientHeight + 20) {
            return true;
        }

        const safetyZone = CONFIG.navigation.safetyZoneSize;
        const isAtTop = scrollTop <= safetyZone;
        const isAtBottom = scrollTop >= (scrollHeight - clientHeight - safetyZone);

        return isAtTop || isAtBottom;
    }

    handleDirectionalNavigation(direction) {
        // Débouncing pour éviter les navigations multiples
        if (this.navigationDebounce) {
            clearTimeout(this.navigationDebounce);
        }

        this.navigationDebounce = setTimeout(() => {
            if (direction === 'down' && this.currentSection < this.sections.length - 1) {
                this.goToSection(this.currentSection + 1);
            } else if (direction === 'up' && this.currentSection > 0) {
                this.goToSection(this.currentSection - 1);
            }
        }, 50); // Petit délai pour éviter les doubles clics
    }

    // ================================
    // NAVIGATION CLAVIER
    // ================================

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;

            switch(e.key) {
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    if (this.currentSection > 0) {
                        this.goToSection(this.currentSection - 1);
                    }
                    break;
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    if (this.currentSection < this.sections.length - 1) {
                        this.goToSection(this.currentSection + 1);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSection(this.sections.length - 1);
                    break;
                case 'F11':
                    e.preventDefault();
                    this.togglePresentationMode();
                    break;
            }
        });
    }

    // ================================
    // NAVIGATION ENTRE SECTIONS
    // ================================

    goToSection(index) {
        if (index === this.currentSection || this.isTransitioning) return;
        if (index < 0 || index >= this.sections.length) return;

        this.isTransitioning = true;

        // Annonce pour accessibilité
        const sectionNames = ['Couverture', 'Présentation', 'Bureau', 'Artistes', 'Productions', 'Contact'];
        this.announceToScreenReader(`Navigation vers ${sectionNames[index]}`);

        const transition = document.getElementById('page-transition');
        transition?.classList.add('active');

        setTimeout(() => {
            const currentSectionEl = document.getElementById(this.sections[this.currentSection]);
            currentSectionEl?.classList.remove('active');

            const newSectionEl = document.getElementById(this.sections[index]);
            newSectionEl?.classList.add('active');

            const sectionContent = newSectionEl?.querySelector('.section-content');
            if (sectionContent) {
                sectionContent.scrollTop = 0;
            }

            this.updateNavigation(index);
            this.currentSection = index;

            setTimeout(() => {
                transition?.classList.remove('active');
                this.isTransitioning = false;
            }, CONFIG.performance.transitionDuration);
        }, 100);
    }

    updateNavigation(index) {
        const dots = document.querySelectorAll('.nav-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // ================================
    // ANIMATIONS
    // ================================

    startAnimations() {
        // Respect des préférences d'accessibilité
        if (CONFIG.accessibility.respectReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.fade-up, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }

        setTimeout(() => {
            document.querySelectorAll('.fade-up').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        }, 500);
    }
}

// ================================
// INITIALISATION
// ================================

// Service Worker pour optimisation cache (Phase 1)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(e => {
        console.log('Service Worker non disponible');
    });
}

// Initialisation optimisée
document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }

    // Initialisation après chargement des ressources critiques
    const init = () => {
        new BohemePlaquette();
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    };

    // Attendre que les polices et ressources soient chargées
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init);
    }
});

// ================================
// GESTION D'ERREURS GLOBALES
// ================================

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.warn('Erreur détectée:', e.filename, e.lineno, e.message);
});

// Performance monitoring
if ('performance' in window && 'mark' in performance) {
    performance.mark('boheme-plaquette-loaded');
}