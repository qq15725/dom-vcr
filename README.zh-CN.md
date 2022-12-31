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

<p align="center">使用 HTML5 canvas 和 SVG 生成视频. gzip 5kb.</p>

<p align="center"><a href="README.md">English</a> | 简体中文</p>

## 📦 安装

```shell
npm i dom-vcr
```

## 🦄 使用

### 基础

```ts
import { createDomVcr } from 'dom-vcr'

const vcr = createDomVcr(document.querySelector('#app'))

vcr.start()

setTimeout(async () => {
  const blob = await vcr.stop()
  window.open(URL.createObjectURL(blob))
}, 5000)
```

### 手动添加帧

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
