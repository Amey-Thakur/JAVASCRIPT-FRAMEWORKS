/**
 * ================================================================================
 * FILE: App.jsx
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * A foundational component for the Solid implementation, demonstrating 
 * property-based state and lifecycle hooks within a reactive environment.
 * ================================================================================
 */

import { createSignal, onMount } from "solid-js";

function App() {

  const [todos, setTodos] = createSignal([]);
  let todoText;

  onMount(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
  });

  function addTodo(event) {
    event.preventDefault();
    const next = [...todos(), todoText.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
  }

  return (
    <div>
      <ul>
        {todos().map(todo => (<li key={todo}>{todo}</li>))}
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" ref={todoText} />
        <input type="submit" value="Add Todo" />
      </form>
    </div>
  );
}

export default App;
