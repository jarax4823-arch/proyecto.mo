(() => {
    const renderPlatformCard = (platform) => {
        const imageRoot = window.location.pathname.includes('/pages/') ? '../assets/images/' : 'assets/images/';
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

    window.renderPlatformsView = () => `
        <section class="module-page">
            <div class="module-heading">
                <div>
                    <p class="eyebrow">CENTRO DE ACCESO</p>
                    <h1>Plataformas Empresariales</h1>
                    <p>Encuentra rápidamente las herramientas que necesitas para trabajar.</p>
                </div>
                <span class="module-count">19 plataformas</span>
            </div>
            <div class="platform-toolbar">
                <label class="search-bar" for="platform-search">
                    <i data-lucide="search" class="search-icon"></i>
                    <input id="platform-search" type="search" placeholder="Buscar una plataforma...">
                </label>
                <div class="filter-tabs" aria-label="Filtrar plataformas">
                    ${['Todas', 'Administración', 'Cultivo', 'Operaciones', 'Tecnología'].map((filter) => `
                        <button class="tab-btn" data-platform-filter="${filter}">${filter}</button>
                    `).join('')}
                </div>
            </div>
            <div id="platform-grid" class="platforms-grid"></div>
            <p id="platform-empty" class="empty-state" hidden>No encontramos plataformas con esos criterios.</p>
        </section>
    `;

    const setupPlatformPage = (container = document, selectedCategory) => {
        const grid = container.querySelector('#platform-grid');
        const emptyState = container.querySelector('#platform-empty');
        const searchInput = container.querySelector('#platform-search');
        const tabs = [...container.querySelectorAll('[data-platform-filter]')];
        const params = new URLSearchParams(window.location.search);
        let activeFilter = selectedCategory || params.get('category') || 'Todas';

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
                if (card.dataset.platformLinkBound === 'true') return;
                const name = card.querySelector('h3').textContent.trim();
                const open = (event) => {
                    event.preventDefault();
                    if (window.platformUrls[name]) {
                        window.open(window.platformUrls[name], '_blank', 'noopener,noreferrer');
                    }
                };
                card.addEventListener('click', open);
                card.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') open(event);
                });
                card.dataset.platformLinkBound = 'true';
            });
        };

        tabs.forEach((tab) => {
            tab.onclick = () => {
                activeFilter = tab.dataset.platformFilter;
                updateView();
            };
        });
        if (searchInput) searchInput.oninput = updateView;
    };

    window.initializePlatformsPage = setupPlatformPage;

    document.addEventListener('DOMContentLoaded', () => setupPlatformPage());
})();
