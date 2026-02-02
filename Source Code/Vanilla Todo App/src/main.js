import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="app-container">
    <h1>Vanilla To-Do App</h1>
    
    <form class="input-group" id="todo-form">
      <input 
        type="text" 
        id="todo-input"
        placeholder="Add a new task..." 
      />
      <button type="submit" class="btn">Add</button>
    </form>

    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="active">Active</button>
      <button class="filter-btn" data-filter="completed">Completed</button>
    </div>

    <ul class="todo-list" id="todo-list"></ul>

    <div style="margin-top: 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;">
        <span id="items-left">0</span> items left
        <button id="clear-completed" class="filter-btn" style="margin-left: 1rem; color: var(--danger); display: none;">Clear Completed</button>
    </div>
  </div>

  <div class="footer-divider"></div>

  <footer class="app-footer">
    <p>Created by <a href="https://github.com/Amey-Thakur" target="_blank" class="author-link">Amey Thakur</a> & <a
        href="https://github.com/msatmod" target="_blank" class="author-link">Mega Satish</a></p>
    <p>Released: June 23, 2022 • <a href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS" target="_blank"
        class="repo-link">GitHub Repo</a></p>
  </footer>
`;

// State
let todos = JSON.parse(localStorage.getItem('vanilla-todos') || '[]');
let filter = 'all';

// DOM Elements
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const itemsLeft = document.querySelector('#items-left');
const clearBtn = document.querySelector('#clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

// Functions
const save = () => {
    localStorage.setItem('vanilla-todos', JSON.stringify(todos));
    render();
};

const addTodo = (text) => {
    todos.push({
        id: Date.now(),
        text,
        completed: false
    });
    save();
};

const toggleTodo = (id) => {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
};

const deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    save();
};

const clearCompleted = () => {
    todos = todos.filter(t => !t.completed);
    save();
};

const setFilter = (newFilter) => {
    filter = newFilter;
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    render();
};

const render = () => {
    const filtered = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    list.innerHTML = filtered.map(todo => `
        <li class="todo-item">
            <div class="checkbox ${todo.completed ? 'checked' : ''}" data-id="${todo.id}" role="checkbox">
                ${todo.completed ? '✓' : ''}
            </div>
            <span class="todo-text ${todo.completed ? 'coming-done' : ''}">${todo.text}</span>
            <button class="delete-btn" data-id="${todo.id}">×</button>
        </li>
    `).join('');

    // Events for list items
    list.querySelectorAll('.checkbox').forEach(el => {
        el.addEventListener('click', () => toggleTodo(Number(el.dataset.id)));
    });
    list.querySelectorAll('.delete-btn').forEach(el => {
        el.addEventListener('click', () => deleteTodo(Number(el.dataset.id)));
    });

    itemsLeft.textContent = todos.filter(t => !t.completed).length;
    clearBtn.style.display = todos.some(t => t.completed) ? 'inline-block' : 'none';
};

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
        addTodo(input.value.trim());
        input.value = '';
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

clearBtn.addEventListener('click', clearCompleted);

// Initial Render
render();

// Security and Easter Egg Logic
(function () {
    // 1. Anti-Right-Click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 2. Shortcut Protection
    document.addEventListener('keydown', e => {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
            (e.ctrlKey && e.keyCode === 85) // Ctrl+U
        ) {
            e.preventDefault();
        }
    });

    // 3. Console Message
    // 3. Console Message
    console.log(
        '%c Created by Amey Thakur & Mega Satish ',
        `background: #324fff url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWw9IkphdmFTY3JpcHQiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBpZD0iamF2YXNjcmlwdCI+PHJlY3Qgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIGZpbGw9IiNmN2RmMWUiIHJ4PSIxNSUiPjwvcmVjdD48cGF0aCBkPSJtMzI0LDM3MGMxMCwxNyAyNCwyOSA0NywyOSAyMCwwIDMzLC0xMCAzMywtMjQgMCwtMTYgLTEzLC0yMiAtMzUsLTMybC0xMiwtNWMtMzUsLTE1IC01OCwtMzMgLTU4LC03MiAwLC0zNiAyNywtNjQgNzAsLTY0IDMxLDAgNTMsMTEgNjgsMzlsLTM3LDI0Yy04LC0xNSAtMTcsLTIxIC0zMSwtMjEgLTE0LDAgLTIzLDkgLTIzLDIxIDAsMTQgOSwyMCAzMCwyOWwxMiw1YzQxLDE4IDY0LDM1IDY0LDc2IDAsNDMgLTM0LDY3IC04MCw2NyAtNDUsMCAtNzQsLTIxIC04OCwtNDl6bS0xNzAsNGM4LDEzIDE0LDI1IDMxLDI1IDE2LDAgMjYsLTYgMjYsLTMwVjIwM2g0OHYxNjRjMCw1MCAtMjksNzIgLTcyLDcyIC0zOSwwIC02MSwtMjAgLTcyLC00NHoiPjwvcGF0aD48L3N2Zz4=') no-repeat 5px center; background-size: 30px 30px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 40px;`
    );
    console.log('%c Vanilla JS: The raw power of the web. ', 'color: #324fff; font-style: italic;');
    console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
    console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
    console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
    console.log('%c 💡 Scholarly Insight: Vanilla JS refers to using plain JavaScript without any additional libraries or frameworks. It is the most lightweight and performant way to build web applications, as it interacts directly with the DOM API. Understanding Vanilla JS is fundamental to mastering any modern framework, as they all ultimately compile down to this core language. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

    // 4. Easter Egg (AMEYMEGA)
    let sequence = '';
    const secret = 'AMEYMEGA';
    document.addEventListener('keydown', e => {
        sequence += e.key.toUpperCase();
        if (sequence.endsWith(secret)) {
            alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Vanilla JavaScript.\n\nThank you for exploring our JS Framework Ecosystem!');
            sequence = '';
        }
        if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
    });
})();
