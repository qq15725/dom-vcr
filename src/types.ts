import { EncoderOptions as GifEncoderOptions } from 'modern-gif'
import { EncoderOptions as Mp4EncoderOptions } from 'modern-mp4'

export type GifOptions = Exclude<GifEncoderOptions, 'width' | 'height'>
export type Mp4Options = Exclude<Mp4EncoderOptions, 'width' | 'height'>

export interface Options {
  width: number
  height: number
  interval: number
  type: 'mp4' | 'gif' | 'webm'
  gifOptions?: GifOptions // modern-gif
  mp4Options?: Mp4Options // modern-mp4
}

export interface Mp4FrameOptions {
  duration?: number
}

export interface GifFrameOptions {
  duration?: number
}

export type FrameOptions = Mp4FrameOptions | GifFrameOptions

export interface Recorder {
  isSupported(): boolean | Promise<boolean>
  addFrame(canvas: HTMLCanvasElement, options?: FrameOptions): void | Promise<void>
  render(): Promise<Blob>
}
