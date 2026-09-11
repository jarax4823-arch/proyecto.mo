(() => {
    const imageRoot = '../assets/images/';

    const renderPlatformCard = (platform) => {
        const visual = platform.image
            ? `<img src="${imageRoot}${platform.image}" alt="${platform.name}">`
            : `<i data-lucide="${platform.icon}" aria-hidden="true"></i>`;

        return `
            <article class="platform-card" data-category="${platform.category}" tabindex="0" role="link" aria-label="Abrir ${platform.name}">
                <div class="platform-logo">${visual}</div>
                <div class="platform-info">
                    <h3>${platform.name}</h3>
                    <p>${platform.description}</p>
                </div>
            </article>
        `;
    };

    const setupPlatformPage = () => {
        const grid = document.querySelector('#platform-grid');
        const emptyState = document.querySelector('#platform-empty');
        const searchInput = document.querySelector('#platform-search');
        const tabs = [...document.querySelectorAll('[data-platform-filter]')];
        const params = new URLSearchParams(window.location.search);
        let activeFilter = params.get('category') || 'Todas';

        if (!grid) return;
        grid.setAttribute('aria-busy', 'true');
        grid.innerHTML = '<p class="loading-state">Cargando plataformas...</p>';

        window.setTimeout(() => {
            grid.innerHTML = window.platformCatalog.map(renderPlatformCard).join('');
            grid.removeAttribute('aria-busy');
            lucide.createIcons();
            updateView();
        }, 0);

        const updateView = () => {
            const term = searchInput?.value.toLowerCase() || '';
            const visiblePlatforms = [...grid.querySelectorAll('.platform-card')].filter((card) => {
                const matchesCategory = activeFilter === 'Todas' || card.dataset.category === activeFilter;
                const matchesSearch = card.textContent.toLowerCase().includes(term);
                card.classList.toggle('is-hidden', !matchesCategory || !matchesSearch);
                return matchesCategory && matchesSearch;
            });

            emptyState.hidden = visiblePlatforms.length > 0;
            tabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.platformFilter === activeFilter));
            connectPlatformCards();
        };

        const connectPlatformCards = () => {
            grid.querySelectorAll('.platform-card').forEach((card) => {
                const name = card.querySelector('h3').textContent.trim();
                const open = () => {
                    if (window.platformUrls[name]) window.location.href = window.platformUrls[name];
                };
                card.addEventListener('click', open);
                card.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') open();
                });
            });
        };

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                activeFilter = tab.dataset.platformFilter;
                updateView();
            });
        });
        searchInput?.addEventListener('input', updateView);
    };

    document.addEventListener('DOMContentLoaded', setupPlatformPage);
})();
