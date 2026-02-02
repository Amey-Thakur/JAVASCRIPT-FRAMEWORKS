/**
 * ================================================================================
 * FILE: main.js
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * The reactive orchestration engine for the Alpine.js implementation. This file 
 * initializes the 'todoApp' data context, providing localized state persistence 
 * through proxy-based reactivity. It integrates seamlessly with the global 
 * "Magic Sync" Virtual Storage Bridge while maintaining the framework's core 
 * goal of non-intrusive progressive enhancement.
 * ================================================================================
 */

import Alpine from 'alpinejs';
import './style.css';

/**
 * STATE ENCAPSULATION
 * Implements the core business logic using Alpine's reactive proxy system.
 * The 'save' method ensures parity with and triggers the Virtual Storage interceptors.
 */
Alpine.data('todoApp', () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    newTodo: '',
    filter: 'all', // all, active, completed

    addTodo() {
        if (this.newTodo.trim() === '') return;
        this.todos.push({
            id: Date.now(),
            text: this.newTodo,
            completed: false
        });
        this.newTodo = '';
        this.save();
    },

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.save();
    },

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.save();
    },

    clearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.save();
    },

    get filteredTodos() {
        if (this.filter === 'active') return this.todos.filter(t => !t.completed);
        if (this.filter === 'completed') return this.todos.filter(t => t.completed);
        return this.todos;
    },

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}));

window.Alpine = Alpine;
Alpine.start();

// Security and Easter Egg Logic
/**
 * SYSTEM INTEGRITY LAYERS
 * Implements professional-grade security abstraction and internal metadata tracking 
 * to provide a high-fidelity development and user experience across the portal.
 */
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
    console.log(
        '%c Created by Amey Thakur & Mega Satish ',
        'background: #324fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 128 128\'%3E%3Cpath fill=\'%2377c1d2\' fill-rule=\'evenodd\' d=\'M98.444 35.562 126 62.997 98.444 90.432 70.889 62.997z\' clip-rule=\'evenodd\'/%3E%3Cpath fill=\'%232d3441\' fill-rule=\'evenodd\' d=\'m29.556 35.562 57.126 56.876H31.571L2 62.997z\' clip-rule=\'evenodd\'/%3E%3C/svg%3E") no-repeat 8px center; background-size: 22px 22px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 35px;'
    );
    console.log('%c Alpine.js: A rugged, minimal tool for composing behavior directly in your markup. ', 'color: #324fff; font-style: italic;');
    console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
    console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
    console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
    console.log('%c 💡 Scholarly Insight: Alpine.js democratizes reactivity by implementing a lightweight Observer Pattern directly within the DOM, allowing for sophisticated state orchestration without the abstraction overhead of a Virtual DOM. It is the quintessential example of "progressive enhancement" in the modern component era. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

    // 4. Easter Egg (AMEYMEGA)
    let sequence = '';
    const secret = 'AMEYMEGA';
    document.addEventListener('keydown', e => {
        sequence += e.key.toUpperCase();
        if (sequence.endsWith(secret)) {
            alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Alpine.js.\n\nThank you for exploring our JS Framework Ecosystem!');
            sequence = '';
        }
        if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
    });
})();
