/* Framework Gallery Overlay Logic */
(function () {
    const apps = [
        { id: 'alpine', name: 'Alpine.js', path: 'Alpine Todo App', logo: 'alpine.png', color: '#77c1d2', desc: 'A rugged, minimal framework for composing behavior directly in your markup. Alpine offers you the reactive and declarative nature of big frameworks like Vue or React at a much lower cost. It allows you to keep your DOM and behavior together in a cleanly coupled way.' },
        { id: 'angular', name: 'Angular', path: 'Angular Todo App', logo: 'angular.png', color: '#dd0031', desc: 'A platform and framework for building single-page client applications using HTML and TypeScript. Developed by Google, Angular provides a robust ecosystem for enterprise-level scale, featuring two-way data binding, dependency injection, and a comprehensive CLI.' },
        { id: 'lit', name: 'Lit', path: 'Lit Todo App', logo: 'lit.png', color: '#324fff', desc: 'A lightweight library for building fast, lightweight web components. Lit uses lit-html to render into shadow DOM and adds API to manage state, properties, and attributes. It is focused on standard Web Components, ensuring high interoperability and future-proof development.' },
        { id: 'mithril', name: 'Mithril', path: 'Mithril Todo App', logo: 'mithril.svg', color: '#337ab7', desc: 'A modern client-side JavaScript framework for building Single Page Applications. It is tiny (< 10kb gzip), fast and provides routing and XHR utilities out of the box. Mithril uses a virtual DOM to provide high performance and a simple, powerful API.' },
        { id: 'react', name: 'React', path: 'React Todo App', logo: 'react.svg', color: '#61dafb', desc: 'A declarative, efficient, and flexible JavaScript library for building user interfaces. Created by Meta, React pioneered the component-based architecture and the Virtual DOM, revolutionizing how modern web applications are designed and maintained.' },
        { id: 'solid', name: 'Solid', path: 'Solid Todo App', logo: 'solid.svg', color: '#2c4f7c', desc: 'A declarative, efficient, and flexible JavaScript library for building user interfaces. Solid follows the same philosophy as React but uses a fine-grained reactivity system instead of a Virtual DOM, resulting in industry-leading performance and zero-overhead abstractions.' },
        { id: 'stencil', name: 'Stencil', path: 'Stencil Todo App', logo: 'stencil.png', color: '#4c48ff', desc: 'A compiler that generates small, blazing fast Web Components. Stencil combines the best concepts of the most popular frameworks (like React, Angular, and Vue) into a build-time tool that outputs standard, framework-agnostic components for the web.' },
        { id: 'svelte', name: 'Svelte', path: 'Svelte Todo App', logo: 'svelte.png', color: '#ff3e00', desc: 'A radical new approach to building user interfaces. Whereas traditional frameworks like React and Vue do the bulk of their work in the browser, Svelte shifts that work into a compile step that happens when you build your app, resulting in highly optimized vanilla JavaScript.' },
        { id: 'vanilla', name: 'Vanilla JS', path: 'Vanilla Todo App', logo: 'vanilla.png', color: '#f7df1e', desc: 'The base language of the web without any additional abstractions. Building with Vanilla JS provides a deep understanding of DOM manipulation, browser APIs, and core computer science concepts, serving as the benchmark for performance and implementation simplicity.' },
        { id: 'vue', name: 'Vue', path: 'Vue Todo App', logo: 'vue.png', color: '#42b883', desc: 'The Progressive JavaScript Framework. Vue is designed to be incrementally adoptable, focusing on the view layer only, making it easy to pick up and integrate with other libraries or existing projects while also being capable of powering sophisticated SPAs.' }
    ];

    // Determine current app
    const currentPath = window.location.pathname;
    const currentIndex = apps.findIndex(app => currentPath.includes(encodeURIComponent(app.path)) || currentPath.includes(app.path));

    if (currentIndex === -1) return; // Not in a recognized app

    const currentApp = apps[currentIndex];

    // Apply theme color
    document.documentElement.style.setProperty('--shell-accent', currentApp.color);
    const prevApp = apps[(currentIndex - 1 + apps.length) % apps.length];
    const nextApp = apps[(currentIndex + 1) % apps.length];

    // UI Injection
    function createUI() {
        // Overlay HTML
        const overlay = document.createElement('div');
        overlay.className = 'gallery-shell-overlay';
        overlay.innerHTML = `
            <button class="shell-btn" id="shell-prev" title="Previous Framework (Left Arrow)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <a href="../" class="shell-btn" title="Back to Portal (H)">
                <i class="fas fa-home"></i>
            </a>
            <button class="shell-btn" id="shell-info" title="Framework Info (I)">
                <i class="fas fa-info"></i>
            </button>
            <button class="shell-btn" id="shell-next" title="Next Framework (Right Arrow)">
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        // Modal HTML
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'shell-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'shell-info-modal';
        modal.innerHTML = `
            <button class="shell-modal-close" id="shell-modal-close">&times;</button>
            <div class="shell-info-header">
                <img src="../_portal/logos/${currentApp.logo}" class="shell-info-logo" alt="${currentApp.name} Logo">
                <h2 class="shell-info-title">${currentApp.name}</h2>
            </div>
            <div class="shell-info-body">
                <p>${currentApp.desc}</p>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(modalOverlay);
        document.body.appendChild(modal);

        // Events
        const navigate = (app) => {
            window.location.href = `../${app.path}/`;
        };

        document.getElementById('shell-prev').onclick = () => navigate(prevApp);
        document.getElementById('shell-next').onclick = () => navigate(nextApp);

        const toggleModal = () => {
            modal.classList.toggle('active');
            modalOverlay.classList.toggle('active');
        };

        document.getElementById('shell-info').onclick = toggleModal;
        document.getElementById('shell-modal-close').onclick = toggleModal;
        modalOverlay.onclick = toggleModal;

        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') toggleModal();
                return;
            }

            switch (e.key) {
                case 'ArrowLeft':
                    navigate(prevApp);
                    break;
                case 'ArrowRight':
                    navigate(nextApp);
                    break;
                case 'i':
                case 'I':
                    toggleModal();
                    break;
                case 'h':
                case 'H':
                    window.location.href = '../';
                    break;
            }
        });
    }

    // Load FontAwesome if not present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // Wait for body to be ready
    if (document.body) {
        createUI();
    } else {
        document.addEventListener('DOMContentLoaded', createUI);
    }
})();
