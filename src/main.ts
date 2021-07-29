import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { reducers, Task } from './reducer';

import Store from "./store";

import { TASKS_EVENT } from './task.component';

@customElement("app-component")
export default class AppComponent extends LitElement {

  private store!: Store<Task>;

  private tasks: Task[] = [];

  connectedCallback() {
    super.connectedCallback();

    this.store = new Store<Task>('tasks');
    this.store.reduce(reducers)

    this.store.onUpdate((data: Task[]) => {
      this.tasks = data;
      this.requestUpdate();
    })
  }

  async firstUpdated() {
    const AppTasks = this.renderRoot.querySelector('app-tasks');
    AppTasks?.addEventListener(TASKS_EVENT, this.handleChanges.bind(this))
  }

  private handleChanges(event: any) {
    const { action, data } = event.detail;
    this.store.dispatch(action, data)
  }

  render() {
    return html`<app-tasks .tasks=${this.tasks}></app-tasks>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-component": AppComponent;
  }
}
