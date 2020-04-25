// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const client = new AWS.DynamoDB.DocumentClient()

helpers.getHamsterData()
.then(data => populateTable('hamsters', data))
.then(() => helpers.getRaceData())
.then(data => populateTable('races', data))
.then(data => console.log(data))

function populateTable (tableName, data) {
  const params = {
    RequestItems: {
      [tableName]: data.map(item => {
        return {
          PutRequest: {
            Item: item
          }
        }
      })
    }
  }

  return new Promise((resolve, reject) => {
    client.batchWrite(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
