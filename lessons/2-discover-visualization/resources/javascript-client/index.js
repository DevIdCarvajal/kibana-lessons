require('dotenv').config()

const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth: {
    username: 'elastic',
    password: process.env.PASSWORD
  }
})

const myIndex = "mysuperblog-comments"

async function getComment(index, id) {
  const result = await client.get({ index, id })
  
  return result.body._source
}

// getComment(myIndex, 'CrnxQ4kBTslZhKjlkCaS')
//   .then(comment => console.log(comment))
//   .catch(console.log)

async function indexComment(index, body) {
  await client.index({ index, body })
}

// indexComment(myIndex, {
//   id: '888',
//   postId: '999',
//   name: 'Anonymous',
//   body: 'asdf asdf',
//   email: 'hello@gmail.com'
// }).catch(console.log)

async function searchComments(index, match) {
  const result = await client.search({
    index,
    body: {query: {match}}
  })
  
  return result.body.hits.hits
}

// searchComments(myIndex, { postId: 2 })
//   .then(comments => console.log(comments))
//   .catch(console.log)
