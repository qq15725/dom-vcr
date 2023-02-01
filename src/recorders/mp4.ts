// @ts-expect-error worker
import VideoEncoder from '../workers/video-encoder?worker&inline'
import type { Options, Recorder } from '../types'

export function createMp4Recorder(options: Options): Recorder {
  const { width, height, interval } = options

  const worker = new VideoEncoder()

  worker.postMessage({
    type: 'configure',
    data: {
      width,
      height,
      framerate: 1000 / interval,
      codec: 'avc1.42E01F',
      hardwareAcceleration: 'prefer-hardware',
      bitrate: 3_000_000,
      avc: { format: 'avc' },
    },
  })

  return {
    async addFrame(frame) {
      const data = await createImageBitmap(frame)
      worker.postMessage({ type: 'encode', data }, [data])
    },
    render() {
      return new Promise(resolve => {
        worker.onmessage = (ev: MessageEvent) => resolve(new Blob([ev.data], { type: 'video/mp4' }))
        worker.postMessage({ type: 'flush' })
      })
    },
  }
}
