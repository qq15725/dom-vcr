import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { width, height, gif, gifWorkerUrl, interval } = options

  const encoder = gif.createEncoder({ width, height, workerUrl: gifWorkerUrl })

  return {
    addFrame(frame) {
      const imageData = frame.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      encoder.encode({
        width,
        height,
        imageData,
        delay: interval,
      })
    },
    async render() {
      return new Blob([await encoder.flush()], { type: 'image/gif' })
    },
  }
}
