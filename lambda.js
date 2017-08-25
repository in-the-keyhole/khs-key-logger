'use strict'

console.log('Loading function')

var AWS = require('aws-sdk')
// Create DynamoDB service object
var docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  convertEmptyValues: true
})

exports.handler = (body, context, callback) => {
  console.log('Received event:', JSON.stringify(body, null, 2))
  var res = null
  var err = null
  try {
    // const events = JSON.parse(body)
    body.map(record => {
      docClient.put(
        {
          TableName: 'EventLogger',
          Item: record
        },
        function(err, data) {
          if (err) {
            console.log('Error', err)
            err = err
          } else {
            console.log('Success', data)
            res = data
          }
        }
      )
    })
  } catch (e) {
    console.log(e)
    err = e
  }

  //TODO this is likely incorrect
  callback(null, {
    statusCode: err ? '400' : '200',
    body: err ? err.message : JSON.stringify(res),
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
      'Content-Type': 'application/json'
    }
  })
}
