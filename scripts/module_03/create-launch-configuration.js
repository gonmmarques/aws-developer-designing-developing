const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({ region: 'us-east-1'})

// Declare local variables
const autoScaling = new AWS.AutoScaling()

const lcName = 'hamsterLC'
const roleName = 'hamsterLCRole'
const sgName = 'hamster_sg'
const keyName = 'hamster_key'

helpers.createIamRole(roleName)
.then(profileArn => createLaunchConfiguration(lcName, profileArn))
.then(data => console.log(data))

function createLaunchConfiguration (lcName, profileArn) {
    const params = {
        IamInstanceProfile: profileArn,
        ImageId: 'ami-014dea3e162978eb4',
        InstanceType: 't2.micro',
        LaunchConfigurationName: lcName,
        KeyName: keyName,
        SecurityGroups: [
            sgName
        ],
        UserData: 'IyEvYmluL2Jhc2gNCmN1cmwgLS1zaWxlbnQgLS1sb2NhdGlvbiBodHRwczovL3JwbS5ub2Rlc291cmNlLmNvbS9zZXR1cF8xMi54IHwgc3VkbyBiYXNoIC0NCnN1ZG8geXVtIGluc3RhbGwgLXkgbm9kZWpzDQpzdWRvIHl1bSBpbnN0YWxsIC15IGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQNCmNkIGhiZmwNCm5wbSBpDQpucG0gcnVuIHN0YXJ0'
    }

    return new Promise((resolve, reject) => {
        autoScaling.createLaunchConfiguration(params, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
