const noisify = require('../../')
const { Simplex2 }  = require('tumult')

const simplex = new Simplex2('ayylmao')
const canvas = document.createElement('canvas')

canvas.width = 500
canvas.height = 500

noisify(canvas, (x, y) => simplex.gen(x / 128, y / 128))

document.body.appendChild(canvas)
