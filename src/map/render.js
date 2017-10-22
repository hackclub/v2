const Pageres = require('pageres')

new Pageres({ delay: 8 })
  .src('0.0.0.0:3000/map', ['1024x768'], { crop: true, filename: 'map' })
  .dest('./public')
  .run()
