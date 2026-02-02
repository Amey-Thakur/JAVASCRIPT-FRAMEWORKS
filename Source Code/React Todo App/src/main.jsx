/**
 * ================================================================================
 * FILE: main.jsx
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * The primary architectural specification for the React implementation. This 
 * monolithic component orchestrates the application's lifecycle using the 
 * useState and useEffect hooks. It demonstrates a declarative UI paradigm 
 * where the DOM is a predictable function of state, synchronized with 
 * the project's "Magic Sync" Virtual Storage Bridge.
 * ================================================================================
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

/**
 * ARCHITECTURAL SPECIFICATION: COMPONENT ORCHESTRATION
 * Implements the core application logic using functional components and hooks.
 * Features granular state tracking for tasks and filters, with automated 
 * persistence synchronization via the Virtual Storage Bridge.
 */
function App() {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('react-todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        /**
         * VIRTUAL STORAGE INTERFACE
         * Persists the reactive state to the underlying storage primitive.
         * This effect ensures that every state mutation is reflected in 
         * the Global Shell, maintaining cross-framework synchronization.
         */
        localStorage.setItem('react-todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, {
            id: Date.now(),
            text: newTodo,
            completed: false
        }]);
        setNewTodo('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(t => !t.completed));
    };

    const filteredTodos = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });

    return (
        <>
            <div className="app-container">
                <h1>React To-Do App</h1>

                <form className="input-group" onSubmit={addTodo}>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task..."
                    />
                    <button type="submit" className="btn">Add</button>
                </form>

                <div className="filters">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >All</button>
                    <button
                        className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                        onClick={() => setFilter('active')}
                    >Active</button>
                    <button
                        className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => setFilter('completed')}
                    >Completed</button>
                </div>

                <ul className="todo-list">
                    {filteredTodos.map(todo => (
                        <li key={todo.id} className="todo-item">
                            <div
                                className={`checkbox ${todo.completed ? 'checked' : ''}`}
                                onClick={() => toggleTodo(todo.id)}
                            >
                                {todo.completed && '✓'}
                            </div>
                            <span
                                className={`todo-text ${todo.completed ? 'coming-done' : ''}`}
                            >
                                {todo.text}
                            </span>
                            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>×</button>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--text-light)', fontSize: '0.875rem' }}>
                    {todos.filter(t => !t.completed).length} items left
                    {todos.some(t => t.completed) && (
                        <button
                            onClick={clearCompleted}
                            className="filter-btn"
                            style={{ marginLeft: '1rem', color: 'var(--danger)' }}
                        >
                            Clear Completed
                        </button>
                    )}
                </div>
            </div>

            <div className="footer-divider"></div>

            <footer className="app-footer">
                <p>Created by <a href="https://github.com/Amey-Thakur" target="_blank" className="author-link">Amey Thakur</a> & <a
                    href="https://github.com/msatmod" target="_blank" className="author-link">Mega Satish</a></p>
                <p>Released: June 23, 2022 • <a href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS" target="_blank"
                    className="repo-link">GitHub Repo</a></p>
            </footer>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

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
    console.log(
        '%c Created by Amey Thakur & Mega Satish ',
        'background: #324fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 128 128\'%3E%3Cg fill=\'%2361DAFB\'%3E%3Ccircle cx=\'64\' cy=\'64\' r=\'11.4\'/%3E%3Cpath d=\'M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z\'/%3E%3C/g%3E%3C/svg%3E") no-repeat 8px center; background-size: 22px 22px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 35px;'
    );
    console.log('%c React: The library for web and native user interfaces. ', 'color: #324fff; font-style: italic;');
    console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
    console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
    console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
    console.log('%c 💡 Scholarly Insight: React\'s paradigm shift resides in its reconciliation algorithm and the implementation of a Fiber architecture, which enables asynchronous rendering. By abstracting the DOM into a hierarchical tree of immutable state, it allows for declarative UI transitions that are both predictable and highly performant, fundamentally maturing the "UI as a function of state" philosophy. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

    // 4. Easter Egg (AMEYMEGA)
    let sequence = '';
    const secret = 'AMEYMEGA';
    document.addEventListener('keydown', e => {
        sequence += e.key.toUpperCase();
        if (sequence.endsWith(secret)) {
            alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using React.\n\nThank you for exploring our JS Framework Ecosystem!');
            sequence = '';
        }
        if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
    });
})();
