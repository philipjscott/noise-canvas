# noise-canvas

Noisify a canvas!

![Noise demo](https://unpkg.com/noise-canvas@1.1.0/images/demo.png)

Maps the output of a noise function, with a range of [-1, 1], to [0, 255], which is then applied to a canvas using `ctx.putImageData`. Supports both Node.js (via the [canvas](https://www.npmjs.com/package/canvas) package) and the browser!

## Installation

```bash
yarn add noise-canvas

# Or, if you're feeling nostalgic...

npm install noise-canvas
```

## Usage

```js
const noisify = require('noise-canvas')
const { Simplex2 } = require('tumult')

const canvas = document.createElement('canvas')
const simplex = new Simplex2('seed')

canvas.height = 500
canvas.width = 500
noisify(canvas, (x, y) => simplex(x / 128, y / 128))

document.body.appendChild(canvas)
```

You can also specify noise functions for each channel (RGBA). If no function is supplied, it defaults to `() => 1`.

```js
const noise1 = new Simplex2('some seed')
const noise2 = new Simplex2('another seed')
const noise3 = new Simplex2('another one')

noisify(canvas, [
  noise1.gen.bind(noise1),
  noise2.gen.bind(noise2),
  noise3.gen.bind(noise3)
])
```

## API

#### noisify(canvas, noiseFn, config)

* canvas: The canvas element or canvas DOM selector string
* noiseFn: A two-dimensional noise function, or an array of two-dimensional noise functions, with a range of [-1, 1]
* config: 
  * ImageData: If using node-canvas, the ImageData constructor (`canvas.ImageData`)
