const noisify = require('../../')
const { Simplex2 }  = require('tumult')

const simplex = new Simplex2('ayylmao')
const canvas = document.createElement('canvas')

canvas.width = 200
canvas.height = 200

noisify(canvas, (x, y) => simplex.gen(x / 32, y / 32))

document.body.appendChild(canvas)
