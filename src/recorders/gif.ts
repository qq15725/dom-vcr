import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { gif, fps } = options

  return {
    addFrame(frame, options) {
      gif?.addFrame(frame, { delay: 1000 / fps, ...options })
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
