import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { width, height, gif, interval } = options

  let frames: any[] = []

  return {
    addFrame(frame) {
      const imageData = frame.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      frames.push({
        imageData,
        delay: interval,
      })
    },
    render() {
      return new Promise(resolve => {
        const gifData = gif.encode({
          width,
          height,
          frames,
        })
        frames = []
        resolve(new Blob([gifData], { type: 'image/gif' }))
      })
    },
  }
}
