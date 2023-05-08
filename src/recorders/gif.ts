import type { Options, Recorder } from '../types'
import type { createEncoder } from 'modern-gif'

export function createGifRecorder(options: Options): Recorder {
  const { width, height, gif, gifWorkerUrl, interval } = options

  const encoder = gif?.createEncoder
    ? (gif.createEncoder as typeof createEncoder)({
        width,
        height,
        workerUrl: gifWorkerUrl,
      })
    : undefined

  return {
    isSupported() {
      return Boolean(encoder)
    },
    addFrame(canvas) {
      if (!encoder) return

      const imageData = canvas.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      encoder.encode({
        imageData,
        delay: interval,
      })
    },
    async render() {
      if (!encoder) {
        throw new Error('GIF encoder is a must')
      }
      return new Blob([await encoder.flush()], { type: 'image/gif' })
    },
  }
}
