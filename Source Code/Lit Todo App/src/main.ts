import './style.css';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@customElement('todo-app')
export class TodoApp extends LitElement {
  @state()
  private todos: Todo[] = [];

  @state()
  private newTodo = '';

  @state()
  private filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    super();
    this.load();
  }

  static styles = css`
    * {
      box-sizing: border-box;
    }

    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      width: 100%;
      font-family: 'Play', system-ui, sans-serif;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    input {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

    .footer-divider {
      width: 90%;
      max-width: 550px;
      height: 1px;
      background: #e2e8f0;
      margin: 1rem 0 2rem;
      opacity: 0.6;
    }

    .app-footer {
      text-align: center;
      padding-bottom: 2rem;
      font-size: 0.9rem;
      color: #94a3b8;
    }

    .app-footer p {
      margin: 0.4rem 0;
    }

    .author-link {
      color: #324fff;
      text-decoration: none;
      font-weight: 700;
      transition: opacity 0.2s;
    }

    .author-link:hover {
      opacity: 0.8;
    }

    .repo-link {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s;
    }

    .repo-link:hover {
      color: #324fff;
      text-decoration: underline;
    }

    .app-container {
      width: 90%;
      max-width: 550px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 10px 40px rgba(0,0,0,0.06);
      padding: 3rem;
      margin: 2rem auto;
    }

    input, button {
      font-family: 'Play', system-ui, sans-serif;
    }

    h1 {
      text-align: center;
      color: #324fff;
      font-weight: 700;
      margin-bottom: 2rem;
      font-size: 1.75rem;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    input {
      flex: 1;
      padding: 0.75rem 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }

    input:focus {
      border-color: #324fff;
    }

    button.add-btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      background-color: #324fff;
      color: white;
      font-weight: 600;
      cursor: pointer;
    }

    button.add-btn:hover {
      opacity: 0.9;
    }

    .filters {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .filter-btn {
        background: transparent;
        color: #94a3b8;
        border: 1px solid transparent;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.875rem;
    }

    .filter-btn.active {
        color: #324fff;
        background: #e0e7ff;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e2e8f0;
      gap: 0.75rem;
    }

    .checkbox {
      width: 1.25rem;
      height: 1.25rem;
      border-radius: 4px;
      border: 2px solid #e2e8f0;
      cursor: pointer;
      display: grid;
      place-items: center;
      font-size: 0.8rem;
      color: white;
    }

    .checkbox.checked {
      background-color: #324fff;
      border-color: #324fff;
    }

    .text {
      flex: 1;
      font-size: 1.1rem;
      color: #334155;
    }

    .text.completed {
      text-decoration: line-through;
      color: #94a3b8;
    }

    .delete-btn {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0 0.5rem;
    }

    .delete-btn:hover {
        color: #ef4444;
    }
    
    .footer {
         margin-top: 1rem; 
         text-align: center; 
         color: #94a3b8; 
         font-size: 0.875rem;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <h1>Lit To-Do App</h1>
      
      <div class="input-group">
        <input 
          type="text" 
          .value=${this.newTodo}
          @input=${this.handleInput}
          @keyup=${this.handleKeyup}
          placeholder="Add a new task..."
        >
        <button class="add-btn" @click=${this.addTodo}>Add</button>
      </div>

       <div class="filters">
        <button class="filter-btn ${this.filter === 'all' ? 'active' : ''}" @click=${() => this.filter = 'all'}>All</button>
        <button class="filter-btn ${this.filter === 'active' ? 'active' : ''}" @click=${() => this.filter = 'active'}>Active</button>
        <button class="filter-btn ${this.filter === 'completed' ? 'active' : ''}" @click=${() => this.filter = 'completed'}>Completed</button>
      </div>

      <ul>
        ${this.filteredTodos.map(todo => html`
          <li>
            <div 
              class="checkbox ${todo.completed ? 'checked' : ''}" 
              @click=${() => this.toggleTodo(todo.id)}
            >
               ${todo.completed ? '✓' : ''}
            </div>
            <span class="text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <button class="delete-btn" @click=${() => this.deleteTodo(todo.id)}>×</button>
          </li>
        `)}
      </ul>
      
      <div class="footer">
         ${this.todos.filter(t => !t.completed).length} items left
         ${this.todos.some(t => t.completed)
        ? html`<button class="filter-btn" style="color: #ef4444; margin-left:1rem" @click=${this.clearCompleted}>Clear Completed</button>`
        : ''}
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
  }

  private handleInput(e: Event) {
    this.newTodo = (e.target as HTMLInputElement).value;
  }

  private handleKeyup(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.addTodo();
    }
  }

  private addTodo() {
    if (!this.newTodo.trim()) return;
    this.todos = [
      ...this.todos,
      { id: Date.now(), text: this.newTodo, completed: false }
    ];
    this.newTodo = '';
    this.save();
  }

  private toggleTodo(id: number) {
    this.todos = this.todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.save();
  }

  private deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  }

  private clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
  }

  private get filteredTodos() {
    if (this.filter === 'active') return this.todos.filter(t => !t.completed);
    if (this.filter === 'completed') return this.todos.filter(t => t.completed);
    return this.todos;
  }

  private save() {
    localStorage.setItem('lit-todos', JSON.stringify(this.todos));
  }

  private load() {
    const data = localStorage.getItem('lit-todos');
    if (data) this.todos = JSON.parse(data);
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
    'background: #324fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 120\'%3E%3Ccircle cx=\'50\' cy=\'60\' r=\'55\' fill=\'white\'/%3E%3Cpath d=\'M83.83,14.61,48,34.86,12.17,14.61V55.12L48,75.37l35.83-20.25Z\' fill=\'%23324fff\'/%3E%3Cpath d=\'M83.83,44.88,48,65.13,12.17,44.88v40.51L48,105.64l35.83-20.25Z\' fill=\'%2300e8ff\'/%3E%3C/svg%3E") no-repeat 8px center; background-size: 22px 22px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 35px;'
  );
  console.log('%c Lit: Simple Web Components, for the scalable web. ', 'color: #324fff; font-style: italic;');
  console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
  console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
  console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
  console.log('%c 💡 Scholarly Insight: Lit optimizes the rendering lifecycle by leveraging the standard Shadow DOM and template literals. Its architecture promotes true encapsulation and interoperability, enabling the creation of high-performance, reusable web components that maintain state integrity across diverse hosting environments. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

  // 4. Easter Egg (AMEYMEGA)
  let sequence = '';
  const secret = 'AMEYMEGA';
  document.addEventListener('keydown', e => {
    sequence += e.key.toUpperCase();
    if (sequence.endsWith(secret)) {
      alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Lit.\n\nThank you for exploring our JS Framework Ecosystem!');
      sequence = '';
    }
    if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
  });
})();
