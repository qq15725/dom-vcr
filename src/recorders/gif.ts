import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { gif, fps } = options

  return {
    addFrame(frame, options) {
      gif?.addFrame(frame, { ...options, delay: 1000 / fps })
    },
    render() {
      return new Promise(resolve => {
        gif?.on('finished', blob => {
          resolve(blob)
        })
        gif?.render()
      })
    },
  }
}
