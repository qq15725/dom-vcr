interface context {
  framesCount: number
  file?: any
  track?: number
  config?: VideoEncoderConfig
}

export function createVideoEncoder(mp4: any) {
  const context: context = {
    framesCount: 0,
  }

  const encoder = new VideoEncoder({
    output: (chunk, meta) => {
      const { file, track, config } = context

      if (!file || !config) return

      const { width, height } = config

      if (!track) {
        context.track = file.addTrack({
          timescale: 1000,
          width,
          height,
          brands: ['isom', 'iso2', 'avc1', 'mp41'],
          avcDecoderConfigRecord: meta.decoderConfig?.description,
        })
      }

      const buffer = new Uint8Array(chunk.byteLength)

      chunk.copyTo(buffer)

      file.addSample(
        context.track,
        buffer,
        {
          duration: chunk.duration,
          dts: chunk.timestamp,
          cts: chunk.timestamp,
          is_sync: chunk.type === 'key',
        },
      )
    },
    error: console.error,
  })

  function reset() {
    context.file = mp4.createFile()
    context.track = undefined
    context.framesCount = 0
  }

  function configure(config: VideoEncoderConfig) {
    reset()
    context.config = config
    encoder.configure(config)
  }

  function encode(data: CanvasImageSource) {
    const { framesCount, config } = context
    const { framerate = 1 } = config || {}
    const duration = 1000 / framerate
    const frame = new VideoFrame(data, {
      timestamp: framesCount * duration - 1,
      duration,
    })
    encoder.encode(frame, { keyFrame: true })
    frame.close()
    context.framesCount++
  }

  function flush() {
    return encoder.flush().then(() => {
      const { file } = context
      file.flush()
      const dataStream = new mp4.DataStream()
      dataStream.endianness = mp4.DataStream.BIG_ENDIAN
      for (let i = 0; i < file.boxes.length; i++) {
        file.boxes[i].write(dataStream)
      }
      reset()
      return dataStream.buffer
    })
  }

  return {
    configure,
    encode,
    flush,
  }
}
