// Constants
export const IN_BROWSER = typeof window !== 'undefined'
export const SUPPORT_MEDIA_RECORDER = IN_BROWSER && 'MediaRecorder' in window

export const isElementNode = (node: Node): node is Element => node.nodeType === 1 // Node.ELEMENT_NODE
