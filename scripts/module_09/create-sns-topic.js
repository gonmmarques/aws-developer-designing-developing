// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const sns = new AWS.SNS()
const topicName = 'hamster-topic'

createTopic(topicName)
.then(data => console.log(data))

function createTopic (topicName) {
  const params = {
    Name: topicName
  }

  return new Promise((resolve, reject) => {
    sns.createTopic(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
