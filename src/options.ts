import { isElementNode } from './utils'
import type { Options } from './types'

export function resovleOptions(node: Node, options: Partial<Options> = {}): Options {
  const { interval = 500 } = options
  let { width = 0, height = 0 } = options

  if (isElementNode(node)) {
    const box = node.getBoundingClientRect()
    width = width || box.width
    height = height || box.height
  }

  return {
    ...options,
    width,
    height,
    interval,
  }
}
