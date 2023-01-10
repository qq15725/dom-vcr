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

<p align="center">Generate mp4/gif using HTML5 canvas and SVG. minzipped size 5kb.</p>

<p align="center">English | <a href="README.zh-CN.md">简体中文</a></p>

## 📦 Install

```shell
npm i dom-vcr
```

## 🦄 Usage

### Render MP4

```ts
import { createDomVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createDomVcr(dom, {
  fps: 2,
})

async function render() {
  dom.style.backgroundColor = 'red'
  await vcr.addFrame()
  dom.style.backgroundColor = 'yellow'
  await vcr.addFrame()
  dom.style.backgroundColor = 'green'
  await vcr.addFrame()

  const blob = await vcr.render()
  window.open(URL.createObjectURL(blob))
}

render()
```

### Render GIF

```ts
import { createDomVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createDomVcr(dom, {
  fps: 2,
  gif: new GIF({
    workerScript: './node_modules/gif.js/dist/gif.worker.js',
  }),
})

async function render() {
  dom.style.backgroundColor = 'red'
  await vcr.addFrame()
  dom.style.backgroundColor = 'yellow'
  await vcr.addFrame()
  dom.style.backgroundColor = 'green'
  await vcr.addFrame()

  const blob = await vcr.render()
  window.open(URL.createObjectURL(blob))
}

render()
```

### CDN

```html
<script src="https://unpkg.com/dom-vcr"></script>
```
