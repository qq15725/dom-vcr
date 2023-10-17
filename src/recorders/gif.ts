import { createEncoder } from 'modern-gif'
import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const {
    width,
    height,
    interval,
  } = options

  const encoder = createEncoder({ width, height })

  return {
    isSupported() {
      return Boolean(encoder)
    },
    async addFrame(canvas, options) {
      if (!encoder) return

      const imageData = canvas.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      await encoder.encode({
        imageData,
        delay: options?.duration ?? interval,
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
