import { domToImage, loadMedia } from 'modern-screenshot'
import { createGifRecorder, createWebmRecorder } from './recorders'
import { resovleOptions } from './options'
import type { Options as ScreenshotOptions } from 'modern-screenshot'
import type { FrameOptions, Options, Recorder } from './types'

export function createVcr<T extends Node>(
  node: T,
  userOptions: Partial<Options> = {},
) {
  const options = resovleOptions(node, userOptions)
  const { gif, interval } = options

  let recorder: Recorder
  if (gif) {
    recorder = createGifRecorder(options)
  } else {
    recorder = createWebmRecorder(options)
  }

  async function addFrame(options?: ScreenshotOptions & FrameOptions) {
    return recorder.addFrame(await loadMedia(await domToImage(node, options)), options)
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
