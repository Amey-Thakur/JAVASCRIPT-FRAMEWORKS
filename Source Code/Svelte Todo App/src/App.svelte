<script>
  import "./app.css";

  let todos = $state(JSON.parse(localStorage.getItem("svelte-todos") || "[]"));
  let newTodo = $state("");
  let filter = $state("all");

  $effect(() => {
    localStorage.setItem("svelte-todos", JSON.stringify(todos));
  });

  function addTodo(e) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    todos = [
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ];
    newTodo = "";
  }

  function toggleTodo(id) {
    todos = todos.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
  }

  function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
  }

  function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
  }

  let filteredTodos = $derived(
    todos.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    }),
  );

  // Security and Easter Egg Logic
  import { onMount } from "svelte";
  onMount(() => {
    // 1. Anti-Right-Click
    document.addEventListener("contextmenu", (e) => e.preventDefault());

    // 2. Shortcut Protection
    document.addEventListener("keydown", (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || // Ctrl+Shift+I/J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
      }
    });

    // 3. Console Message
    console.log(
      "%c Created by Amey Thakur & Mega Satish ",
      `background: #324fff url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNIDExMC40MzA5MywxNi45MzU4NDcgQyA5OC41NTI0NzQsLTAuMDc2MTUzIDc1LjA4OTEwNCwtNS4xMTgxNTQgNTguMTMwODE4LDUuNjk1ODQ2IGwgLTI5Ljc5MywxOS4wMDAwMDEgYyAtNC4wMzA0NDEsMi41MjkgLTcuNDg4Nzg2LDUuODcxIC0xMC4xNTQ2OCw5LjgxNCAtMi42NjU4OTUsMy45NDMgLTQuNDc5NDY5LDguMzk5IC01LjMyNTEzOCwxMy4wODMgYSAyNS40NzgxNzIsMzAuNjQgMCAwIDAgLTAuNTcyMDk0LDYuMzk2IGMgMC4wMTgzLDUuODMxIDEuNDQ2ODY2LDExLjU3MSA0LjE2MzQ4NSwxNi43Mjk5OTUgLTIuNTQ2OTg2LDMuODcyMDEgLTQuMjg1NzIxLDguMjIgLTUuMTEwNjAyLDEyLjc4MjAxIGEgMjUuMzQ3NjIxLDMwLjQ4MyAwIDAgMCAwLjM0NTA4NiwxNC40MTE5OSBjIDEuMDcyNjc5LDQuNzMyOTk4IDMuMDc4MzM2LDkuMjAzOTk4IDUuOTAwNTU5LDEzLjE1MTk5OCAxMS44Nzc2MTgsMTcuMDExIDM1LjM5MzM3NCwyMi4wNTMgNTIuMjk5MjcyLDExLjI0IGwgMjkuNzYyMjM4LC0xOS4wMDEgYyA0LjAyNzk0NiwtMi41MzIgNy40ODIxMjYsLTUuODc3OTk4IDEwLjE0MTM4NiwtOS44MjQ5OTggMi42NTg0MSwtMy45NDcgNC40NjI4MiwtOC40MDY5OSA1LjI5Njg2LC0xMy4wOTMgMC4zODI1LC0yLjEwNyAwLjU3NDU4LC00LjI0NCAwLjU3MjEsLTYuMzg2IC0wLjAwNywtNS44MTk5OSAtMS40MTc3OCwtMS4xNTUwOTUgLTQuMTExOTQsLTE2LjcwODk5NSAyLjU0NjE2LC0zLjg2OSA0LjI4NDg5LC04LjIxMyA1LjExMTQzLC0xMi43NzEgMC4zNjkyMSwtMi4xMDkgMC41NTcxMywtNC4yNDUgMC41NjIxMiwtNi4zODYgMC4wMDIsLTcuNTk1IC0yLjM3MTUyLC0xNSAtNi43ODY5NywtMjEuMTc4IHoiIGZpbGw9IiNmZjNlMDAiIGlkPSJwYXRoNTk4IiBzdHlsZT0ic3Ryb2tlLXdpZHRoOjAuOTExODg1IiAvPjxwYXRoIGQ9Im0gNTUuMjE4OTQxLDExMi42NjIwNCBhIDI4LjQ2MzM3NSwzNC4yMyAwIDAgMSAtNS45NTM3NzYsMC43NiBjIC0zLjgyMDg5NSwwLjAwMSAtNy41ODUyNDQsLTAuOTI1IC0xMC45NzA0MTYsLTIuNyAtMy4zODQzNDEsLTEuNzc0IC02LjI4ODg4NywtNC4zNDMgLTguNDY0MTc3LC03LjQ4NyAtMi42NTU5MTcsLTMuNzE2IC00LjA4MjgyNywtOC4xNzEgLTQuMDgwMzMyLC0xMi43NCBhIDE1LjY1Nzc2NywxOC44MyAwIDAgMSAwLjMzMjYxMywtMy44MzMgMTUuNDI0OTM3LDE4LjU1IDAgMCAxIDAuNzE5Mjc2LC0yLjc4MiBsIDAuNTYyMTE2LC0xLjcwOCAxLjUxOTIxLDEuMTU2IGMgMy41MjgxOTUsMi41OTEgNy40NzA0OTMsNC41NjQgMTEuNjU4MDk3LDUuODM0IGwgMS4xMDQyNzUsMC4zMzMgLTAuMTAzOTQxLDEuMTA0IHYgMC41NzMgYyAtMC4wMDI1LDEuMzgxIDAuNDI3NDA4LDIuNzMgMS4yMjgxNzQsMy44NTQgMC42NDY5MzMsMC45NTggMS41MTgzOCwxLjc0NCAyLjUzNzgzOSwyLjI4OCBhIDguMjYyMTEyMSw5LjkzNiAwIDAgMCAzLjMxMTk5NywwLjgzNyA4LjI1MTMwMjIsOS45MjMgMCAwIDAgMS43OTAyOSwtMC4yMjkgNy4yNzE3NTYzLDguNzQ1IDAgMCAwIDEuODMyNjk5LC0wLjgwMiBsIDI5Ljc2MDU2NiwtMTkuMDk0IGMgMC44OTIyMzYsLTAuNTY2IDEuNjI3MzExLC0xLjM0OSAyLjEzNTM3NywtMi4yNzYgMC41MDcyMzYsLTAuOTI3IDAuNzcxNjYyLC0xLjk2OCAwLjc2ODMzNywtMy4wMjYgLTAuMDA4NCwtMS4zODEgLTAuNDQ5MDI3LC0yLjcyNSAtMS4yNTk3NzMsLTMuODQ0IC0wLjY1NjkxMiwtMC45NDYgLTEuNTMzMzQ3LC0xLjcxOCAtMi41NTM2MzcsLTIuMjUyIGEgOC4zMTI4MzU3LDkuOTk3IDAgMCAwIC0zLjMwNzAwOCwtMC44MSA4LjI0NjMxMyw5LjkxNyAwIDAgMCAtMS43OTAyOSwwLjIzIDYuOTM4MzExNSw4LjM0NCAwIDAgMCAtMS44MjEwNTgsMC44MDEgbCAtMTEuMzQ2MjY4LDcuMjUgYSAyNC4zNzU1NTgsMjkuMzE0IDAgMCAxIC02LjA0Nzc0LDIuNjU2IGMgLTEuOTQ1Nzg3LDAuNTAyIC0zLjk0NTYyNCwwLjc1OCAtNS45NTQ2MDgsMC43NiAtMy44MjAwNjMsMCAtNy41ODI3NDksLTAuOTI2IC0xMC45NjcwODksLTIuNjk4IC0zLjM4NDM0MSwtMS43NzIgLTYuMjg5NzE4LC00LjMzOCAtOC40Njc1MDIsLTcuNDc4IC0yLjY1MjU5MSwtMy43MTggLTQuMDc5NTAyLC04LjE3MiAtNC4wODAzMzQsLTEyLjc0IDAuMDAxNiwtMS4yODUgMC4xMTMwODksLTIuNTY3IDAuMzMyNjE1LC0zLjgzMyAwLjUwOTcyOCwtMi44MTYgMS41OTczNzQsLTUuNDk1IDMuMTk2NDExLC03Ljg2NyAxLjU5ODIwNywtMi4zNzMgMy42NzIwNSwtNC4zODcgNi4wODkzMTcsLTUuOTE0IGwgMjkuNzkyMTY4LC0xOC45OSBjIDEuODY5Mjg2LC0xLjE5IDMuOTA4MjA1LC0yLjA5IDYuMDQ3NzQsLTIuNjY3IDEuOTQ1Nzg3LC0wLjQ5OSAzLjk0NTYyNSwtMC43NSA1Ljk1Mzc3NiwtMC43NSAzLjgyOTIxLC0wLjAxIDcuNjAzNTM4LDAuOTEgMTAuOTk5NTE5LDIuNjgxIDMuMzk1OTgxLDEuNzcgNi4zMTEzMzgsNC4zNCA4LjQ5NzQzOSw3LjQ4NiAyLjYzNjc4NywzLjcyNyA0LjA0NTQxNyw4LjE4NCA0LjAyODc3NywxMi43NSBhIDE1Ljc0ODQwNCwxOC45MzkgMCAwIDEgLTAuMzMzNDQsMy44NDQgMTUuNDA3NDc1LDE4LjUyOSAwIDAgMSAtMC43MTg0NSwyLjc4MSBsIC0wLjU2MjExLDEuNzA4IC0xLjUxOTIxNiwtMS4xMTQgYyAtMy41MjU2OTksLTIuNTk1IC03LjQ2ODgzMywtNC41NjggLTExLjY1ODA5NiwtNS44MzQgbCAtMS4xMDQyNzUsLTAuMzQzIDAuMTAzOTQxLC0xLjEwNSB2IC0wLjU3MiBjIDAsLTEuMzg1IC0wLjQyOTA3MiwtMi43MzUgLTEuMjI4MTc0LC0zLjg2NSAtMC42NTYwOCwtMC45NDUgLTEuNTMwMDIyLC0xLjcxNiAtMi41NDk0ODEsLTIuMjUgYSA4LjMwODY3NzksOS45OTIgMCAwIDAgLTMuMzAxMTg2LC0wLjgxMyA4LjIyMTM2NzEsOS44ODcgMCAwIDAgLTEuNzY4NjcxLDAuMjcxIDYuODE4NTcwOCw4LjIgMCAwIDAgLTEuODMxODY3LDAuODAyIGwgLTI5Ljc5MjE2NSwxOC45OSBhIDUuODc5NzcwMSw3LjA3MSAwIDAgMCAtMS44MzY4NTcsMS43OSA0Ljc1MDU0ODIsNS43MTMgMCAwIDAgLTAuOTYyOTE0LDIuMzc3IDUuMDM2NTk1NSw2LjA1NyAwIDAgMCAtMC4xMzU1NDEsMS4xMDQgYyAtOC4zMWUtNCwxLjM3OCAwLjQyODI0LDIuNzIyIDEuMjI4MTc0LDMuODQ0IDAuNjU1MjQ4LDAuOTQ1IDEuNTMwMDIxLDEuNzE3IDIuNTQ4NjQ5LDIuMjUgYSA4LjI5ODY5OTYsOS45OCAwIDAgMCAzLjMwMTE4NiwwLjgxMiA4LjI0NzE0NDYsOS45MTggMCAwIDAgMS43OTAyOSwtMC4yMyA2Ljk0MzMwMDcsOC4zNSAwIDAgMCAxLjgzMjY5OSwtMC44MDEgbCAxMS4zNjcwNTcsLTcuMjkyIGEgMjQuMjE4Mzk5LDI5LjEyNSAwIDAgMSA2LjA0Nzc0LC0yLjY1NiAyOC41MjU3NCwzNC4zMDUgMCAwIDEgNS45NTM3NzYsLTAuNzYgYyAzLjgyMTcyNywwIDcuNTg2MDc2LDAuOTI1IDEwLjk3MjA3OCwyLjY5NyAzLjM4NjAwMywxLjc3MiA2LjI5Mzg3Nyw0LjMzOSA4LjQ3MzMyNSw3LjQ4IDIuNjUyNTkxLDMuNzE3IDQuMDc5NDk4LDguMTcxIDQuMDgwMzM4LDEyLjc0IDAuMDAzLDEuMjk5IC0wLjExMjI2LDIuNTk2IC0wLjM0MzQzLDMuODc0IC0wLjUwNjQwMywyLjgxNyAtMS41OTQwNDYsNS40OTcgLTMuMTkyMjU0LDcuODcgLTEuNTk5MDM3LDIuMzcyIC0zLjY3MzcxNSw0LjM4NSAtNi4wOTM0NzYsNS45MTEgbCAtMjkuNzM5Nzc5LDE4Ljk5IGEgMjQuMzA4MjA1LDI5LjIzMyAwIDAgMSAtNi4wNTc3MTksMi42NjcgeiIgZmlsbD0iI2ZmZmZmZiIgaWQ9InBhdGg2MDAiIHN0eWxlPSJzdHJva2Utd2lkdGg6MC45MTE4ODUiIC8+PC9zdmc+') no-repeat 5px center; background-size: 30px 30px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 40px;`,
    );
    console.log(
      "%c Svelte: Cybernetically enhanced web apps. ",
      "color: #324fff; font-style: italic;",
    );
    console.log(
      "%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ",
      "color: #3b82f6; text-decoration: underline;",
    );
    console.log(
      "%c Amey Thakur: https://github.com/Amey-Thakur ",
      "color: #64748b;",
    );
    console.log(
      "%c Mega Satish: https://github.com/msatmod ",
      "color: #64748b;",
    );
    console.log(
      "%c 💡 Scholarly Insight: Svelte shifts reactivity from runtime to compile-time. Instead of using a Virtual DOM diffing engine, it compiles components into highly efficient imperative code that surgically updates the DOM when state changes—resulting in smaller bundles and lighter runtime overhead. ",
      'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;',
    );

    // 4. Easter Egg (AMEYMEGA)
    let sequence = "";
    const secret = "AMEYMEGA";
    document.addEventListener("keydown", (e) => {
      sequence += e.key.toUpperCase();
      if (sequence.endsWith(secret)) {
        alert(
          "🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Svelte.\n\nThank you for exploring our JS Framework Ecosystem!",
        );
        sequence = "";
      }
      if (sequence.length > 20)
        sequence = sequence.substring(sequence.length - 20);
    });
  });
