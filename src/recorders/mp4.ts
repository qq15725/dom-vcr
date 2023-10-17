import { Encoder, SUPPORTS_VIDEO_ENCODER } from 'modern-mp4'
import type { Options, Recorder } from '../types'

export function createMp4Recorder(options: Options): Recorder {
  const { width, height, interval, mp4Options } = options

  let encoder: Encoder | undefined
  if (SUPPORTS_VIDEO_ENCODER) {
    encoder = new Encoder({
      width,
      height,
      fps: Math.floor(1000 / interval),
      audio: false,
      ...mp4Options,
    })
  }

  let timestamp = 1

  return {
    async isSupported() {
      try {
        return Boolean(await encoder?.isConfigSupported())
      } catch (error) {
        return false
      }
    },
    async addFrame(canvas, options) {
      const duration = (options?.duration ?? interval) * 1000

      encoder?.encode(canvas, {
        timestamp,
        duration,
      })

      timestamp += duration
    },
    async render() {
      if (!encoder) {
        throw new Error('MP4 encoder is a must')
      }
      timestamp = 1
      return new Blob([await encoder.flush()], { type: 'video/mp4' })
    },
  }
}
