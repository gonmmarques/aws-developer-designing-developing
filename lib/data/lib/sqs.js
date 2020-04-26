const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const sqs = new AWS.SQS()

function push (queueName, msg) {
  const params = {
    QueueName: queueName
  }

  return new Promise((resolve, reject) => {
    sqs.getQueueUrl(params, (err, data) => {
      if (err) reject(err)
      else {
        const params = {
          MessageBody: JSON.stringify(msg),
          QueueUrl: data.QueueUrl
        }

        sqs.sendMessage(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })
  })
}

module.exports = { push }
