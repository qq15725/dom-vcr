<h1 align="center">DOM VCR</h1>

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

<p align="center">Generate video using HTML5 canvas and SVG. minzipped size 5kb.</p>

<p align="center">English | <a href="README.zh-CN.md">简体中文</a></p>

## 📦 Install

```shell
npm i dom-vcr
```

## 🦄 Usage

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

### Manual frame addition

```ts
import { createDomVcr } from 'dom-vcr'

const vcr = createDomVcr(document.querySelector('#app'), { autoAddFrame: false, fps: 1 })

vcr.start()
  .then(() => vcr.addFrame())
  .then(() => vcr.addFrame())
  .then(() => vcr.addFrame())
  .then(() => vcr.stop())
  .then(blob => {
    window.open(URL.createObjectURL(blob))
  })
```

### CDN

```html
<script src="https://unpkg.com/dom-vcr"></script>
```
