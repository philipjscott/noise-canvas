const { ImageData, createCanvas } = require('canvas')
const { Simplex2 } = require('tumult')
const noisify = require('../')

const canvas = createCanvas(200, 200)
const simplex = new Simplex2('ayyylmao')

noisify(canvas, (x, y) => simplex.gen(x / 32, y / 32), { ImageData })
