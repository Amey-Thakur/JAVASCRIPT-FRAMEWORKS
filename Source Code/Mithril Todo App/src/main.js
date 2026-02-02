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
 * The primary architectural specification for the Mithril.js implementation. 
 * This file defines the core Todo component, orchestrating its lifecycle 
 * through high-performance virtual DOM rendering. It implements an explicit 
 * state management model (oninit/view) and integrates seamlessly with the 
 * global "Magic Sync" Virtual Storage Bridge.
 * ================================================================================
 */

import m from "mithril";
import "./style.css";

/**
 * ARCHITECTURAL SPECIFICATION: COMPONENT ORCHESTRATION
 * Defines the application's logical structure using Mithril's functional 
 * component model. Features explicit persistence synchronization and 
 * hyperscript-based declarative rendering for optimal performance.
 */
const TodoApp = {
    oninit: function (vnode) {
        vnode.state.todos = JSON.parse(localStorage.getItem("mithril-todos") || "[]");
        vnode.state.newTodo = "";
        vnode.state.filter = "all"; // all, active, completed

        vnode.state.addTodo = function () {
            if (vnode.state.newTodo.trim()) {
                vnode.state.todos.push({
                    id: Date.now(),
                    text: vnode.state.newTodo,
                    completed: false
                });
                vnode.state.newTodo = "";
                vnode.state.save();
            }
        };

        vnode.state.toggleTodo = function (id) {
            vnode.state.todos = vnode.state.todos.map(t =>
                t.id === id ? { ...t, completed: !t.completed } : t
            );
            vnode.state.save();
        };

        vnode.state.deleteTodo = function (id) {
            vnode.state.todos = vnode.state.todos.filter(t => t.id !== id);
            vnode.state.save();
        };

        vnode.state.clearCompleted = function () {
            vnode.state.todos = vnode.state.todos.filter(t => !t.completed);
            vnode.state.save();
        };

        vnode.state.save = function () {
            /**
             * VIRTUAL STORAGE INTERFACE
             * Synchronizes the internal component state with the underlying storage 
             * primitive. This mutation triggers the Global Shell interceptors to
             * maintain cross-framework state parity.
             */
            localStorage.setItem("mithril-todos", JSON.stringify(vnode.state.todos));
        };
    },

    view: function (vnode) {
        const { todos, filter } = vnode.state;
        const filteredTodos = todos.filter(t => {
            if (filter === "active") return !t.completed;
            if (filter === "completed") return t.completed;
            return true;
        });

        return [
            m(".app-container.mithril-todo-app", [
                m("h1", "Mithril To-Do App"),
                m("form.input-group", {
                    onsubmit: (e) => {
                        e.preventDefault();
                        vnode.state.addTodo();
                    }
                }, [
                    m("input[type=text]", {
                        placeholder: "Add a new task...",
                        value: vnode.state.newTodo,
                        oninput: (e) => vnode.state.newTodo = e.target.value
                    }),
                    m("button.btn[type=submit]", "Add")
                ]),
                m(".filters", [
                    m("button.filter-btn", {
                        class: filter === "all" ? "active" : "",
                        onclick: () => vnode.state.filter = "all"
                    }, "All"),
                    m("button.filter-btn", {
                        class: filter === "active" ? "active" : "",
                        onclick: () => vnode.state.filter = "active"
                    }, "Active"),
                    m("button.filter-btn", {
                        class: filter === "completed" ? "active" : "",
                        onclick: () => vnode.state.filter = "completed"
                    }, "Completed"),
                ]),
                m("ul.todo-list", filteredTodos.map(todo =>
                    m("li.todo-item", { key: todo.id }, [
                        m(".checkbox", {
                            class: todo.completed ? "checked" : "",
                            onclick: () => vnode.state.toggleTodo(todo.id)
                        }, todo.completed ? "✓" : ""),
                        m("span.todo-text", {
                            class: todo.completed ? "coming-done" : ""
                        }, todo.text),
                        m("button.delete-btn", {
                            onclick: () => vnode.state.deleteTodo(todo.id)
                        }, "×")
                    ])
                )),
                m("div", { style: "margin-top: 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;" }, [
                    m("span", todos.filter(t => !t.completed).length + " items left"),
                    todos.some(t => t.completed)
                        ? m("button.filter-btn", {
                            style: "color: var(--danger); margin-left:1rem",
                            onclick: () => vnode.state.clearCompleted()
                        }, "Clear Completed")
                        : null
                ])
            ]),
            m(".footer-divider"),
            m("footer.app-footer", [
                m("p", [
                    "Created by ",
                    m("a.author-link", { href: "https://github.com/Amey-Thakur", target: "_blank" }, "Amey Thakur"),
                    " & ",
                    m("a.author-link", { href: "https://github.com/msatmod", target: "_blank" }, "Mega Satish")
                ]),
                m("p", [
                    "Released: June 23, 2022 • ",
                    m("a.repo-link", { href: "https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS", target: "_blank" }, "GitHub Repo")
                ])
            ])
        ];
    }
};

