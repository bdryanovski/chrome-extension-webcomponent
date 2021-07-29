
/**
 * Dummy implementation for Chrome Extension Storage API
 * so I could run in a browser without the extension installed.
 *
 * Not tested, but should work.
 */

// @ts-ignore
if (chrome?.storage === undefined) {

  const methods = {
    // @ts-ignore
    get: (items: string[], callback: (result: Record<string, any>) => void) => {
      // get from local storage
      let result: Record<string, any> = {};
      for (const key in items) {
        result[items[key]] = JSON.parse(window.localStorage.getItem(items[key]) + '');
      }
      callback(result);
    },
    // @ts-ignore
    set(items: { [key: string]: any; }) {
      // set to local storage
      for (const key in items) {
        window.localStorage.setItem(key, JSON.stringify(items[key]));
      }
    }
  }

  // @ts-ignore
  chrome = {
    storage: {
      sync: methods,
      local: methods,
    }
  };
}