// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1'})

// Declare local variables
const ec2 = new AWS.EC2()
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together
createSecurityGroup(sgName)
.then(() => {
  return createKeyPair(keyName)
})
.then(helpers.persistKeyPair)
.then(() => {
  return createInstance(sgName, keyName)
})
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions

function createSecurityGroup (sgName) {
  const params = {
    Description: sgName,
    Group: sgName
  }

  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
        if (err) reject(err)
        else {
          const params = {
            GroupId: data.GroupId,
            IpPermissions: [
              {
                IpProtocol: 'tcp',
                FromPort: 22,
                ToPort: 22,
                IpRanges: [
                  {
                    CidrIp: '0.0.0.0/0'
                  }
                ]
              }, {
                IpProtocol: 'tcp',
                FromPort: 3000,
                ToPort: 3000,
                IpRanges: [
                  {
                    CidrIp: '0.0.0.0/0'
                  }
                ]
              }
            ]
          }
          ec2.authorizeSecurityGroupIngress(params, (err) => {
            if (err) reject(err)
            else resolve()
          })
        }
    })
  })
}

function createKeyPair (keyName) {
  // TODO: Create keypair
}

function createInstance (sgName, keyName) {
  // TODO: create ec2 instance
}
