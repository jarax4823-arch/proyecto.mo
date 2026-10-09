(() => {
    const pageTitles = {
        home: 'Mountain Roses',
        platforms: 'Plataformas | Mountain Roses',
        tools: 'Herramientas | Mountain Roses',
        reports: 'Informes | Mountain Roses',
        documentation: 'Documentación | Mountain Roses',
        support: 'Soporte | Mountain Roses'
    };

    const moduleViews = {
        tools: `
            <section class="module-page">
                <div class="module-heading"><div>
                    <p class="eyebrow">PRODUCTIVIDAD</p>
                    <h1>Herramientas</h1>
                    <p>Accede a las herramientas de apoyo para tus actividades diarias.</p>
                </div></div>
                <div class="module-grid">
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="clipboard-check"></i></div>
                        <div class="card-info"><h3>Check List - Disp. Móviles</h3><p>Verificar dispositivos</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="sprout"></i></div>
                        <div class="card-info"><h3>Conteo de Tallos</h3><p>Registrar conteo</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                </div>
            </section>
        `,
        reports: `
            <section class="module-page" data-module="reports">
                <div class="module-heading"><div>
                    <p class="eyebrow">ANÁLISIS Y SEGUIMIENTO</p>
                    <h1>Informes</h1>
                    <p>Consulta reportes operativos y análisis de rendimiento.</p>
                </div></div>
                <div class="module-grid">
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="chart-no-axes-combined"></i></div>
                        <div class="card-info"><h3>Informes de Rendimientos</h3><p>Reportes y análisis de rendimientos</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="file-chart-column"></i></div>
                        <div class="card-info"><h3>Informes Internos</h3><p>Documentación y reportes internos</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                </div>
            </section>
        `,
        documentation: `
            <section class="module-page">
                <div class="module-heading"><div>
                    <p class="eyebrow">CENTRO DE CONOCIMIENTO</p>
                    <h1>Documentación</h1>
                    <p>Encuentra guías, procedimientos y recursos internos.</p>
                </div></div>
                <div class="module-grid">
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="book-open"></i></div>
                        <div class="card-info"><h3>Guías operativas</h3><p>Procedimientos y documentos de consulta</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="folder-open"></i></div>
                        <div class="card-info"><h3>Recursos internos</h3><p>Material de apoyo para equipos</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                </div>
            </section>
        `,
        support: `
            <section class="module-page">
                <div class="module-heading"><div>
                    <p class="eyebrow">CENTRO DE AYUDA</p>
                    <h1>Soporte</h1>
                    <p>Estamos aquí para ayudarte a resolver tus dudas y solicitudes.</p>
                </div></div>
                <div class="module-grid">
                    <a class="report-card" href="mailto:soporte@mountainroses.com">
                        <div class="card-icon"><i data-lucide="headphones"></i></div>
                        <div class="card-info"><h3>Contactar soporte</h3><p>Escríbenos y recibe acompañamiento</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                    <a class="report-card" href="#">
                        <div class="card-icon"><i data-lucide="circle-help"></i></div>
                        <div class="card-info"><h3>Preguntas frecuentes</h3><p>Respuestas para resolver lo habitual</p></div>
                        <i data-lucide="arrow-up-right" class="arrow-icon"></i>
                    </a>
                </div>
            </section>
        `
    };

    const getLocation = () => {
        const [route, query = ''] = window.location.hash.slice(1).split('?');
        return {
            route: pageTitles[route] ? route : 'home',
            category: new URLSearchParams(query).get('category') || 'Todas'
        };
    };

    const routeFromHref = (href) => {
        if (!href || href === '#') return null;
        if (href.startsWith('#')) return href.slice(1).split('?')[0] || null;
        const page = href.split('/').pop().replace('.html', '');
        return ({
            index: 'home',
            plataformas: 'platforms',
            herramientas: 'tools',
            informes: 'reports',
            documentacion: 'documentation',
            soporte: 'support'
        })[page];
    };

    document.addEventListener('DOMContentLoaded', () => {
        const pageView = document.querySelector('#page-view');
        if (!pageView) return;

        const homeMarkup = pageView.innerHTML;
        let currentRoute = 'home';

        const updateSidebar = (route, category) => {
            document.querySelectorAll('.nav-item').forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${route}`);
            });
            document.querySelectorAll('.category-item').forEach((button) => {
                const label = button.querySelector('span')?.textContent.trim();
                button.classList.toggle('active', label === category);
            });
        };

        const renderRoute = (route, category = 'Todas') => {
            const nextRoute = pageTitles[route] ? route : 'home';
            if (currentRoute === 'home' && nextRoute !== 'home') window.destroyDashboardView?.();

            currentRoute = nextRoute;
            document.body.dataset.page = nextRoute;
            document.title = pageTitles[nextRoute];
            pageView.innerHTML = nextRoute === 'home'
                ? homeMarkup
                : nextRoute === 'platforms'
                    ? window.renderPlatformsView()
                    : moduleViews[nextRoute];
            pageView.classList.remove('spa-view-enter');
            void pageView.offsetWidth;
            pageView.classList.add('spa-view-enter');
            updateSidebar(nextRoute, category);
            window.lucide?.createIcons();

            if (nextRoute === 'home') window.initializeDashboardView?.();
            if (nextRoute === 'platforms') window.initializePlatformsPage?.(pageView, category);
        };

        const navigate = (route, category = 'Todas', addHistory = true) => {
            const nextRoute = pageTitles[route] ? route : 'home';
            if (addHistory) {
                const categoryQuery = nextRoute === 'platforms' && category !== 'Todas'
                    ? `?category=${encodeURIComponent(category)}`
                    : '';
                window.history.pushState(null, '', `#${nextRoute}${categoryQuery}`);
            }
            renderRoute(nextRoute, category);
        };

        document.addEventListener('click', (event) => {
            const categoryButton = event.target.closest('.category-item');
            if (categoryButton) {
                const category = categoryButton.querySelector('span')?.textContent.trim() || 'Todas';
                if (currentRoute === 'home') {
                    const tab = [...document.querySelectorAll('.tab-btn[data-filter]')]
                        .find((item) => item.dataset.filter === category);
                    tab?.click();
                    document.querySelectorAll('.category-item').forEach((item) => item.classList.toggle('active', item === categoryButton));
                } else {
                    navigate('platforms', category);
                }
                return;
            }

            const link = event.target.closest('a[href]');
            if (!link || link.target === '_blank' || link.protocol === 'mailto:' || link.protocol === 'tel:') return;
            const href = link.getAttribute('href');
            if (href === '#') {
                event.preventDefault();
                return;
            }
            const route = routeFromHref(href);
            if (!route) return;
            event.preventDefault();
            navigate(route, route === 'platforms' ? getLocation().category : 'Todas');
        });

        window.addEventListener('popstate', () => {
            const location = getLocation();
            renderRoute(location.route, location.category);
        });

        const initialLocation = getLocation();
        if (window.location.hash) renderRoute(initialLocation.route, initialLocation.category);
        else updateSidebar('home', 'Todas');
    });
})();