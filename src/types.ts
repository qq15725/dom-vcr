import type GifJs from 'gif.js'

export interface Options {
  width: number
  height: number
  interval: number
  gif?: GifJs
}

export interface Mp4FrameOptions {
  //
}

export interface GifFrameOptions {
  delay?: number
}

export type FrameOptions = Mp4FrameOptions | GifFrameOptions

export interface Recorder {
  addFrame(frame: CanvasImageSource, options?: FrameOptions): void
  render(): Promise<Blob>
}
