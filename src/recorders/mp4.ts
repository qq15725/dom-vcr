import { SUPPORT_VIDEO_ENCODER } from '../utils'
import { createVideoEncoder } from '../video-encoder'
import type { Options, Recorder } from '../types'

export function createMp4Recorder(options: Options): Recorder {
  const { width, height, interval, mp4 } = options

  const config: VideoEncoderConfig = {
    width,
    height,
    framerate: 1000 / interval,
    codec: 'avc1.42E01F',
    hardwareAcceleration: 'prefer-hardware',
    bitrate: 6_000_000,
    avc: { format: 'avc' },
  }

  let encoder: ReturnType<typeof createVideoEncoder> | undefined

  if (SUPPORT_VIDEO_ENCODER && mp4) {
    encoder = createVideoEncoder(mp4)
    encoder.configure(config)
  }

  return {
    async isSupported() {
      try {
        return Boolean(encoder) && (await VideoEncoder.isConfigSupported(config)).supported
      } catch (error) {
        return false
      }
    },
    async addFrame(canvas) {
      encoder?.encode(await createImageBitmap(canvas))
    },
    async render() {
      if (!encoder) {
        throw new Error('MP4 encoder is a must')
      }
      return new Blob([await encoder.flush()], { type: 'video/mp4' })
    },
  }
}
