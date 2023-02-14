<h1 align="center">DOM VCR</h1>

<p align="center">
  <a href="https://unpkg.com/dom-vcr">
    <img src="https://img.shields.io/bundlephobia/minzip/dom-vcr" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/dom-vcr">
    <img src="https://img.shields.io/npm/v/dom-vcr.svg" alt="Version">
  </a>
  <a href="https://github.com/qq15725/dom-vcr/blob/master/LICENSE" class="mr-3">
    <img src="https://img.shields.io/npm/l/dom-vcr.svg" alt="License">
  </a>
</p>

<p align="center">使用 HTML5 canvas 和 SVG 从 DOM 节点生成视频或 GIF</p>

<p align="center"><a href="README.md">English</a> | 简体中文</p>

## 📦 安装

```shell
npm i dom-vcr
```

<details>
<summary>CDN</summary><br>

```html
<script src="https://unpkg.com/dom-vcr"></script>
```

<br></details>

## 🦄 使用

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

<details>
<summary>MP4</summary><br>

> 需要安装 `mp4box`

```ts
import { createVcr } from 'dom-vcr'
import mp4box from 'mp4box'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  type: 'mp4',
  mp4: mp4box,
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

<br></details>

<details>
<summary>GIF</summary><br>

> 需要安装 `gif.js`

```ts
import { createVcr } from 'dom-vcr'
import GIF from 'gif.js'
import GIFWorkerScript from 'gif.js/dist/gif.worker?url'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  type: 'gif',
  gif: new GIF({
    workerScript: GIFWorkerScript,
  }),
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

<br></details>
