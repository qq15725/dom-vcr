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

<p align="center">Generates an video or GIF from a DOM node using HTML5 canvas and SVG</p>

<p align="center">English | <a href="README.zh-CN.md">简体中文</a></p>

## 📦 Install

```shell
npm i dom-vcr
```

## 🦄 Usage

### Basic

```ts
import { createVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createVcr(dom)

vcr.record(2000)
  .then(() => vcr.render())
  .then(blob => {
    window.open(URL.createObjectURL(blob))
  })
```

### Generate WEBM

```ts
import { createVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  type: 'webm',
  interval: 1000,
})

async function generate() {
  dom.style.backgroundColor = 'red'
  await vcr.addFrame()
  dom.style.backgroundColor = 'yellow'
  await vcr.addFrame()
  dom.style.backgroundColor = 'green'
  await vcr.addFrame()

  const blob = await vcr.render()
  window.open(URL.createObjectURL(blob))
}

generate()
```

### Generate GIF

> need install `gif.js`

```ts
import { createVcr } from 'dom-vcr'
import GIF from 'gif.js'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  interval: 1000,
  gif: new GIF({
    workerScript: './node_modules/gif.js/dist/gif.worker.js',
  }),
})

async function generate() {
  dom.style.backgroundColor = 'red'
  await vcr.addFrame()
  dom.style.backgroundColor = 'yellow'
  await vcr.addFrame()
  dom.style.backgroundColor = 'green'
  await vcr.addFrame()

  const blob = await vcr.render()
  window.open(URL.createObjectURL(blob))
}

generate()
```

### CDN

```html
<script src="https://unpkg.com/dom-vcr"></script>
```