m.mount(document.body, TodoApp);

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
        'background: #324fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 256 246\'%3E%3Cpath fill=\'%23010002\' d=\'M213.424 160.075c-.114 47.306-38.639 85.764-85.972 85.764c-47.408 0-85.98-38.572-85.98-85.98l.027-.437C16.67 144.328 0 117.095 0 85.98C0 38.565 38.565 0 85.98 0c15.261 0 29.574 4.044 42.017 11.05C140.439 4.043 154.759 0 170.02 0C217.435 0 256 38.572 256 85.98c0 31.566-17.146 59.143-42.576 74.095M127.997 29.117c-15.558 11.528-26.285 29.212-28.398 49.474c8.748-3.015 18.095-4.724 27.853-4.724c10.188 0 19.918 1.87 28.982 5.14c-2.005-20.436-12.772-38.282-28.437-49.89m-70.684 121.55c8.768 3.897 18.458 6.117 28.666 6.117a70.3 70.3 0 0 0 27.954-5.773c-14.226-12.288-24.42-29.104-28.23-48.229c-15.228 11.184-25.826 28.263-28.39 47.885m70.139-61.62a70.3 70.3 0 0 0-27.65 5.633c2.428 19.703 12.98 36.89 28.195 48.161c15.093-11.184 25.584-28.175 28.128-47.676c-8.775-3.91-18.465-6.117-28.673-6.117m14.609 61.97a70.4 70.4 0 0 0 27.953 5.774a70.3 70.3 0 0 0 27.657-5.632c-2.396-19.414-12.671-36.365-27.516-47.657c-3.916 18.835-14.044 35.376-28.094 47.515m-14.61 79.647c36.554 0 66.72-27.838 70.429-63.423c-8.748 3.008-18.095 4.724-27.86 4.724c-15.261 0-29.581-4.044-42.023-11.049c-12.436 7.005-26.749 11.05-42.018 11.05c-10.188 0-19.918-1.871-28.982-5.135c3.519 35.78 33.767 63.833 70.455 63.833M85.98 15.168c-39.05 0-70.811 31.762-70.811 70.811c0 23 11.07 43.41 28.108 56.358c5.006-24.098 20.18-44.46 40.772-56.58c.074-25.887 11.675-49.076 29.891-64.809a70.2 70.2 0 0 0-27.96-5.78m84.042 0a70.3 70.3 0 0 0-27.954 5.773c18.27 15.78 29.905 39.057 29.905 65.032l-.027.437c20.235 12.308 35.053 32.65 39.824 56.633c17.583-12.9 29.063-33.64 29.063-57.064c-.006-39.043-31.768-70.811-70.811-70.811\'/%3E%3C/svg%3E") no-repeat 8px center; background-size: 22px 22px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 35px;'
    );
    console.log('%c Mithril.js: A modern client-side JavaScript framework for building Single Page Applications. ', 'color: #324fff; font-style: italic;');
    console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
    console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
    console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
    console.log('%c 💡 Scholarly Insight: Mithril.js is a pragmatist\'s framework, focusing on high-performance rendering through a minimalist virtual DOM implementation. By eschewing complex abstractions in favor of a straightforward, function-oriented model, it empowers developers to reason about state transitions with mathematical clarity, proving that efficiency and simplicity are often concurrent. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

    // 4. Easter Egg (AMEYMEGA)
    let sequence = '';
    const secret = 'AMEYMEGA';
    document.addEventListener('keydown', e => {
        sequence += e.key.toUpperCase();
        if (sequence.endsWith(secret)) {
            alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Mithril.js.\n\nThank you for exploring our JS Framework Ecosystem!');
            sequence = '';
        }
        if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
    });
})();
