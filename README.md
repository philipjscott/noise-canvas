# noise-canvas

Noisify a canvas!

![Noise demo](https://unpkg.com/noise-canvas@1.0.1/images/demo.png)

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

## API

#### noisify(canvas, noiseFn, config)

* canvas: The canvas element or canvas DOM selector string
* noiseFn: A two-dimensional noise function with a range of [-1, 1]
* config: 
  * ImageData: If using node-canvas, the ImageData constructor (`canvas.ImageData`)
