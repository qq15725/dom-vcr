import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { width, height, gif, interval } = options

  let encoder = gif.createEncoder({ width, height })

  return {
    addFrame(frame) {
      const imageData = frame.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      encoder.write(gif.encodeFrame({
        width,
        height,
        imageData,
        delay: interval,
      }))
    },
    render() {
      return new Promise(resolve => {
        const gifData = encoder.flush()
        encoder = gif.createEncoder({ width, height })
        resolve(new Blob([gifData], { type: 'image/gif' }))
      })
    },
  }
}
