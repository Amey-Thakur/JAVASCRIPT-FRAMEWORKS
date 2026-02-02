<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const todos = ref([]);
const newTodo = ref('');
const filter = ref('all');

onMounted(() => {
  const saved = localStorage.getItem('vue-todos');
  if (saved) todos.value = JSON.parse(saved);

  // Security and Easter Egg Logic
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
    `background: #324fff url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJdMCA4LjkzNGw0OS44NTQuMTU4IDE0LjE2NyAyNC40NyAxNC40MzItMjQuNDdMMTI4IDguOTM1bC02My44MzQgMTEwLjE0em0xMjYuOTguNjM3bC0yNC4zNi4wMi0zOC40NzYgNjYuMDUzTDI1LjY5MSA5LjU5Mi45NDIgOS41NzJsNjMuMjExIDEwNy44OXptLTI1LjE0OS0uMDA4bC0yMi43NDUuMTY4LTE1LjA1MyAyNC42NDdMNDkuMjE2IDkuNzNsLTIyLjc5NC0uMTY4IDM3LjczMSA2NC40NzZ6bS03NS44MzQtLjE3bDIzLjAwMi4wMDltLTIzLjAwMi0uMDFsMjMuMDAyLjAxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1Ljk5NyA5LjM5M2wyMy4wMDIuMDA5TDY0LjAzNSAzNC4zNiA3OS4wMTggOS40MDQgMTAyIDkuMzk4IDY0LjE1IDc1LjA1M3oiIGZpbGw9IiMzNTQ5NWUiLz48cGF0aCBkPSJNLjkxIDkuNTY5bDI1LjA2Ny0uMTcyIDM4LjE1IDY1LjY1OUwxMDEuOTggOS40MDFsMjUuMTEuMDI2LTYyLjk2NiAxMDguMDZ6IiBmaWxsPSIjNDFiODgzIi8+PC9zdmc+') no-repeat 5px center; background-size: 30px 30px; color: #fff; font-size: 20px; font-weight: bold; border-radius: 5px; padding: 10px 10px 10px 40px;`
  );
  console.log('%c Vue: The Progressive JavaScript Framework. ', 'color: #324fff; font-style: italic;');
  console.log('%c GitHub Repo: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS ', 'color: #3b82f6; text-decoration: underline;');
  console.log('%c Amey Thakur: https://github.com/Amey-Thakur ', 'color: #64748b;');
  console.log('%c Mega Satish: https://github.com/msatmod ', 'color: #64748b;');
  console.log('%c 💡 Scholarly Insight: Vue is designed to be incrementally adoptable. The core library focuses on the view layer only, making it easy to pick up and integrate with other libraries. However, it is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries. ', 'color: #0f172a; background: #f1f5f9; padding: 4px; border-left: 4px solid #324fff; margin-top: 4px; font-family: "Play", sans-serif;');

  // 4. Easter Egg (AMEYMEGA)
  let sequence = '';
  const secret = 'AMEYMEGA';
  document.addEventListener('keydown', e => {
    sequence += e.key.toUpperCase();
    if (sequence.endsWith(secret)) {
      alert('🌟 Easter Egg Found! 🌟\n\nThis application was meticulously crafted by Amey Thakur & Mega Satish using Vue.\n\nThank you for exploring our JS Framework Ecosystem!');
      sequence = '';
    }
    if (sequence.length > 20) sequence = sequence.substring(sequence.length - 20);
  });
});

watch(todos, (newVal) => {
  localStorage.setItem('vue-todos', JSON.stringify(newVal));
}, { deep: true });

const addTodo = () => {
  if (!newTodo.value.trim()) return;
  todos.value.push({
    id: Date.now(),
    text: newTodo.value,
    completed: false
  });
  newTodo.value = '';
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id);
};

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed);
};

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed);
  if (filter.value === 'completed') return todos.value.filter(t => t.completed);
  return todos.value;
});
</script>

<template>
  <div class="app-container">
    <h1>Vue To-Do App</h1>
    
    <form class="input-group" @submit.prevent="addTodo">
      <input 
        type="text" 
        v-model="newTodo" 
        placeholder="Add a new task..." 
      />
      <button type="submit" class="btn">Add</button>
    </form>

    <div class="filters">
      <button 
        :class="['filter-btn', filter === 'all' ? 'active' : '']"
        @click="filter = 'all'"
      >All</button>
      <button 
        :class="['filter-btn', filter === 'active' ? 'active' : '']"
        @click="filter = 'active'"
      >Active</button>
      <button 
        :class="['filter-btn', filter === 'completed' ? 'active' : '']"
        @click="filter = 'completed'"
      >Completed</button>
    </div>

    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
        <div 
          :class="['checkbox', todo.completed ? 'checked' : '']"
          @click="todo.completed = !todo.completed"
        >
          <span v-if="todo.completed">✓</span>
        </div>
        <span :class="['todo-text', todo.completed ? 'coming-done' : '']">
          {{ todo.text }}
        </span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">×</button>
      </li>
    </ul>

    <div style="margin-top: 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;">
      {{ todos.filter(t => !t.completed).length }} items left
      <button 
        v-if="todos.some(t => t.completed)"
        @click="clearCompleted" 
        class="filter-btn" 
        style="margin-left: 1rem; color: var(--danger)"
      >
        Clear Completed
      </button>
    </div>
  </div>

  <div class="footer-divider"></div>

  <footer class="app-footer">
    <p>Created by <a href="https://github.com/Amey-Thakur" target="_blank" class="author-link">Amey Thakur</a> & <a
        href="https://github.com/msatmod" target="_blank" class="author-link">Mega Satish</a></p>
    <p>Released: June 23, 2022 • <a href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS" target="_blank"
        class="repo-link">GitHub Repo</a></p>
  </footer>
</template>

<style>
/* Scoped styles not needed as we use standard css file or global styles, but let's keep it clean */
</style>