</script>

<div class="app-container svelte-todo-app">
  <h1>Svelte To-Do App</h1>

  <form class="input-group" onsubmit={addTodo}>
    <input type="text" bind:value={newTodo} placeholder="Add a new task..." />
    <button type="submit" class="btn">Add</button>
  </form>

  <div class="filters">
    <button
      class="filter-btn {filter === 'all' ? 'active' : ''}"
      onclick={() => (filter = "all")}>All</button
    >
    <button
      class="filter-btn {filter === 'active' ? 'active' : ''}"
      onclick={() => (filter = "active")}>Active</button
    >
    <button
      class="filter-btn {filter === 'completed' ? 'active' : ''}"
      onclick={() => (filter = "completed")}>Completed</button
    >
  </div>

  <ul class="todo-list">
    {#each filteredTodos as todo (todo.id)}
      <li class="todo-item">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
          class="checkbox {todo.completed ? 'checked' : ''}"
          onclick={() => toggleTodo(todo.id)}
          role="button"
          tabindex="0"
        >
          {#if todo.completed}✓{/if}
        </div>
        <span class="todo-text {todo.completed ? 'coming-done' : ''}">
          {todo.text}
        </span>
        <button class="delete-btn" onclick={() => deleteTodo(todo.id)}>×</button
        >
      </li>
    {/each}
  </ul>

  <div
    style="margin-top: 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;"
  >
    {todos.filter((t) => !t.completed).length} items left
    {#if todos.some((t) => t.completed)}
      <button
        onclick={clearCompleted}
        class="filter-btn"
        style="margin-left: 1rem; color: var(--danger)"
      >
        Clear Completed
      </button>
    {/if}
  </div>
</div>

<div class="footer-divider"></div>

<footer class="app-footer">
  <p>
    Created by <a
      href="https://github.com/Amey-Thakur"
      target="_blank"
      class="author-link">Amey Thakur</a
    >
    &
    <a href="https://github.com/msatmod" target="_blank" class="author-link"
      >Mega Satish</a
    >
  </p>
  <p>
    Released: June 23, 2022 • <a
      href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS"
      target="_blank"
      class="repo-link">GitHub Repo</a
    >
  </p>
</footer>
