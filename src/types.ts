export interface Options {
  width: number
  height: number
  interval: number
  type: 'mp4' | 'gif' | 'webm'
  // modern-gif
  gif?: any
  gifWorkerUrl?: string
  // mp4box
  mp4?: any
}

export interface Mp4FrameOptions {
  //
}

export interface GifFrameOptions {
  delay?: number
}

export type FrameOptions = Mp4FrameOptions | GifFrameOptions

export interface Recorder {
  addFrame(frame: HTMLCanvasElement, options?: FrameOptions): void | Promise<void>
  render(): Promise<Blob>
}
