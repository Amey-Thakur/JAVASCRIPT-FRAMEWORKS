import { Component, State, h, Host } from '@stencil/core';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

@Component({
    tag: 'app-root',
    styleUrl: 'app-root.css',
    shadow: true,
})
export class AppRoot {
    @State() todos: Todo[] = [];
    @State() newTodo: string = '';
    @State() filter: 'all' | 'active' | 'completed' = 'all';

    componentWillLoad() {
        const saved = localStorage.getItem('stencil-todos');
        if (saved) {
            try {
                this.todos = JSON.parse(saved);
            } catch (e) { }
        }
    }

    componentDidUpdate() {
        localStorage.setItem('stencil-todos', JSON.stringify(this.todos));
    }

    handleInput = (e: InputEvent) => {
        this.newTodo = (e.target as HTMLInputElement).value;
    };

    addTodo = (e: Event) => {
        e.preventDefault();
        if (!this.newTodo.trim()) return;
        this.todos = [...this.todos, {
            id: Date.now(),
            text: this.newTodo,
            completed: false
        }];
        this.newTodo = '';
    };

    toggleTodo = (id: number) => {
        this.todos = this.todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
    };

    deleteTodo = (id: number) => {
        this.todos = this.todos.filter(t => t.id !== id);
    };

    clearCompleted = () => {
        this.todos = this.todos.filter(t => !t.completed);
    };

    render() {
        const filteredTodos = this.todos.filter(t => {
            if (this.filter === 'active') return !t.completed;
            if (this.filter === 'completed') return t.completed;
            return true;
        });

        return (
            <Host>
                <div class="app-container stencil-todo-app">
                    <h1>Stencil To-Do App</h1>

                    <form class="input-group" onSubmit={this.addTodo}>
                        <input
                            type="text"
                            value={this.newTodo}
                            onInput={this.handleInput}
                            placeholder="Add a new task..."
                        />
                        <button type="submit" class="btn">Add</button>
                    </form>

                    <div class="filters">
                        <button
                            class={`filter-btn ${this.filter === 'all' ? 'active' : ''}`}
                            onClick={() => this.filter = 'all'}
                        >All</button>
                        <button
                            class={`filter-btn ${this.filter === 'active' ? 'active' : ''}`}
                            onClick={() => this.filter = 'active'}
                        >Active</button>
                        <button
                            class={`filter-btn ${this.filter === 'completed' ? 'active' : ''}`}
                            onClick={() => this.filter = 'completed'}
                        >Completed</button>
                    </div>

                    <ul class="todo-list">
                        {filteredTodos.map(todo => (
                            <li class="todo-item">
                                <div
                                    class={`checkbox ${todo.completed ? 'checked' : ''}`}
                                    onClick={() => this.toggleTodo(todo.id)}
                                >
                                    {todo.completed ? '✓' : ''}
                                </div>
                                <span
                                    class={`todo-text ${todo.completed ? 'coming-done' : ''}`}
                                >
                                    {todo.text}
                                </span>
                                <button class="delete-btn" onClick={() => this.deleteTodo(todo.id)}>×</button>
                            </li>
                        ))}
                    </ul>

                    <div style={{ "margin-top": '1rem', "text-align": 'center', color: 'var(--text-light)', "font-size": '0.875rem' }}>
                        {this.todos.filter(t => !t.completed).length} items left
                        {this.todos.some(t => t.completed) && (
                            <button
                                onClick={this.clearCompleted}
                                class="filter-btn"
                                style={{ "margin-left": '1rem', color: 'var(--danger)' }}
                            >
                                Clear Completed
                            </button>
                        )}
                    </div>
                </div>

                <div class="footer-divider"></div>

                <footer class="app-footer">
                    <p>Created by <a href="https://github.com/Amey-Thakur" target="_blank" class="author-link">Amey Thakur</a> & <a
                        href="https://github.com/msatmod" target="_blank" class="author-link">Mega Satish</a></p>
                    <p>Released: June 23, 2022 • <a href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS" target="_blank"
                        class="repo-link">GitHub Repo</a></p>
                </footer>
            </Host>
        );
    }
}

// Security and Easter Egg Logic
(function () {
    // 1. Anti-Right-Click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 2. Shortcut Protection
    document.addEventListener('keydown', e => {
        if ((e as any).keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && ((e as any).keyCode === 73 || (e as any).keyCode === 74)) || // Ctrl+Shift+I/J
            (e.ctrlKey && (e as any).keyCode === 85) // Ctrl+U
        ) {
            e.preventDefault();
        }
    });

    // 3. Console Message
    console.log(
        '%c Created by Amey Thakur & Mega Satish ',
        `background: #324fff url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNTguMDQ5IDE1IDMxLjQ2NyA0My44M2g0OS4xOUwxMDcuMTk4IDE1SDU4LjA1ek0yNi42NTIgNDkuMTcgMCA3OGgxMDEuMzQ4TDEyOCA0OS4xN0gyNi42NTJ6TTQ3LjA4OCA4M2wtMS43MDMgMS45NTJMMjEgMTEyaDQ4LjU5Mkw5NiA4M0g0Ny4wODh6Ii8+PC9zdmc+') no-repeat 5px center; background-size: 30px 30px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 40px;`
    );
    console.log('%c Stencil: A compiler that generates Web Components (Custom Elements) and builds high performance web apps. ', 'color: #324fff; font-style: italic;');
    console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
    console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
    console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
    console.log('%c 💡 Scholarly Insight: Stencil bridges the gap between frameworks and native web components. By compiling components into standard Custom Elements, it ensures future-proof interoperability while offering features like Virtual DOM, reactive data binding, and TypeScript support at build time—resulting in highly optimized, lazy-loaded bundles. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

    // 4. Easter Egg (AMEYMEGA)
    let sequence = '';
    const secret = 'AMEYMEGA';
    document.addEventListener('keydown', e => {
        sequence += e.key.toUpperCase();
        if (sequence.endsWith(secret)) {
            alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Stencil.\n\nThank you for exploring our JS Framework Ecosystem!');
            sequence = '';
        }
        if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
    });
})();
