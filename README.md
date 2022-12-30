<h1 align="center">dom-vcr</h1>

<p align="center">
  <a href="https://github.com/qq15725/dom-vcr/blob/master/LICENSE" class="mr-3">
    <img src="https://img.shields.io/npm/l/dom-vcr.svg" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/dom-vcr">
    <img src="https://img.shields.io/npm/v/dom-vcr.svg" alt="Version">
  </a>
  <a href="https://cdn.jsdelivr.net/npm/dom-vcr/dist/index.js">
    <img src="https://img.shields.io/bundlephobia/minzip/dom-vcr" alt="Minzip">
  </a>
</p>

## Installation

### pnpm

```shell
pnpm add dom-vcr
```

### npm

```shell
npm i dom-vcr
```

## Usage

### Basic

```ts
import { createDomVcr } from 'dom-vcr'

const vcr = createDomVcr(document.querySelector('#app'))

vcr.start()

setTimeout(async () => {
  const blob = await vcr.stop()
  window.open(URL.createObjectURL(blob))
}, 5000)
```
