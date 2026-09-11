(() => {
    const initializeIcons = () => lucide.createIcons();

    const setupPlatformLinks = () => {
        document.querySelectorAll('.platform-card').forEach((card) => {
            const title = card.querySelector('.platform-info h3')?.textContent.trim();
            const url = title ? window.platformUrls[title] : null;

            if (!url) return;

            const openPlatform = (event) => {
                event.preventDefault();
                window.location.href = url;
            };

            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Abrir ${title}`);
            card.addEventListener('click', openPlatform);
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') openPlatform(event);
            });
        });
    };

    const setupPlatformFilters = () => {
        const platformCards = [...document.querySelectorAll('.platform-card')];
        const filterTabs = [...document.querySelectorAll('.tab-btn')];
        const categoryButtons = [...document.querySelectorAll('.category-item')];
        const searchInput = document.querySelector('.search-bar input');

        const filterPlatforms = (filter) => {
            const searchTerm = searchInput?.value.toLowerCase() || '';
            platformCards.forEach((card) => {
                const matchesFilter = filter === 'Todas' || card.dataset.category === filter;
                const matchesSearch = card.textContent.toLowerCase().includes(searchTerm);
                card.classList.toggle('is-hidden', !matchesFilter || !matchesSearch);
            });
        };

        filterTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                filterTabs.forEach((item) => item.classList.remove('active'));
                tab.classList.add('active');
                filterPlatforms(tab.dataset.filter);
            });
        });

        categoryButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const label = button.querySelector('span')?.textContent.trim();
                filterTabs.find((tab) => tab.dataset.filter === label)?.click();
            });
        });

        searchInput?.addEventListener('input', () => {
            const activeFilter = document.querySelector('.tab-btn.active')?.dataset.filter || 'Todas';
            filterPlatforms(activeFilter);
        });
    };

    const setupSidebar = () => {
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.querySelector('.sidebar-toggle');

        sidebarToggle?.addEventListener('click', () => {
            const isOpen = sidebar.classList.toggle('mobile-open');
            sidebarToggle.setAttribute('aria-expanded', String(isOpen));
            sidebarToggle.setAttribute('aria-label', isOpen ? 'Cerrar navegación' : 'Abrir navegación');
        });
    };

    const setupHeroCarousel = () => {
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        window.changeSlide = (index) => {
            if (!slides.length || !dots.length || !slides[index]) return;
            slides[currentSlideIndex].classList.remove('active');
            dots[currentSlideIndex].classList.remove('active');
            currentSlideIndex = index;
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        };

        if (slides.length > 0) {
            window.setInterval(() => {
                window.changeSlide((currentSlideIndex + 1) % slides.length);
            }, 5000);
        }
    };

    document.addEventListener('DOMContentLoaded', () => {
        initializeIcons();
        setupPlatformLinks();
        setupPlatformFilters();
        setupSidebar();
        setupHeroCarousel();
    });
})();
