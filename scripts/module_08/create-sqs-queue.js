// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

// Declare local variables
const sqs = new AWS.SQS()
const queueName = 'hamster-race-results'

createQueue(queueName)
.then(data => console.log(data))

function createQueue (queueName) {
  const params = {
    QueueName: queueName,
    Attributes: {
      DelaySeconds: '0',
      MessageRetentionPeriod: '345600',
      VisibilityTimeout: '30',
      ReceiveMessageWaitTimeSeconds: '0',
    }
  }

  return new Promise((resolve, reject) => {
    sqs.createQueue(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
