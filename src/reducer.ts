
export const TASK_INSERT_EVENT = "INSERT";
export const TASK_DROP_EVENT = "DROP";
export const TASK_UPDATE_EVENT = "UPDATE";

export type Task = {
  id: string;
  title: string;
  done: boolean;
};

export const reducers = (store: Task[], request: Record<string, any>) => {
  switch (request.action) {
    case TASK_INSERT_EVENT:
      // Add new task on top of the array
      store = [request.data, ...store];
      break;
    case TASK_UPDATE_EVENT:
      store = store.map((task: Task) => {
        if (task.id === request.data.id) {
          return { ...task, ...request.data };
        }
        return task;
      });
      break;
    case TASK_DROP_EVENT:
      store = store.filter((task: Task) => task.id !== request.data.id);
      break;
    default:
      break;
  }

  return store;

}