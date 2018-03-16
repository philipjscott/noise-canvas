const noisify = require('../../')
const { Simplex2 }  = require('tumult')

const noise1 = new Simplex2('some seed')
const noise2 = new Simplex2('another seed')
const noise3 = new Simplex2('foobar')

const canvas = document.createElement('canvas')
const rgbaCanvas = document.createElement('canvas')

canvas.width = 300
canvas.height = 200

rgbaCanvas.width = 300
rgbaCanvas.height = 200

noisify(canvas, (x, y) => noise1.gen(x / 64, y / 64))
noisify(rgbaCanvas, [
  (x, y) => noise1.gen(x / 64, y / 64),
  ,
  (x, y) => noise2.gen(x / 64, y / 64),
  (x, y) => noise3.gen(x / 64, y / 64)
])

document.body.appendChild(canvas)
document.body.appendChild(rgbaCanvas)
