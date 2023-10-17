<h1 align="center">DOM VCR</h1>

<p align="center">
  <a href="https://unpkg.com/dom-vcr">
    <img src="https://img.shields.io/bundlephobia/minzip/dom-vcr" alt="Minzip">
  </a>
  <a href="https://www.npmjs.com/package/dom-vcr">
    <img src="https://img.shields.io/npm/v/dom-vcr.svg" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/dom-vcr">
    <img src="https://img.shields.io/npm/dm/dom-vcr" alt="Downloads">
  </a>
  <a href="https://github.com/qq15725/dom-vcr/issues">
    <img src="https://img.shields.io/github/issues/qq15725/dom-vcr" alt="Issues">
  </a>
  <a href="https://github.com/qq15725/dom-vcr/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/dom-vcr.svg" alt="License">
  </a>
</p>

<p align="center">Generates an video or GIF from a DOM node using HTML5 canvas and SVG</p>

<p align="center">English | <a href="README.zh-CN.md">简体中文</a></p>

## 📦 Install

```shell
npm i dom-vcr

# optional deps
npm i modern-gif # by export GIF
npm i modern-mp4 # by export MP4
npm i mp4box
```

<details>
<summary>CDN</summary><br>

```html
<script src="https://unpkg.com/dom-vcr"></script>
```

<br></details>

## 🦄 Usage

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

> Need install `mp4box` 、`modern-mp4`

```ts
import { createVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  type: 'mp4',
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

> Need install `modern-gif`

```ts
import { createVcr } from 'dom-vcr'

const dom = document.querySelector('#app')
const vcr = createVcr(dom, {
  type: 'gif',
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
