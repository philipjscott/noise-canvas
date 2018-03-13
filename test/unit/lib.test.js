const { JSDOM } = require('jsdom')
const Canvas = require('canvas')
const { expect } = require('chai')
const { Simplex2 } = require('tumult')
const path = require('path')
const fs = require('fs')
const noisify = require('../../')

describe('Fill a canvas with noise', function () {
  let noiseData = []

  const simplex = new Simplex2('ayyylmao')
  const noiseFn = (x, y) => {
    const noise = simplex.gen(x / 32, y / 32)
    const map = n => Math.floor(255 * (n + 1) / 2)
    const n = map(noise)

    noiseData.push(n, n, n, 255)
    return noise
  }

  beforeEach(function () {
    noiseData = []
  })

  describe('Node-canvas support', function () {
    const width = 100
    const height = 100
    const filename = path.join(__dirname, 'noise.png')
    const canvas = new Canvas(width, height)

    noisify(canvas, noiseFn, { 
      ImageData: Canvas.ImageData
    })

    it('matches the data created by the noise function', function () {
      const pixels = canvas
        .getContext('2d')
        .getImageData(0, 0, width, height)
        .data

      for (let i = 0; i < noiseData.length; i++) {
        expect(noiseData[i]).to.equal(pixels[i])
      }
    })

    it('can produce an image file with the correct pixel data', function () {
      try {
        canvas.createPNGStream().pipe(fs.createWriteStream(filename))
      } catch (err) {
        expect.fail('No errors should occur when creating image')
      }
    })

    it('throws an error if no ImageData constructor is supplied', function () {
      try {
        noisify(canvas, noiseFn)
      } catch (err) {
        if (!err) {
          expect.fail('Missing ImageData Error should be thrown')
        }
        expect(err.message).to.equal('No ImageData constructor supplied')
      }
    })
  })

  describe('Browser support with JSDOM mock', function () {
    const { window } = new JSDOM()
    const { document } = window

    global.document = document

    it('works with canvas DOM selector strings', function () {
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      canvas.id = 'id'
      
      document.body.appendChild(canvas)

      noisify('#id', (x, y) => simplex.gen(x / 32, y / 32))
    })
  })
})
