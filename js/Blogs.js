document.addEventListener('DOMContentLoaded', () => {
            // Header scroll effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Mock Data
            const articles = [
                { id: 1, title: 'The Enduring Legacy of Gawilgarh Fort', category: 'History', date: 'Oct 01, 2025', excerpt: 'Explore the ruins of this majestic 12th-century fort, standing tall as a testament to the region\'s rich and turbulent history.', image: 'https://images.unsplash.com/photo-1632642878036-681412175990?q=80&w=2070&auto=format&fit=crop', featured: true },
                { id: 2, title: 'A Walk Through the Clouds: Vistas of Chikhaldara', category: 'Nature', date: 'Sep 25, 2025', excerpt: 'Discover the ultimate monsoon retreat with lush green landscapes, cascading waterfalls, and misty valleys.', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop', featured: false },
                { id: 3, title: 'The Spiritual Heart: Ambadevi Temple Guide', category: 'Culture', date: 'Sep 18, 2025', excerpt: 'A deep dive into the history, architecture, and spiritual significance of Amravati’s most revered historic temple.', image: 'https://images.unsplash.com/photo-1588243183536-1eeb4b66dc34?q=80&w=2070&auto=format&fit=crop', featured: false },
                { id: 4, title: 'A Safari Guide to Melghat Tiger Reserve', category: 'Nature', date: 'Sep 12, 2025', excerpt: 'Planning a trip to Melghat? Here is everything you need to know about spotting majestic tigers amidst the raw wilderness.', image: 'https://images.unsplash.com/photo-1608447702221-1d5423e803c5?q=80&w=2070&auto=format&fit=crop', featured: false },
                { id: 5, title: 'Uncovering the Secrets of Amner Fort', category: 'History', date: 'Sep 05, 2025', excerpt: 'Nestled on the banks of rivers, Amner Fort offers a fascinating glimpse into the architectural brilliance of the past.', image: 'https://images.unsplash.com/photo-1603812490422-b07221544716?q=80&w=2070&auto=format&fit=crop', featured: false },
                { id: 6, title: 'Finding Serenity at Shakkar Lake', category: 'Nature', date: 'Aug 29, 2025', excerpt: 'A perfect weekend getaway guide to enjoying sunset reflections and serene boat rides away from the city chaos.', image: 'https://images.unsplash.com/photo-1545465926-291746ac6e83?q=80&w=2071&auto=format&fit=crop', featured: false },
                { id: 7, title: 'Local Cuisine: Flavors of Vidarbha', category: 'Culture', date: 'Aug 20, 2025', excerpt: 'Dive into the spicy, flavorful, and unique traditional dishes that define the culinary identity of the region.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2000&auto=format&fit=crop', featured: false },
                { id: 8, title: 'Exploring the Mystique of Muktagiri', category: 'History', date: 'Aug 10, 2025', excerpt: 'An architectural marvel featuring 52 temples surrounded by a spectacular waterfall during the monsoon.', image: 'https://images.unsplash.com/photo-1596484552993-9ebb4eb722da?q=80&w=2000&auto=format&fit=crop', featured: false }
            ];

            const gridContainer = document.getElementById('blog-grid');
            const featuredContainer = document.getElementById('featured-post');
            const filterBtns = document.querySelectorAll('.filter-btn');
            const searchInput = document.getElementById('search-input');
            const loadMoreBtn = document.getElementById('load-more-btn');
            const loadMoreContainer = document.getElementById('load-more-container');

            let currentFilter = 'all';
            let currentSearch = '';
            let displayedCount = 6;

            // Render Featured
            const renderFeatured = () => {
                const featured = articles.find(a => a.featured);
                if (featured && currentFilter === 'all' && currentSearch === '') {
                    featuredContainer.innerHTML = `
                        <a href="#" class="featured-card">
                            <div class="featured-img-container">
                                <img src="${featured.image}" alt="${featured.title}">
                            </div>
                            <div class="featured-content">
                                <div>
                                    <span class="tag">${featured.category}</span>
                                    <h2 class="featured-title">${featured.title}</h2>
                                    <p class="featured-desc">${featured.excerpt}</p>
                                </div>
                                <div class="meta-info">
                                    <span class="date">${featured.date}</span>
                                    <span class="read-more">Read Story <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></span>
                                </div>
                            </div>
                        </a>
                    `;
                    featuredContainer.style.display = 'block';
                } else {
                    featuredContainer.style.display = 'none';
                }
            };

            // Intersection Observer for scroll animations
            const observeElements = () => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                document.querySelectorAll('.scroll-animate, .blog-card').forEach(el => observer.observe(el));
            };

            // Render Grid
            const renderGrid = () => {
                let filtered = articles.filter(a => !a.featured || (currentFilter !== 'all' || currentSearch !== ''));
                
                if (currentFilter !== 'all') {
                    filtered = filtered.filter(a => a.category === currentFilter);
                }

                if (currentSearch) {
                    const term = currentSearch.toLowerCase();
                    filtered = filtered.filter(a => 
                        a.title.toLowerCase().includes(term) || 
                        a.excerpt.toLowerCase().includes(term)
                    );
                }

                const toDisplay = filtered.slice(0, displayedCount);
                gridContainer.innerHTML = '';

                if (toDisplay.length === 0) {
                    gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">No articles found matching your criteria.</p>';
                    loadMoreContainer.style.display = 'none';
                    return;
                }

                toDisplay.forEach((article, index) => {
                    const delay = (index % 3) * 100; // staggered delay
                    const card = document.createElement('a');
                    card.href = '#';
                    card.className = 'blog-card';
                    card.style.transitionDelay = `${delay}ms`;
                    card.innerHTML = `
                        <div class="card-img-wrapper">
                            <img src="${article.image}" alt="${article.title}">
                            <div class="card-img-overlay"></div>
                        </div>
                        <div class="card-content">
                            <span class="tag">${article.category}</span>
                            <h3 class="card-title">${article.title}</h3>
                            <p class="card-desc">${article.excerpt}</p>
                            <div class="meta-info">
                                <span class="date">${article.date}</span>
                            </div>
                        </div>
                    `;
                    gridContainer.appendChild(card);
                });

                if (filtered.length <= displayedCount) {
                    loadMoreContainer.style.display = 'none';
                } else {
                    loadMoreContainer.style.display = 'block';
                }

                // Small delay to allow element creation before observing
                setTimeout(observeElements, 50);
            };

            // Event Listeners
            filterBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    currentFilter = e.target.getAttribute('data-filter');
                    displayedCount = 6;
                    renderFeatured();
                    renderGrid();
                });
            });

            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.trim();
                displayedCount = 6;
                renderFeatured();
                renderGrid();
            });

            loadMoreBtn.addEventListener('click', () => {
                loadMoreBtn.classList.add('loading');
                
                // Simulate network request
                setTimeout(() => {
                    displayedCount += 3;
                    renderGrid();
                    loadMoreBtn.classList.remove('loading');
                }, 800);
            });

            // Initial render
            renderFeatured();
            renderGrid();
            
            // Trigger initial scroll animations for elements already in viewport
            setTimeout(() => {
                document.getElementById('featured-post')?.classList.add('visible');
            }, 300);
        });