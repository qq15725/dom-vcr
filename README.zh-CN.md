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

<p align="center">使用 HTML5 canvas 和 SVG 从 DOM 节点生成视频或 GIF</p>

<p align="center"><a href="README.md">English</a> | 简体中文</p>

## 📦 安装

```shell
npm i dom-vcr
```

## 🦄 使用

### 基本使用

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

### 生成 WEBM

```ts
import { createVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
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

### 生成 GIF

> 需要安装 `gif.js`

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
