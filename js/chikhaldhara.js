document.addEventListener('DOMContentLoaded', () => {
            const header = document.querySelector('.main-header');
            const progressBar = document.getElementById('progress-bar');
            const articleBody = document.querySelector('.article-body');

            const onScroll = () => {
                // Header scroll effect
                header.classList.toggle('scrolled', window.scrollY > 50);

                // Progress bar
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = `${scrollPercent}%`;
                progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
            };

            window.addEventListener('scroll', onScroll, { passive: true });
        });