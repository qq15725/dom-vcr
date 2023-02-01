// @ts-expect-error mp4box
import mp4box from 'mp4box'

interface context {
  framesCount: number
  file?: any
  track?: number
  config?: VideoEncoderConfig
}

const worker = self as DedicatedWorkerGlobalScope

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
  context.file = mp4box.createFile()
  context.track = undefined
  context.framesCount = 0
}

worker.onmessage = ev => {
  const { type, data } = ev.data

  if (type === 'configure') {
    reset()
    context.config = data
    encoder.configure(data)
  } else if (type === 'encode') {
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
  } else if (type === 'flush') {
    encoder.flush().then(() => {
      const { file } = context
      file.flush()
      const dataStream = new mp4box.DataStream()
      dataStream.endianness = mp4box.DataStream.BIG_ENDIAN
      for (let i = 0; i < file.boxes.length; i++) {
        file.boxes[i].write(dataStream)
      }
      worker.postMessage(dataStream.buffer, [dataStream.buffer])
      reset()
    })
  }
}
