const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: {
    id: 'Learning-Test:ZXVyb3BlLXdlc3QxLmdjcC5jbG91ZC5lcy5pbzo0NDMkMWQ4Y2Y4NDljODk2NGFlMWEwOTlhZDA5YTAzYzRhZTYkYzkwNTk0MmRkMDExNDIwOTk0ZDk5YTYzNzcyZDVmYzA='
  },
  auth: {
    username: 'elastic',
    password: 'X4zn2A9VYiHQX1pkSABicswx'
  }
})

async function getComment(id) {

  const result = await client.get({
    index: 'file-upload-comments',
    id: id
  })
  
  console.log(result.body._source)
}
// const commentId = '6LbYH4kBTslZhKjlyFfm'
// getComment(commentId).catch(console.log)

async function indexComment(document) {

  await client.index({
    index: 'file-upload-comments',
    body: document
  })
}
// const commentDocument = {
//   id: '888',
//   postId: '999',
//   name: 'Anonymous',
//   body: 'asdf asdf',
//   email: 'hello@gmail.com'
// }
//indexComment(commentDocument).catch(console.log)

async function searchComment(match) {

  const result = await client.search({
    index: 'file-upload-comments',
    body: {
      query: {
        match: match
      }
    }
  })
  
  console.log(result.body.hits.hits)
}
// const matchBody = {
//   name: 'Anonymous'
// }
// searchComment(matchBody)