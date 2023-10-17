import { basename, resolve } from 'path'
import { defineConfig } from 'vite'
import { browser, exports, module, name } from './package.json'

const resolvePath = (str: string) => resolve(__dirname, str)

export default defineConfig({
  build: {
    lib: {
      entry: resolvePath('./src/index.ts'),
    },
    rollupOptions: {
      external: [
        'modern-gif',
        'modern-mp4',
        'mp4box',
      ],
      output: [
        {
          format: 'es',
          entryFileNames: basename(module),
        },
        {
          format: 'umd',
          entryFileNames: basename(browser),
          name: name.replace(/-(\w)/ig, (_, v) => v.toUpperCase()),
          globals: {
            'mp4box': 'MP4Box',
            'modern-gif': 'modernGif',
            'modern-mp4': 'modernMp4',
          },
        },
        {
          format: 'cjs',
          entryFileNames: basename(exports['.'].require),
        },
      ],
    },
  },
})
