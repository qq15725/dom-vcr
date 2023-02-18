import { encodeFrame } from 'modern-gif'

const worker = self as DedicatedWorkerGlobalScope

worker.onmessage = ev => {
  const encoded = encodeFrame(ev.data)

  worker.postMessage(encoded, [encoded.buffer])
}
