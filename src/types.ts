import type GifJsRecorder from 'gif.js'

export interface Options {
  width: number
  height: number
  fps: number
  gif?: GifJsRecorder
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
