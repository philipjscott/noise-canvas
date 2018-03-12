const noisify = require('../../')
const { Simplex2 }  = require('tumult')

const simplex = new Simplex2('ayylmao')
const canvas = document.createElement('canvas')

canvas.width = 500
canvas.height = 500

noisify(canvas, (x, y) => 255 * (simplex.gen(x / 128, y / 128) + 1) / 2)

document.body.appendChild(canvas)
