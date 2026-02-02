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

    // Identify Current App (Ultra-robust detection matrix)
    function getApp() {
        const path = window.location.pathname;
        const title = document.title ? document.title.toLowerCase() : "";
        const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText.toLowerCase() : "";

        // Layer 1: Path Match (Production & Repo structure)
        let found = apps.find(app => path.includes(encodeURIComponent(app.path)) || path.includes(app.path));
        if (found) return found;

        // Layer 2: H1 Text Match (Localhost Tie-breaker)
        if (h1) {
            found = apps.find(app => h1.includes(app.name.toLowerCase().split('.')[0]));
            if (found) return found;
        }

        // Layer 3: Title Match (Localhost Fallback)
        if (title) {
            found = apps.find(app =>
                title.includes(app.name.toLowerCase().split('.')[0]) ||
                title.includes(app.id)
            );
            if (found) return found;
        }

        // Layer 4: DOM Signatures (The "Nuclear" Fallback)
        if (document.querySelector('[x-data]')) return apps.find(a => a.id === 'alpine');
        if (document.querySelector('todo-app')) return apps.find(a => a.id === 'lit');
        if (document.querySelector('meta[content*="create-react-app"]')) return apps.find(a => a.id === 'react');
        if (document.body && document.body.innerHTML.includes('svelte-')) return apps.find(a => a.id === 'svelte');
        if (document.querySelector('script[src*="stencil"]')) return apps.find(a => a.id === 'stencil');

        return null;
    }

    // Initial Detection & State
    let currentApp = getApp();
    let prevApp = null;
    let nextApp = null;

    // Dynamic Re-detection (Late binding)
    function ensureApp() {
        if (!currentApp) {
            currentApp = getApp();
        }
        if (currentApp && (!prevApp || !nextApp)) {
            const idx = apps.indexOf(currentApp);
            prevApp = apps[(idx - 1 + apps.length) % apps.length];
            nextApp = apps[(idx + 1) % apps.length];
            console.log(`%c [Shell] Context Set: ${currentApp.name} `, `background: ${currentApp.color}; color: white; border-radius: 3px; font-weight: bold;`);
            document.documentElement.style.setProperty('--shell-accent', currentApp.color);
        }
        return currentApp;
    }

    ensureApp();

    // State Sync Configuration
    const MASTER_KEY = 'universal-todo-master';
    const KEY_MAP = {
        'alpine': 'todos',
        'angular': 'angular-todos',
        'lit': 'lit-todos',
        'mithril': 'mithril-todos',
        'react': 'todos',
        'solid': 'solid-todos',
        'stencil': 'stencil-todos',
        'svelte': 'svelte-todos',
        'vanilla': 'vanilla-todos',
        'vue': 'vue-todos'
    };

    // Data Normalization Utilities
    function normalizeToMaster(appId, data) {
        if (!Array.isArray(data)) return [];
        return data.map((t, i) => {
            const isObj = t && typeof t === 'object';
            return {
                id: (isObj && t.id) || (Date.now() + i),
                text: (isObj ? (t.text || t.title || t.content) : String(t)) || '',
                completed: isObj ? !!t.completed : false
            };
        });
    }

    function normalizeFromMaster(appId, masterData) {
        if (!Array.isArray(masterData)) return [];
        if (appId === 'react') {
            // React expects a simple array of strings
            return masterData.map(t => typeof t === 'object' ? (t.text || String(t)) : String(t));
        }
        // All other apps expect { id, text, completed }
        return masterData;
    }

    // Storage Interception (Virtual Storage Bridge)
    const originalSetItem = Storage.prototype.setItem;
    const originalGetItem = Storage.prototype.getItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    const originalClear = Storage.prototype.clear;

    // 1. Intercept setItem
    Object.defineProperty(Storage.prototype, 'setItem', {
        value: function (key, value) {
            const app = ensureApp();
            if (app && key === KEY_MAP[app.id]) {
                console.log(`%c [Storage] setItem Bridge: ${key} -> ${MASTER_KEY} (${app.id}) `, "color: #42b883; font-weight: bold;");
                try {
                    const data = JSON.parse(value);
                    const normalized = normalizeToMaster(app.id, data);
                    originalSetItem.call(this, MASTER_KEY, JSON.stringify(normalized));
                } catch (e) { console.error("[Storage] setItem Bridge Error:", e); }
            }
            return originalSetItem.apply(this, arguments);
        },
        configurable: true
    });

    // 2. Intercept getItem (Definitive Framework Bridge)
    Object.defineProperty(Storage.prototype, 'getItem', {
        value: function (key) {
            const app = ensureApp();
            if (app && key === KEY_MAP[app.id]) {
                const masterData = originalGetItem.call(this, MASTER_KEY);
                if (masterData) {
                    console.log(`%c [Storage] getItem Bridge: ${MASTER_KEY} -> ${key} (${app.id}) `, "color: #3b82f6; font-weight: bold;");
                    try {
                        const parsed = JSON.parse(masterData);
                        const appSpecific = normalizeFromMaster(app.id, parsed);
                        return JSON.stringify(appSpecific);
                    } catch (e) { console.error("[Storage] getItem Bridge Error:", e); }
                }
            }
            return originalGetItem.apply(this, arguments);
        },
        configurable: true
    });

    // 3. Intercept removeItem
    Object.defineProperty(Storage.prototype, 'removeItem', {
        value: function (key) {
            const app = ensureApp();
            if (app && key === KEY_MAP[app.id]) {
                originalRemoveItem.call(this, MASTER_KEY);
            }
            return originalRemoveItem.apply(this, arguments);
        },
        configurable: true
    });

    // 4. Intercept clear
    Object.defineProperty(Storage.prototype, 'clear', {
        value: function () {
            const app = ensureApp();
            originalClear.call(this);
            if (app) originalRemoveItem.call(this, MASTER_KEY);
        },
        configurable: true
    });

    // View Transitions Tagging
    function applyTransitions() {
        const h1 = document.querySelector('h1');
        if (h1) h1.style.viewTransitionName = 'app-title';

        const container = document.querySelector('.app-container') || document.querySelector('todo-app') || document.querySelector('app-root');
        if (container) container.style.viewTransitionName = 'app-shell';
    }

    // UI State & Variables
    // The accent color is now set within ensureApp()
    // if (currentApp) document.documentElement.style.setProperty('--shell-accent', currentApp.color);

    function initShell() {
        const app = ensureApp();
        if (!app) return;

        const inject = () => {
            if (document.getElementById('gallery-shell-root')) return;
            createUI();
            applyTransitions();
        };

        if (document.readyState === 'complete') setTimeout(inject, 500);
        else window.addEventListener('load', () => setTimeout(inject, 500));

        const observer = new MutationObserver(() => {
            if (!document.getElementById('gallery-shell-root')) inject();
        });
        observer.observe(document.body, { childList: true });
    }

    function createUI() {
        const root = document.createElement('div');
        root.id = 'gallery-shell-root';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-shell-overlay';
        overlay.innerHTML = `
            <button class="shell-btn" id="shell-prev" title="Previous (Left Arrow)"><i class="fas fa-chevron-left"></i></button>
            <a href="../" class="shell-btn" title="Home (H)"><i class="fas fa-home"></i></a>
            <button class="shell-btn" id="shell-info" title="Info (?)"><i class="fas fa-info"></i></button>
            <button class="shell-btn" id="shell-next" title="Next (Right Arrow)"><i class="fas fa-chevron-right"></i></button>
        `;

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'shell-modal-overlay';
        const modal = document.createElement('div');
        modal.className = 'shell-info-modal';
        modal.innerHTML = `
            <button class="shell-modal-close" id="shell-modal-close">&times;</button>
            <div class="shell-info-header">
                <img src="../_portal/logos/${currentApp.logo}" class="shell-info-logo" alt="Logo">
                <h2 class="shell-info-title">${currentApp.name}</h2>
            </div>
            <div class="shell-info-body"><p>${currentApp.desc}</p></div>
        `;

        const palette = document.createElement('div');
        palette.className = 'shell-command-palette';
        palette.innerHTML = `
            <div class="shell-search-wrapper">
                <i class="fas fa-search shell-search-icon"></i>
                <input type="text" id="shell-search-input" placeholder="Jump to framework... (Search)" autocomplete="off">
            </div>
            <div class="shell-results-list" id="shell-results"></div>
            <div class="shell-palette-footer">
                <span><span class="shell-kbd">↑↓</span> to navigate</span>
                <span><span class="shell-kbd">Enter</span> to select</span>
                <span><span class="shell-kbd">Esc</span> to close</span>
            </div>
        `;

        document.body.appendChild(root);
        root.appendChild(overlay);
        root.appendChild(modalOverlay);
        root.appendChild(modal);
        root.appendChild(palette);

        const searchInput = palette.querySelector('#shell-search-input');
        const resultsList = palette.querySelector('#shell-results');
        let selectedIndex = 0;
        let filteredApps = [...apps];

        const navigate = (app) => window.location.href = `../${app.path}/`;
        const toggleModal = () => {
            modal.classList.toggle('active');
            modalOverlay.classList.toggle('active');
        };

        const togglePalette = (forceClose = false) => {
            if (palette.classList.contains('active') || forceClose) {
                palette.classList.remove('active');
                searchInput.blur();
            } else {
                palette.classList.add('active');
                searchInput.value = '';
                renderResults('');
                setTimeout(() => searchInput.focus(), 100);
            }
        };

        const renderResults = (query) => {
            filteredApps = apps.filter(app =>
                app.name.toLowerCase().includes(query.toLowerCase()) ||
                app.desc.toLowerCase().includes(query.toLowerCase())
            );
            selectedIndex = 0;
            updateResultsUI();
        };

        const updateResultsUI = () => {
            resultsList.innerHTML = filteredApps.map((app, i) => `
                <div class="shell-result-item ${i === selectedIndex ? 'selected' : ''}" data-index="${i}" style="--shell-accent: ${app.color}">
                    <img src="../_portal/logos/${app.logo}" class="shell-result-logo">
                    <div class="shell-result-info">
                        <div class="shell-result-name">${app.name}</div>
                        <div class="shell-result-meta">${currentApp && app.id === currentApp.id ? 'Currently Viewing' : 'Framework'}</div>
                    </div>
                </div>
            `).join('');
            resultsList.querySelectorAll('.shell-result-item').forEach(item => {
                item.onclick = () => navigate(filteredApps[item.dataset.index]);
            });
        };

        document.getElementById('shell-prev').onclick = () => {
            const app = ensureApp();
            if (prevApp) navigate(prevApp);
        };
        document.getElementById('shell-next').onclick = () => {
            const app = ensureApp();
            if (nextApp) navigate(nextApp);
        };
        document.getElementById('shell-info').onclick = toggleModal;
        document.getElementById('shell-modal-close').onclick = toggleModal;
        modalOverlay.onclick = toggleModal;
        searchInput.oninput = (e) => renderResults(e.target.value);

        const isTyping = () => {
            const el = document.activeElement;
            return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
        };

        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                togglePalette();
                return;
            }

            if (palette.classList.contains('active')) {
                if (e.key === 'Escape') togglePalette(true);
                else if (e.key === 'ArrowDown') { selectedIndex = (selectedIndex + 1) % filteredApps.length; updateResultsUI(); }
                else if (e.key === 'ArrowUp') { selectedIndex = (selectedIndex - 1 + filteredApps.length) % filteredApps.length; updateResultsUI(); }
                else if (e.key === 'Enter' && filteredApps[selectedIndex]) navigate(filteredApps[selectedIndex]);
                return;
            }

            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') toggleModal();
                return;
            }

            if (isTyping()) return;

            if (e.key === 'ArrowLeft') {
                ensureApp();
                if (prevApp) navigate(prevApp);
            }
            else if (e.key === 'ArrowRight') {
                ensureApp();
                if (nextApp) navigate(nextApp);
            }
            else if (e.key === '?' || (e.key === '/' && e.shiftKey)) toggleModal();
            else if (e.key.toLowerCase() === 'h') window.location.href = '../';
        });
    }

    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    initShell();
})();
