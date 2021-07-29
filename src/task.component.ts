import { LitElement, html, svg, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from 'lit/directives/repeat.js';

import styles from './styles.css';

import { TASK_DROP_EVENT, TASK_INSERT_EVENT, Task, TASK_UPDATE_EVENT } from './reducer';

const closeIcon = svg`
<svg
  class="icon"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
  stroke-width="2"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path d="M6 18L18 6M6 6l12 12"></path>
</svg>
`;

export const TASKS_EVENT = 'DispatchChanges';

@customElement("app-tasks")
export default class AppTasks extends LitElement {

  static styles = unsafeCSS(styles);

  @property()
  tasks: Task[] = []

  private onEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.createTask();
    }
  }

  private statusChange(id: string, checked: boolean) {
    this.dispatchEvent(new CustomEvent(TASKS_EVENT, {
      detail: {
        action: TASK_UPDATE_EVENT,
        data: { id, done: checked }
      }
    }))
  }

  private createTask() {
    const Entry = this.renderRoot.querySelector('#entry');

    // @ts-ignore
    if (Entry && Entry.value === '') {
      return;
    }

    this.dispatchEvent(new CustomEvent(TASKS_EVENT, {
      detail: {
        action: TASK_INSERT_EVENT,
        data: {
          id: `#${Math.random().toString(36).substr(2, 9)}`,
          // @ts-ignore
          title: Entry.value,
          done: false,
        }
      },
      bubbles: true,
      composed: true,
    }))

    // @ts-ignore
    Entry.value = null;
  }

  private editTask(id: string, title: string) {
    this.dispatchEvent(new CustomEvent(TASKS_EVENT, {
      detail: {
        action: TASK_UPDATE_EVENT,
        data: { id, title }
      }
    }))
  }

  private drop(id: string) {
    this.dispatchEvent(new CustomEvent(TASKS_EVENT, {
      detail: {
        action: TASK_DROP_EVENT,
        data: { id }
      }
    }))
  }

  render() {
    return html`
        <div class="container">
          <div class="card">

            <div class="title">Tasks</div>
            <div class="form">
              <input id="entry" type="text" @keyup="${this.onEnter}" placeholder="what is your plan for today" class="input" />
            </div>

            <ul class="tasks">
              ${this.tasks &&
                repeat(this.tasks, (task) => task.id, (task) => html`
                  <li id="${task.id}" class="task">
                    <div class="task-content ${classMap({ "task-done": task.done })}">
                      <input @change=${(e: any)=> this.statusChange(task.id, e.target.checked)}
                      .checked="${task.done}"
                      type="checkbox"
                      />
                      <input type="text" @blur=${(e: any)=> this.editTask(task.id, e.target.value)}
                      .value="${task.title}"
                      class="task-edit"
                      />
                    </div>
                    <button @click=${()=> this.drop(task.id)}>
                      ${closeIcon}
                    </button>
                  </li>`
                )
                }
            </ul>

          </div>
        </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-tasks": AppTasks;
  }
}
