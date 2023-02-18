import type { Options, Recorder } from '../types'

export function createGifRecorder(options: Options): Recorder {
  const { width, height, gif, gifWorkerScript, interval } = options

  let encoder = gif.createEncoder({ width, height })

  let gifWorker: Worker | undefined

  if (gifWorkerScript) {
    gifWorker = new Worker(gifWorkerScript)
  }

  return {
    addFrame(frame) {
      const imageData = frame.getContext('2d')
        ?.getImageData(0, 0, width, height)
        ?.data

      if (!imageData) return

      const options = {
        width,
        height,
        imageData,
        delay: interval,
      }

      if (gifWorker) {
        return new Promise(resolve => {
          gifWorker!.onmessage = (e: any) => {
            encoder.write(e.data)
            resolve()
          }

          gifWorker!.postMessage(options, [imageData.buffer])
        })
      } else {
        encoder.write(
          gif.encodeFrame(options),
        )
        return undefined
      }
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
