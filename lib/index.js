const isNode = require('detect-node')

function noiseCanvas (canvasSlt, noiseFn, config = {}) {
  if (isNode) {
    global.ImageData = config.ImageData
  }

  const canvas = (typeof canvasSlt === 'string' && document)
    ? document.querySelector(canvaSlt)
    : canvasSlt
  const { width, height } = canvas
  const ctx = canvas.getContext('2d')
  const pixelData = new Uint8ClampedArray(width * height * 4) // RGBA

  // for testing, make the noiseFn keep track of the #s generated and compare
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const n = 255 * (noiseFn(x, y) + 1) / 2

      pixelData.set(
        new Uint8Array([n, n, n, 255]),
        x * 4 + y * 4 * width
      )
    }
  }

  ctx.putImageData(new ImageData(pixelData, width, height), 0, 0)
}

module.exports = noiseCanvas
