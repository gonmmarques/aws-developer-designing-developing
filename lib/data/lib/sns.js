const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1' })

const sns = new AWS.SNS()
const TOPIC_ARN = 'arn:aws:sns:us-east-1:773771193701:hamster-topic'

function publish (msg) {
  const params = {
    TopicArn: TOPIC_ARN,
    Message: msg
  }

  return new Promise((resolve, reject) => {
    sns.publish(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = { publish }
