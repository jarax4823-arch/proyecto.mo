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

    const renderCorporateInfo = () => `
        <div class="corporate-info">
            <button class="corporate-trigger" type="button" aria-controls="corporate-drawer" aria-expanded="false">
                <span class="corporate-trigger-icon"><i data-lucide="building-2"></i></span>
                <span>Conoce Mountain Roses</span>
                <i data-lucide="arrow-up-right" class="corporate-trigger-arrow"></i>
            </button>
            <div class="corporate-backdrop" data-corporate-close></div>
            <aside class="corporate-drawer" id="corporate-drawer" role="dialog" aria-modal="false" aria-labelledby="corporate-title" aria-hidden="true">
                <div class="corporate-drawer-header">
                    <div>
                        <p class="eyebrow">MOUNTAIN ROSES S.A.S.</p>
                        <h2 id="corporate-title">Información corporativa</h2>
                    </div>
                    <button class="corporate-close" type="button" aria-label="Cerrar información corporativa" data-corporate-close>
                        <i data-lucide="x"></i>
                    </button>
                </div>
                <div class="corporate-drawer-content">
                    <section class="corporate-section corporate-contact">
                        <div class="corporate-section-heading">
                            <span class="corporate-section-icon"><i data-lucide="contact"></i></span>
                            <h3>Información de contacto</h3>
                        </div>
                        <dl class="contact-list">
                            <div><dt>Empresa</dt><dd>Mountain Roses S.A.S.</dd></div>
                            <div><dt>Correo</dt><dd><a href="mailto:mountainroses@mountainroses.com">mountainroses@mountainroses.com</a></dd></div>
                            <div><dt>Correo alternativo</dt><dd><a href="mailto:alejandro.gonzalez@floreslasacacias.com">alejandro.gonzalez@floreslasacacias.com</a></dd></div>
                            <div><dt>Celular</dt><dd><a href="tel:+573104601688">(+57) 310 460 1688</a></dd></div>
                            <div><dt>Celular secundario</dt><dd><a href="tel:+573197745153">(+57) 319 774 5153</a></dd></div>
                            <div class="contact-address"><dt><i data-lucide="map-pin"></i> Dirección</dt><dd>Km 1 Vía Madrid - Puente Piedra</dd></div>
                        </dl>
                    </section>
                    <div class="corporate-copy-grid">
                        <section class="corporate-section">
                            <div class="corporate-section-heading">
                                <span class="corporate-section-icon"><i data-lucide="sprout"></i></span>
                                <h3>¿Quiénes Somos?</h3>
                            </div>
                            <p>Mountain Roses es una empresa agroindustrial dedicada a la producción, procesamiento y empaque de rosas para exportación. En sus cultivos crecen más de 30 tipos de rosa estándar, desde variedades tradicionales como Freedom y Vendela hasta algunas de última generación como Clementina, Grace Kelly y Yellow Accent. El 80% de sus flores crece mediante el método de hidroponía.</p>
                        </section>
                        <section class="corporate-section">
                            <div class="corporate-section-heading">
                                <span class="corporate-section-icon"><i data-lucide="route"></i></span>
                                <h3>Ubicación estratégica</h3>
                            </div>
                            <p>Cuenta con modernas instalaciones y está situada en el perímetro urbano del municipio cundinamarqués de <strong>Madrid, Cundinamarca</strong>, frente a la base de la Fuerza Aérea Colombiana, ubicación que le permite acceder rápidamente al <strong>Aeropuerto El Dorado</strong>, lo cual facilita los <strong>despachos internacionales</strong> de flor para sus clientes.</p>
                        </section>
                    </div>
                    <section class="corporate-section certification-section">
                        <div class="corporate-section-heading">
                            <span class="corporate-section-icon"><i data-lucide="badge-check"></i></span>
                            <h3>Certificaciones y estándares</h3>
                        </div>
                        <p>Su responsabilidad ambiental y social le ha permitido obtener la certificación de sellos y entidades reconocidas internacionalmente como Rainforest, Basc, FlorVerde y otros códigos requeridos específicamente por algunos de nuestros clientes.</p>
                        <div class="certification-list" aria-label="Certificaciones mencionadas">
                            <span>Rainforest</span><span>Basc</span><span>FlorVerde</span>
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    `;

    const setupCorporateInfo = () => {
        const corporateInfo = document.querySelector('.corporate-info');
        const trigger = corporateInfo?.querySelector('.corporate-trigger');
        const drawer = corporateInfo?.querySelector('.corporate-drawer');
        const closeButton = corporateInfo?.querySelector('.corporate-close');
        if (!trigger || !drawer || !closeButton) return;

        const setOpen = (isOpen) => {
            corporateInfo.classList.toggle('is-open', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
            drawer.setAttribute('aria-hidden', String(!isOpen));
            if (isOpen) closeButton.focus();
            if (!isOpen) trigger.focus();
        };

        trigger.addEventListener('click', () => setOpen(true));
        corporateInfo.querySelectorAll('[data-corporate-close]').forEach((element) => {
            element.addEventListener('click', () => setOpen(false));
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && corporateInfo.classList.contains('is-open')) setOpen(false);
        });
    };

    const setupSidebarToggle = () => {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.sidebar-toggle');
        toggle?.addEventListener('click', () => {
            const isMobile = window.matchMedia('(max-width: 680px)').matches;
            const stateClass = isMobile ? 'mobile-open' : 'sidebar-collapsed';
            const isOpen = sidebar.classList.toggle(stateClass);
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.body.insertAdjacentHTML('afterbegin', renderSidebar());
        const content = document.querySelector('.content');
        content.insertAdjacentHTML('afterbegin', renderHeader());
        content.insertAdjacentHTML('beforeend', renderFooter());
        content.insertAdjacentHTML('beforeend', renderCorporateInfo());
        lucide.createIcons();
        setupSidebarToggle();
        setupCorporateInfo();
    });
})();
