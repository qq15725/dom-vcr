import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { gif, interval } = options

  return {
    addFrame(frame, options) {
      gif?.addFrame(frame, { delay: interval, ...options })
    },
    render() {
      return new Promise(resolve => {
        gif?.on('finished', blob => {
          resolve(blob)
          gif?.abort()
        })
        gif?.render()
      })
    },
  }
}
