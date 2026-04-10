document.addEventListener('DOMContentLoaded', () => {
            const app = {
                init() {
                    this.setupPreloader();
                    this.setupCursor();
                    this.setupAnimations();
                    this.setupScrollListeners();
                    this.setupInteractiveElements();
                },

                /**
                 * PRELOADER
                 * Shows logo, then reveals page with gate animation.
                 */
                setupPreloader() {
                    const preloader = document.querySelector('.preloader');
                    const preloaderLogo = document.querySelector('.preloader-logo');

                    preloaderLogo.style.opacity = '1';
                    preloaderLogo.style.transform = 'scale(1)';

                    setTimeout(() => {
                        preloader.classList.add('loaded');
                    }, 2000);

                    setTimeout(() => {
                        preloader.style.display = 'none';
                        // [ACCESSIBILITY] Remove role="status" once preloading is done
                        preloader.removeAttribute('role');
                        preloader.removeAttribute('aria-label');

                        document.querySelector('.main-header').classList.add('visible');

                        const heroTitle = document.querySelector('.hero h1');
                        this.animateText(heroTitle);
                        document.querySelector('.hero').classList.add('is-visible');
                    }, 2800);
                },

                /**
                 * CUSTOM CURSOR
                 * Tracks mouse position for the decorative cursor dot + outline.
                 */
                setupCursor() {
                    // [PERFORMANCE] Skip cursor setup on touch devices
                    if (window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window) {
                        return;
                    }

                    const cursor = document.querySelector('.cursor');
                    const cursorOutline = document.querySelector('.cursor-outline');

                    window.addEventListener('mousemove', (e) => {
                        cursor.style.left = `${e.clientX}px`;
                        cursor.style.top = `${e.clientY}px`;
                        cursorOutline.style.left = `${e.clientX}px`;
                        cursorOutline.style.top = `${e.clientY}px`;
                    });

                    document.addEventListener('mouseleave', () => {
                        cursor.classList.add('hidden');
                        cursorOutline.classList.add('hidden');
                    });

                    document.addEventListener('mouseenter', () => {
                        cursor.classList.remove('hidden');
                        cursorOutline.classList.remove('hidden');
                    });
                },

                /**
                 * SCROLL-TRIGGERED ANIMATIONS
                 * Uses IntersectionObserver to reveal elements on scroll.
                 */
                setupAnimations() {
                    const animatedElements = document.querySelectorAll('[data-animate]');

                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach((entry, index) => {
                            if (entry.isIntersecting) {
                                entry.target.style.transitionDelay = `${index * 100}ms`;
                                entry.target.classList.add('is-visible');

                                const textToAnimate = entry.target.querySelector('[data-animate-text]');
                                if (textToAnimate) this.animateText(textToAnimate);

                                observer.unobserve(entry.target);
                            }
                        });
                    }, { threshold: 0.2 });

                    animatedElements.forEach((el) => observer.observe(el));
                },

                /**
                 * SCROLL LISTENERS
                 * Handles header shrink, parallax, and horizontal team scroll.
                 */
                setupScrollListeners() {
                    const header = document.querySelector('.main-header');
                    const heroBg = document.querySelector('.hero-background');
                    const heroContent = document.querySelector('.hero-content');
                    const heroEmblem = document.querySelector('.hero-emblem');
                    const horizontalSection = document.querySelector('.horizontal-scroll-section');
                    const track = document.querySelector('.team-track');

                    let scrollDistance = 0;

                    // Only enable horizontal scroll on desktop
                    if (horizontalSection && track && window.innerWidth > 768) {
                        const trackWidth = track.scrollWidth;
                        const windowWidth = window.innerWidth;
                        scrollDistance = trackWidth - windowWidth;
                        horizontalSection.style.height = `${scrollDistance + window.innerHeight}px`;
                    }

                    // [PERFORMANCE] Using passive listener to avoid blocking scroll
                    window.addEventListener('scroll', () => {
                        const scrollY = window.scrollY;

                        // Header shrink on scroll
                        header.classList.toggle('scrolled', scrollY > 50);

                        // Parallax effects on hero
                        heroBg.style.transform = `translateY(${scrollY * 0.4}px) scale(1.2)`;
                        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
                        heroEmblem.style.transform = `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.05}deg)`;

                        // Horizontal scroll for desktop team track
                        if (horizontalSection && track && window.innerWidth > 768) {
                            const rect = horizontalSection.getBoundingClientRect();
                            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                                const progress = -rect.top / (horizontalSection.offsetHeight - window.innerHeight);
                                track.style.transform = `translateX(-${progress * scrollDistance}px)`;
                            }
                        }
                    }, { passive: true });
                },

                /**
                 * INTERACTIVE ELEMENTS
                 * Handles hover state for custom cursor and 3D tilt on cards.
                 */
                setupInteractiveElements() {
                    // [PERFORMANCE] Skip on touch devices where cursor is hidden
                    const isTouchDevice = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

                    if (!isTouchDevice) {
                        const cursor = document.querySelector('.cursor');
                        const interactiveElements = document.querySelectorAll('a, button, .team-card, .story-item--image');

                        interactiveElements.forEach((el) => {
                            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
                        });
                    }

                    // 3D tilt effect – still applies to all screen sizes with a pointer
                    const tiltableElements = document.querySelectorAll('.team-card, .story-item--image');

                    tiltableElements.forEach((el) => {
                        el.addEventListener('mousemove', (e) => {
                            const rect = el.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const { width, height } = rect;
                            const rotateX = (y / height - 0.5) * -15;
                            const rotateY = (x / width - 0.5) * 15;

                            const target = el.classList.contains('story-item--image') ? el.querySelector('img') : el;
                            target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

                            if (el.classList.contains('team-card')) {
                                el.style.setProperty('--glow-x', `${x}px`);
                                el.style.setProperty('--glow-y', `${y}px`);
                            }
                        });

                        el.addEventListener('mouseleave', () => {
                            const target = el.classList.contains('story-item--image') ? el.querySelector('img') : el;
                            target.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
                            target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                            setTimeout(() => { target.style.transition = ''; }, 500);
                        });
                    });
                },

                /**
                 * TEXT ANIMATION
                 * Groups text into words to prevent mid-word wrapping, then splits to characters.
                 */
                animateText(element) {
                    const text = element.textContent;
                    element.innerHTML = '';
                    
                    // [PERFORMANCE] Use a documentFragment to batch DOM writes
                    const fragment = document.createDocumentFragment();

                    // Split text into words first to prevent bad line breaks
                    const words = text.split(' ');

                    words.forEach((word, index) => {
                        // Create an unbreakable wrapper for each word
                        const wordWrapper = document.createElement('span');
                        wordWrapper.style.display = 'inline-block';
                        wordWrapper.style.whiteSpace = 'nowrap';

                        // Split word into characters for the animation
                        word.split('').forEach((char) => {
                            const span = document.createElement('span');
                            span.className = 'char';
                            span.textContent = char;
                            wordWrapper.appendChild(span);
                        });

                        fragment.appendChild(wordWrapper);

                        // Put the space back in between words
                        if (index < words.length - 1) {
                            const spaceSpan = document.createElement('span');
                            spaceSpan.className = 'char';
                            spaceSpan.textContent = '\u00A0'; // Non-breaking space
                            fragment.appendChild(spaceSpan);
                        }
                    });

                    element.appendChild(fragment);

                    setTimeout(() => {
                        element.querySelectorAll('.char').forEach((charEl, i) => {
                            charEl.style.transitionDelay = `${i * 20}ms`;
                            charEl.style.transform = 'translateY(0)';
                        });
                    }, 100);
                }
            };

            app.init();
        });