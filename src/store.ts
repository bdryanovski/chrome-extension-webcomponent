
import './chrome.extension.polyfill';

type Reducers<T> = (data: T[], action: { action: string, data: any; }) => T[];

export default class Store<T> {
  private key: string;
  private data: T[] = [];
  private callback = (_data: any) => { };

  private reducers: Reducers<T> = (data: T[], _action: { action: string, data: any }) => { return data }

  constructor(key: string) {
    this.key = key;
  }

  public dispatch(action: string, data: any) {
    this.data = this.reducers(this.data, { action, data });
    this.sync();
  }

  public onUpdate(callback: (data: T[]) => void) {
    this.callback = callback;

    // eslint-disable-next-line no-undef
    chrome.storage.sync.get([this.key], (result: Record<string, any>) => {
      this.data = result[this.key] || [];
      this.sync();
    });
  }

  public reduce(method: Reducers<T>) {
    this.reducers = method;
  }

  sync() {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({ [this.key]: this.data });
    this.callback(this.data);
  }
}
