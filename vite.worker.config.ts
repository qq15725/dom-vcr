import { resolve } from 'path'
import { defineConfig } from 'vite'

const resolvePath = (str: string) => resolve(__dirname, str)

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      name: 'gif.worker',
      formats: ['iife'],
      fileName: () => 'gif.worker.js',
      entry: resolvePath('./src/workers/gif.worker.ts'),
    },
  },
})
