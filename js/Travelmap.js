document.addEventListener('DOMContentLoaded', () => {
            const locations = [
                 { id: 1, name: 'Shri Ambadevi Temple', coords: [20.9300, 77.7600], category: 'Religious', image: 'https://images.unsplash.com/photo-1588243183536-1eeb4b66dc34?q=80&w=2070&auto=format&fit=crop', description: 'A historic temple at Gandhi Square dedicated to Goddess Ambadevi; Amravati’s spiritual heart.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.9300,77.7600' },
                { id: 2, name: 'Ekvira Devi Temple', coords: [20.9305, 77.7605], category: 'Religious', image: 'https://images.unsplash.com/photo-1622306232333-6627a1a1e170?q=80&w=1974&auto=format&fit=crop', description: 'Situated beside Ambadevi, this shrine offers a modern worship experience; often visited together with Ambadevi for darshan.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.9305,77.7605' },
                { id: 3, name: 'Vairat Devi Temple', coords: [21.4385, 77.3001], category: 'Religious', image: 'https://images.unsplash.com/photo-1628771023951-415b34a6a575?q=80&w=2070&auto=format&fit=crop', description: 'A peaceful hilltop temple in the Chikhaldara region offering panoramic views and hosting lively local fairs.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.4385,77.3001' },
                { id: 4, name: 'Melghat Tiger Reserve', coords: [21.45, 77.15], category: 'Nature', image: 'https://images.unsplash.com/photo-1608447702221-1d5423e803c5?q=80&w=2070&auto=format&fit=crop', description: 'A vast Satpura sanctuary home to tigers, gaurs, sloth bears, and birds; ideal for jeep safaris and tribal culture exploration.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.45,77.15' },
                { id: 5, name: 'Gugamal National Park', coords: [21.40, 77.34], category: 'Nature', image: 'https://images.unsplash.com/photo-1518023199873-143051ce8a49?q=80&w=2070&auto=format&fit=crop', description: 'Dense forested park within the Melghat region, perfect for nature enthusiasts and eco-tourism seekers.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.40,77.34' },
                { id: 6, name: 'Semadoh Tiger Project', coords: [21.444, 77.299], category: 'Nature', image: 'https://images.unsplash.com/photo-1447824702326-b2993845b426?q=80&w=2070&auto=format&fit=crop', description: 'Offers guided safaris, wildlife interpretation centres, and birdwatching; an educational gateway to Melghat’s ecosystem.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.444,77.299' },
                { id: 7, name: 'Bhimkund & Chichati Waterfall', coords: [21.413, 77.323], category: 'Nature', image: 'https://images.unsplash.com/photo-1505157299109-8d7f7943cb1c?q=80&w=1974&auto=format&fit=crop', description: 'Natural pools and waterfalls hidden in the hills — ideal for short treks and monsoon adventures.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.413,77.323' },
                { id: 8, name: 'Gawilgarh Fort', coords: [21.3931, 77.3344], category: 'Historical', image: 'https://images.unsplash.com/photo-1632642878036-681412175990?q=80&w=2070&auto=format&fit=crop', description: 'A hilltop fort from the Maratha era featuring ramparts and scenic viewpoints with historical significance.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.3931,77.3344' },
                { id: 9, name: 'Amner Fort', coords: [21.4, 77.35], category: 'Historical', image: 'https://images.unsplash.com/photo-1603812490422-b07221544716?q=80&w=2070&auto=format&fit=crop', description: 'A lesser-known fort near Chikhaldara offering rustic charm and peaceful exploration away from crowds.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.4,77.35' },
                { id: 10, name: 'Local Museums', coords: [20.933, 77.75], category: 'Historical', image: 'https://images.unsplash.com/photo-1586884022206-5a5198c2d854?q=80&w=2070&auto=format&fit=crop', description: 'Preserve Vidarbha’s history, tribal art, and colonial-era artefacts — worth a short educational visit.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.933,77.75' },
                { id: 11, name: 'Bamboo Garden', coords: [20.9415, 77.7550], category: 'Recreation', image: 'https://images.unsplash.com/photo-1556942133-82a7f5605a61?q=80&w=1952&auto=format&fit=crop', description: 'A beautiful city park with bamboo groves, lawns, and walkways for families and photographers.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.9415,77.7550' },
                { id: 12, name: 'Tapadia City Centre Mall', coords: [20.9250, 77.7790], category: 'Recreation', image: 'https://images.unsplash.com/photo-1594701250280-9b8835639b0a?q=80&w=1974&auto=format&fit=crop', description: 'Amravati’s modern shopping destination with retail stores, food courts, and entertainment zones.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=20.9250,77.7790' },
                { id: 13, name: 'Malviya Point (Chikhaldara)', coords: [21.399, 77.33], category: 'Recreation', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1948&auto=format&fit=crop', description: 'Hilltop viewpoints famous for sunrise and sunset photography and panoramic valley views.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.399,77.33' },
                { id: 14, name: 'Shakkar Lake', coords: [21.40, 77.34], category: 'Recreation', image: 'https://images.unsplash.com/photo-1545465926-291746ac6e83?q=80&w=2071&auto=format&fit=crop', description: 'Calm picnic spots ideal for boating, photography, and peaceful nature time.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.40,77.34' },
                { id: 15, name: 'Panchbol Point', coords: [21.39, 77.32], category: 'Recreation', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop', description: 'Scenic viewpoints en route to Chikhaldara, popular for family outings and nature walks.', googleMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=21.39,77.32' },
            ];

            const map = L.map('map', { zoomControl: false }).setView([21.15, 77.45], 9);
            const panel = document.getElementById('map-panel');
            let markersLayer = L.layerGroup().addTo(map);

            function initApp() {
                const preloader = document.querySelector('.preloader');
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 500);

                initMap();
                initPanelControls();
                renderMarkers();
                showDetails(null); 
                panel.classList.add('is-open');
            }

            function initMap() {
                L.control.zoom({ position: 'bottomright' }).addTo(map);
                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OpenStreetMap &copy; CARTO', maxZoom: 19
                }).addTo(map);
            }

            function initPanelControls() {
                const toggleBtn = document.getElementById('panel-toggle-btn');
                const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
                const searchInput = document.getElementById('search-input');

                toggleBtn.addEventListener('click', () => panel.classList.toggle('is-open'));
                filterCheckboxes.forEach(checkbox => checkbox.addEventListener('change', renderMarkers));
                searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
            }
            
            function renderMarkers(locationsToRender = locations) {
                markersLayer.clearLayers();
                const selectedCategories = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(cb => cb.value);
                const filteredLocations = locationsToRender.filter(loc => selectedCategories.includes(loc.category));

                filteredLocations.forEach(location => {
                    const iconHtml = `<div class="custom-map-marker" title="${location.name}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.27.615-.454L16 14.55V9.512a2.25 2.25 0 00-2.25-2.25h-1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5a.75.75 0 01.75.75v3.039l-4.914 4.914a1.25 1.25 0 01-1.768 0L4 14.55V9.512a2.25 2.25 0 00-2.25-2.25h-1.5A.75.75 0 000 8.25v3a.75.75 0 00.75.75h1.5A.75.75 0 013 12.75v3.039l4.914 4.914a1.25 1.25 0 011.768 0z" clip-rule="evenodd" /><path d="M4 5.25a.75.75 0 01.75-.75h1.5a2.25 2.25 0 012.25 2.25v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 00-.75-.75h-1.5A.75.75 0 014 5.25z" /></svg></div>`;
                    const customIcon = L.divIcon({ className: '', html: iconHtml });
                    const marker = L.marker(location.coords, { icon: customIcon }).addTo(markersLayer);
                    marker.on('click', () => showDetails(location));
                });
            }

            function showDetails(location) {
                const detailsContainer = document.getElementById('details-container');
                if (location && location.name) {
                    detailsContainer.innerHTML = `
                        <img id="details-image" src="${location.image}" alt="${location.name}" loading="lazy" decoding="async">
                        <h2 id="details-title">${location.name}</h2>
                        <p id="details-description">${location.description}</p>
                        <div id="action-buttons" class="action-buttons" style="display: grid;">
                            <a href="${location.googleMapUrl}" target="_blank" class="action-btn gmap-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.4-.27.615-.454L16 14.55V9.512a2.25 2.25 0 00-2.25-2.25h-1.5a.75.75 0 00-.75.75v3a.75.75 0 00.75.75h1.5a.75.75 0 01.75.75v3.039l-4.914 4.914a1.25 1.25 0 01-1.768 0L4 14.55V9.512a2.25 2.25 0 00-2.25-2.25h-1.5A.75.75 0 000 8.25v3a.75.75 0 00.75.75h1.5A.75.75 0 013 12.75v3.039l4.914 4.914a1.25 1.25 0 011.768 0z" clip-rule="evenodd" /></svg>
                                Navigate
                            </a>
                        </div>
                    `;
                } else {
                    detailsContainer.innerHTML = `<div class="details-placeholder">Click a pin on the map or use the search to discover Amravati's treasures.</div>`;
                }
                panel.classList.add('is-open');
            }

            function handleSearch(query) {
                const searchResultsContainer = document.getElementById('search-results');
                searchResultsContainer.innerHTML = '';
                if (!query) {
                    renderMarkers();
                    return;
                }
                
                const lowerCaseQuery = query.toLowerCase();
                const results = locations.filter(loc => 
                    loc.name.toLowerCase().includes(lowerCaseQuery) ||
                    loc.category.toLowerCase().includes(lowerCaseQuery) ||
                    loc.description.toLowerCase().includes(lowerCaseQuery)
                );
                
                renderMarkers(results);

                results.forEach(loc => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.textContent = loc.name;
                    item.onclick = () => {
                        showDetails(loc);
                        map.setView(loc.coords, 15);
                        document.getElementById('search-input').value = '';
                        searchResultsContainer.innerHTML = '';
                        renderMarkers();
                    };
                    searchResultsContainer.appendChild(item);
                });
            }

            initApp();
        });