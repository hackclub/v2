const axios = require('axios')
const writeFile = require('fs').writeFile

exports.onPreBootstrap = () =>
  axios
    .get('https://api.hackclub.com/v1/challenges')
    .then(res => res.data)
    .then(challenges => {
      challenges.forEach(data => {
        data.id = data.id.toString() // for Gatsby
      })
      writeFile('./public/challenges.json', JSON.stringify(challenges), err => {
        if (err) throw err
      })
    })
    .catch(e => {
      console.error(e)
    })
