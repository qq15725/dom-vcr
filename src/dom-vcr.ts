import { domToImage, loadMedia } from 'modern-screenshot'
import { createGifRecorder, createMp4Recorder } from './recorders'
import { resovleOptions } from './options'
import type { Options, Recorder } from './types'

export function createDomVcr<T extends Node>(
  node: T,
  userOptions: Partial<Options> = {},
) {
  const options = resovleOptions(node, userOptions)

  let recorder: Recorder
  if (options.gif) {
    recorder = createGifRecorder(options)
  } else {
    recorder = createMp4Recorder(options)
  }

  return {
    addFrame: async () => recorder.addFrame(await loadMedia(await domToImage(node))),
    render: () => recorder.render(),
  }
}
