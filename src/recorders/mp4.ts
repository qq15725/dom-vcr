import type { Options, Recorder } from '../types'

export function createMp4Recorder(options: Options): Recorder {
  const { width, height, fps } = options

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
        const stream = canvas.captureStream(fps)
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
            media.pause()
            if (!frames[frameIndex + 1]) {
              return media.stop()
            }
            frameIndex++
            media.resume()
          }
        }

        media.onstop = () => {
          resolve(new Blob(blobs, { type: 'video/mp4' }))
          blobs = []
          frames = []
          frameIndex = 0
        }

        media.start(1000 / fps)

        loop()
      })
    },
  }
}
