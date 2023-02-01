import { domToImage, loadMedia } from 'modern-screenshot'
import { createGifRecorder, createMp4Recorder, createWebmRecorder } from './recorders'
import { resovleOptions } from './options'
import type { Options as ScreenshotOptions } from 'modern-screenshot'
import type { FrameOptions, Options, Recorder } from './types'

export function createVcr<T extends Node>(
  node: T,
  userOptions: Partial<Options> = {},
) {
  const options = resovleOptions(node, userOptions)
  const { type, interval } = options

  let recorder: Recorder
  switch (type) {
    case 'mp4':
      recorder = createMp4Recorder(options)
      break
    case 'gif':
      recorder = createGifRecorder(options)
      break
    case 'webm':
      recorder = createWebmRecorder(options)
      break
  }

  async function addFrame(options?: ScreenshotOptions & FrameOptions) {
    return await recorder.addFrame(await loadMedia(await domToImage(node, options)), options)
  }

  function render() {
    return recorder.render()
  }

  async function record(time: number, options?: ScreenshotOptions & FrameOptions) {
    const promises = []
    while (time > 0) {
      const frameTime = Math.min(time, interval)
      await new Promise(resolve => setTimeout(resolve, frameTime))
      time -= frameTime
      promises.push(addFrame(options))
    }
    await Promise.all(promises)
  }

  return {
    addFrame,
    render,
    record,
  }
}
