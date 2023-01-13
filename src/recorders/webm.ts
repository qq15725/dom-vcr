import type { Options, Recorder } from '../types'

export function createWebmRecorder(options: Options): Recorder {
  const { width, height, interval } = options

  let frames: CanvasImageSource[] = []

  return {
    addFrame(frame) {
      frames.push(frame)
    },
    render() {
      return new Promise(resolve => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const context = canvas.getContext('2d')!
        const stream = canvas.captureStream(1000 / interval)
        const media = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=h264' })

        let frameIndex = 0
        let blobs: Blob[] = []

        function loop() {
          if (media.state === 'inactive') return
          const { width, height } = canvas
          context.drawImage(frames[frameIndex], 0, 0, width, height)
          requestAnimationFrame(loop)
        }

        media.ondataavailable = async ({ data }) => {
          blobs.push(data)
          if (media.state === 'recording') {
            if (!frames[frameIndex + 1]) {
              return media.stop()
            }
            frameIndex++
          }
        }

        media.onstop = () => {
          resolve(new Blob(blobs, { type: 'video/webm' }))
          blobs = []
          frames = []
          frameIndex = 0
        }

        media.start(interval)

        loop()
      })
    },
  }
}
