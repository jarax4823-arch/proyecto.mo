(() => {
    const navigationItems = [
        { label: 'Inicio', icon: 'house', path: '../index.html', key: 'home' },
        { label: 'Plataformas', icon: 'layout-grid', path: 'plataformas.html', key: 'platforms' },
        { label: 'Herramientas', icon: 'wrench', path: 'herramientas.html', key: 'tools' },
        { label: 'Informes', icon: 'file-text', path: 'informes.html', key: 'reports' },
        { label: 'Documentación', icon: 'book-open', path: 'documentacion.html', key: 'documentation' },
        { label: 'Soporte', icon: 'circle-help', path: 'soporte.html', key: 'support' }
    ];

    const getAssetRoot = () => window.location.pathname.includes('/pages/') ? '../' : '';

    const getPagePath = (path) => `${getAssetRoot()}${getAssetRoot() ? '' : 'pages/'}${path}`;

    const renderNavigation = () => {
        const currentPage = document.body.dataset.page || 'home';
        return navigationItems.map((item) => `
            <a href="${item.key === 'home' ? `${getAssetRoot()}index.html` : getPagePath(item.path)}"
                class="nav-item${currentPage === item.key ? ' active' : ''}">
                <i data-lucide="${item.icon}" class="nav-icon"></i>
                <span>${item.label}</span>
            </a>
        `).join('');
    };

    const renderSidebar = () => `
        <aside class="sidebar">
            <div class="brand">
                <div class="brand-logo"><i data-lucide="rose"></i></div>
                <span>Mountain Roses</span>
                <button class="sidebar-toggle" aria-label="Abrir navegación" aria-expanded="false">
                    <i data-lucide="menu"></i>
                </button>
            </div>
            <nav class="navigation">${renderNavigation()}</nav>
            <div class="sidebar-divider"></div>
            <div class="categories">
                <p class="category-title">CATEGORÍAS</p>
                ${[
                    ['layout-grid', 'Todas', '19'],
                    ['briefcase-business', 'Administración', '5'],
                    ['sprout', 'Cultivo', '4'],
                    ['settings-2', 'Operaciones', '6'],
                    ['monitor-cog', 'Tecnología', '4']
                ].map(([icon, label, count]) => `
                    <a class="category-item" href="${getPagePath('plataformas.html')}?category=${encodeURIComponent(label)}">
                        <i data-lucide="${icon}" class="category-icon"></i>
                        <span>${label}</span>
                        <span class="category-number">${count}</span>
                    </a>
                `).join('')}
            </div>
            <div class="support-box">
                <h3>¿Necesitas ayuda?</h3>
                <p>Nuestro equipo de soporte está para ayudarte.</p>
                <a href="${getPagePath('soporte.html')}">Contactar soporte</a>
            </div>
        </aside>
    `;

    const renderHeader = () => `
        <header class="top-header">
            <label class="search-bar" for="global-search">
                <i data-lucide="search" class="search-icon"></i>
                <input id="global-search" type="search" placeholder="Buscar plataformas, herramientas...">
            </label>
            <div class="user-profile">
                <button class="notification-btn" aria-label="Notificaciones">
                    <i data-lucide="bell"></i><span class="badge">2</span>
                </button>
                <div class="profile-info">
                    <div class="avatar"><i data-lucide="rose"></i></div>
                    <span class="user-name">Supervisor</span>
                    <i data-lucide="chevron-down" class="dropdown-icon"></i>
                </div>
            </div>
        </header>
    `;

    const renderFooter = () => `
        <footer class="footer">
            <span>© 2024 Mountain Roses S.A.S. Todos los derechos reservados.</span>
            <div class="footer-links">
                <a href="#">Política de privacidad</a>
                <a href="#">Términos de uso</a>
            </div>
        </footer>
    `;

    const setupSidebarToggle = () => {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.sidebar-toggle');
        toggle?.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('mobile-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', renderSidebar());
        const content = document.querySelector('.content');
        content.insertAdjacentHTML('afterbegin', renderHeader());
        content.insertAdjacentHTML('beforeend', renderFooter());
        lucide.createIcons();
        setupSidebarToggle();
    });
})();
