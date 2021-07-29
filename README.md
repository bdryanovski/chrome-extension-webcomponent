# Google Chrome Extension with Web Component

Simple Web Component to run as a Google Chrome Extension. In this case, a New tab extension.

## Install

Need first to build it and after that fallow this guide to install it as a [Google Chrome Extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/).

```bash
npm install

npm run build
```

## Test inside the browser

There is a polyfill to cover Chrome Extension API for Storage use here so it will work inside a normal browser

```bash
npm run start
```

## License

[MIT](LICENSE).
