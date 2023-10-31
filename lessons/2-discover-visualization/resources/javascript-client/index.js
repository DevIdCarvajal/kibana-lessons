require('dotenv').config()

// Import Elastic Client
const { Client } = require('@elastic/elasticsearch')

// Create Client
const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth: {
    username: 'elastic',
    password: process.env.PASSWORD
  }
})

const myIndex = "example-sw-spaceships"

async function getSpaceship(index, id) {
  const result = await client.get({ index, id })
  
  return result.body._source
}

// getSpaceship(myIndex, 'xujJf4sB0UV02efiIUmg')
//   .then(spaceship => console.log(spaceship))
//   .catch(console.log)

async function indexSpaceship(index, body) {
  await client.index({ index, body })
}

indexSpaceship(myIndex, {
  '@timestamp': '2014-12-15T12:34:52.264000000Z',
  name: 'Cachiflú',
  model: 'Nostromo 45-TW',
  crew: '8'
}).catch(e => console.log(e))

async function searchSpaceships(index, match) {
  const result = await client.search({
    index,
    body: {query: {match}}
  })
  
  return result.body.hits.hits
}

searchSpaceships(myIndex, { model: 'Nostromo 45-TW' })
  .then(spaceships => console.log(spaceships))
  .catch(console.log)
