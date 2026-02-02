/**
 * ================================================================================
 * FILE: LitApp.ts
 * PROJECT: JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * ARCHITECTS: Amey Thakur (https://github.com/Amey-Thakur)
 *            Mega Satish (https://github.com/msatmod)
 * REPOSITORY: https://github.com/Amey-Thakur/JAVASCRIPT-FRAMEWORKS-TODO-APPS
 * RELEASE DATE: June 23, 2022
 * LICENSE: MIT License
 * --------------------------------------------------------------------------------
 * TECHNICAL DESCRIPTION:
 * A secondary implementation variant for the Lit framework exploration. 
 * Demonstrates a modular component approach with explicit property-based 
 * state tracking and connectivity lifecycle hooks.
 * ================================================================================
 */

import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export class LitApp extends LitElement {

  @property({ type: Array }) todos: string[] = [];

  @property({ type: String }) todoText: string = '';

  connectedCallback() {
    super.connectedCallback();
    const existingTodos = localStorage.getItem('todos');
    this.todos = JSON.parse(existingTodos as string) || [];
  }


  addTodo(event: Event) {
    event.preventDefault();
    console.log(this.todoText, event);
    this.todos = [...this.todos, this.todoText];
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  render() {
    return html`

    <ul>
      ${this.todos.map(todo => html`<li>${todo}</li>`)}
    </ul>

      <form @submit="${this.addTodo}">
        <input type="text" .value="${this.todoText}" @change=${(e: any) => this.todoText = e.target.value} />
        <input type="submit">
      </form>
    `;
  }
}
