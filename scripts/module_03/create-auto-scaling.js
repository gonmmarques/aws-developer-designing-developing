// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-east-1'})

// Declare local variables
const autoScaling = new AWS.AutoScaling()
const asgName = 'hamsterASG'
const lcName = 'hamsterLC'
const policyName = 'hamsterPolicy'
const tgArn = 'arn:aws:elasticloadbalancing:us-east-1:773771193701:targetgroup/hamsterTG/48aa0215a22f08d9'

createAutoScalingGroup(asgName, lcName)
.then(() => createASGPolicy(asgName, policyName))
.then((data) => console.log(data))

function createAutoScalingGroup (asgName, lcName) {
    const params = {
        AutoScalingGroupName: asgName,
        AvailabilityZones: [
            'us-east-1a',
            'us-east-1b'
        ],
        TargetGroupARNs: [
            tgArn
        ],
        LaunchConfigurationName: lcName,
        MaxSize: 2,
        MinSize: 1
    }

    return new Promise((resolve, reject) => {
        autoScaling.createAutoScalingGroup(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

function createASGPolicy (asgName, policyName) {
  // TODO: Create an auto scaling group policy
}
