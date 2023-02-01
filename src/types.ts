import type Gif from 'gif.js'

export interface Options {
  width: number
  height: number
  interval: number
  type: 'mp4' | 'gif' | 'webm'
  gif?: Gif
}

export interface Mp4FrameOptions {
  //
}

export interface GifFrameOptions {
  delay?: number
}

export type FrameOptions = Mp4FrameOptions | GifFrameOptions

export interface Recorder {
  addFrame(frame: CanvasImageSource, options?: FrameOptions): void | Promise<void>
  render(): Promise<Blob>
}
