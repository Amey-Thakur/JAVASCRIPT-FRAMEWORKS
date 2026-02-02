import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">
      <h1>Angular To-Do App</h1>
      
      <div class="input-group">
        <input 
          type="text" 
          [(ngModel)]="newTodo" 
          (keyup.enter)="addTodo()"
          placeholder="Add a new task..." 
        />
        <button (click)="addTodo()" class="btn">Add</button>
      </div>

      <div class="filters">
        <button [class.active]="filter === 'all'" (click)="filter = 'all'" class="filter-btn">All</button>
        <button [class.active]="filter === 'active'" (click)="filter = 'active'" class="filter-btn">Active</button>
        <button [class.active]="filter === 'completed'" (click)="filter = 'completed'" class="filter-btn">Completed</button>
      </div>

      <ul class="todo-list">
        <li *ngFor="let todo of filteredTodos" class="todo-item">
          <div 
            class="checkbox" 
            [class.checked]="todo.completed"
            (click)="toggleTodo(todo.id)"
          >
             <ng-container *ngIf="todo.completed">✓</ng-container>
          </div>
          <span 
            class="todo-text" 
            [class.coming-done]="todo.completed"
          >{{ todo.text }}</span>
          <button class="delete-btn" (click)="deleteTodo(todo.id)">×</button>
        </li>
      </ul>

      <div style="margin-top: 1rem; text-align: center; color: var(--text-light); font-size: 0.875rem;">
        {{  getUnfinishedCount() }} items left
        <button *ngIf="hasCompleted()" (click)="clearCompleted()" class="filter-btn" style="margin-left: 1rem; color: var(--danger)">Clear Completed</button>
      </div>
    </div>

    <div class="footer-divider"></div>

    <footer class="app-footer">
      <p>Created by <a href="https://github.com/Amey-Thakur" target="_blank" class="author-link">Amey Thakur</a> & <a
          href="https://github.com/msatmod" target="_blank" class="author-link">Mega Satish</a></p>
      <p>Released: June 23, 2022 • <a href="https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS" target="_blank"
          class="repo-link">GitHub Repo</a></p>
    </footer>
  `,
  styles: []
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo: string = '';
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor() {
    this.load();
  }

  addTodo() {
    if (!this.newTodo.trim()) return;
    this.todos.push({
      id: Date.now(),
      text: this.newTodo,
      completed: false
    });
    this.newTodo = '';
    this.save();
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
  }

  get filteredTodos() {
    if (this.filter === 'active') return this.todos.filter(t => !t.completed);
    if (this.filter === 'completed') return this.todos.filter(t => t.completed);
    return this.todos;
  }

  getUnfinishedCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  hasCompleted() {
    return this.todos.some(t => t.completed);
  }

  save() {
    localStorage.setItem('angular-todos', JSON.stringify(this.todos));
  }

  load() {
    const data = localStorage.getItem('angular-todos');
    if (data) this.todos = JSON.parse(data);
  }
}
