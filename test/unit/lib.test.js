const { JSDOM } = require('jsdom')
const Canvas = require('canvas')
const { expect } = require('chai')
const { Simplex2 } = require('tumult')
const path = require('path')
const fs = require('fs')
const noisify = require('../../')

describe('Fill a canvas with noise', function () {
  let noiseData = []
  const width = 100
  const height = 100
  const simplexFns = [
    new Simplex2('ayyylmao'),
    new Simplex2('another seed'),
    new Simplex2('seed'),
    new Simplex2('test')
  ]

  beforeEach(function () {
    noiseData = []
  })

  describe('Node-canvas support', function () {
    describe('Single noise function', function () {
      const canvas = new Canvas(width, height)
      const filename = path.join(__dirname, 'noise.png')
      const noiseFn = (x, y) => {
        const noise = simplexFns[0].gen(x / 32, y / 32)
        const map = n => Math.floor(255 * (n + 1) / 2)
        const n = map(noise)

        noiseData.push(n, n, n, 255)
        return noise
      }

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

    describe('RGBA noise function array', function () {
      const canvas = new Canvas(width, height)
      const filename = path.join(__dirname, 'noiseRGBA.png')
      const getNoiseFn = (i) => (x, y) => {
        const noise = simplexFns[i].gen(x / 32, y / 32)
        const map = n => Math.floor(255 * (n + 1) / 2)
        const n = map(noise)

        noiseData.push(n)
        return noise
      }

      noisify(canvas, [
        getNoiseFn(0),
        getNoiseFn(1),
        getNoiseFn(2),
        getNoiseFn(3)
      ], { 
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
          noisify(canvas, [
            getNoiseFn(0),
            getNoiseFn(1),
            getNoiseFn(2),
            getNoiseFn(3)
          ])
        } catch (err) {
          if (!err) {
            expect.fail('Missing ImageData Error should be thrown')
          }
          expect(err.message).to.equal('No ImageData constructor supplied')
        }
      })

      it('should fill the canvas with white pixels if given an empty array', function () {
        noisify(canvas, [], { ImageData: Canvas.ImageData })
        
        const pixels = canvas
          .getContext('2d')
          .getImageData(0, 0, width, height)
          .data

        expect(pixels.every(x => x === 255))
      })
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

      noisify('#id', (x, y) => simplexFns[0].gen(x / 32, y / 32))
    })
  })
})
