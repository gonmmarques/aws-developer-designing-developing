// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const dynamo = new AWS.DynamoDB()

createTable('hamsters')
.then(() => createTable('races'))
.then(data => console.log(data))

function createTable (tableName) {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'N'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  }

  return new Promise((resolve, reject) => {
    dynamo.createTable(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
