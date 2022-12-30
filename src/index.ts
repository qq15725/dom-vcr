import { domToImage, loadMedia } from 'modern-screenshot'

export type Options = {
  width: number
  height: number
  fps: number
  autoAddFrame: boolean
}

const isElementNode = (node: Node): node is Element => node.nodeType === 1 // Node.ELEMENT_NODE

export function createDomVcr<T extends Node>(node: T, options: Partial<Options> = {}) {
  const {
    fps = 10,
    autoAddFrame = true,
  } = options
  const spf = 1000 / fps

  let frames: HTMLImageElement[] = []
  let index = 0
  let blobs: Blob[] = []
  let timer: any
  let starting = false
  let stoped = false
  let {
    width = 0,
    height = 0,
  } = options

  if (isElementNode(node)) {
    const box = node.getBoundingClientRect()
    width = width || box.width
    height = height || box.height
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')!
  const stream = canvas.captureStream(fps)

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.save()
    context.drawImage(frames[index], 0, 0, canvas.width, canvas.height)
    context.restore()
  }

  function mainLoop() {
    if (stoped) return
    draw()
    requestAnimationFrame(mainLoop)
  }

  const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=h264' })

  recorder.ondataavailable = async event => {
    blobs.push(event.data)
    if (recorder.state === 'recording') {
      recorder.pause()
      while (!frames[index]) {
        if (!starting) return recorder.stop()
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      if (!frames[index + 1] && !starting) {
        return recorder.stop()
      }
      index++
      recorder.resume()
    }
  }

  async function addFrame() {
    frames.push(await loadMedia(await domToImage(node)))
  }

  async function start() {
    frames = []
    blobs = []
    await addFrame()
    starting = true
    stoped = false
    mainLoop()
    recorder.start(spf)
    if (autoAddFrame) {
      timer = setInterval(addFrame, spf)
    }
  }

  function stop() {
    return new Promise(resolve => {
      starting = false
      recorder.onstop = () => {
        stoped = true
        clearInterval(timer)
        resolve(new Blob(blobs, { type: 'video/mp4' }))
      }
      autoAddFrame && recorder.stop()
    })
  }

  return {
    start,
    stop,
    addFrame,
  }
}
