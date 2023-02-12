import { createVideoEncoder } from '../video-encoder'
import type { Options, Recorder } from '../types'

export function createMp4Recorder(options: Options): Recorder {
  const { width, height, interval, mp4 } = options

  const encoder = createVideoEncoder(mp4)

  encoder.configure({
    width,
    height,
    framerate: 1000 / interval,
    codec: 'avc1.42E01F',
    hardwareAcceleration: 'prefer-hardware',
    bitrate: 3_000_000,
    avc: { format: 'avc' },
  })

  return {
    async addFrame(frame) {
      encoder.encode(await createImageBitmap(frame))
    },
    render() {
      return new Promise(resolve => {
        encoder.flush().then(data => {
          resolve(new Blob([data], { type: 'video/mp4' }))
        })
      })
    },
  }
}
