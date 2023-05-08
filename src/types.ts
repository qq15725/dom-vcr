export interface Options {
  width: number
  height: number
  interval: number
  type: 'mp4' | 'gif' | 'webm'
  // modern-gif
  gif?: any
  gifWorkerUrl?: string
  gifWorkerNumber?: number
  gifMaxColors?: number
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
  isSupported(): boolean | Promise<boolean>
  addFrame(canvas: HTMLCanvasElement, options?: FrameOptions): void | Promise<void>
  render(): Promise<Blob>
}
