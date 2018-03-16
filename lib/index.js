const isNode = require('detect-node')

function noiseCanvas (canvasSlt, noiseFn, config = {}) {
  if (isNode) {
    if (!global.ImageData) {
      if (!config.ImageData) {
        throw new Error('No ImageData constructor supplied')
      }
      global.ImageData = config.ImageData
    }
  }

  const canvas = (typeof canvasSlt === 'string' && document)
    ? document.querySelector(canvasSlt)
    : canvasSlt
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const pixelData = new Uint8ClampedArray(width * height * 4)

  let functs = []
  let isRGBA = false

  if (typeof noiseFn === 'object') {
    isRGBA = true

    for (let i = 0; i < 4; i++) {
      if (noiseFn[i]) {
        functs[i] = (x, y) => 255 * (noiseFn[i](x, y) + 1) / 2
      } else {
        functs[i] = () => 255
      }
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pixel

      if (isRGBA) {
        pixel = new Uint8Array(functs.map(fn => fn(x, y)))
      } else {
        const n = 255 * (noiseFn(x, y) + 1) / 2
        pixel = new Uint8Array([n, n, n, 255])
      }

      pixelData.set(pixel, x * 4 + y * 4 * width)
    }
  }

  ctx.putImageData(new ImageData(pixelData, width, height), 0, 0)
}

module.exports = noiseCanvas
