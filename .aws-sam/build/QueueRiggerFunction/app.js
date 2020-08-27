
'use strict';

const AWS = require('aws-sdk');


exports.handler = async(event, context) => {
    var queueURL = process.env.QUEUE_URL;
    var message= JSON.parse(event.Records[0].body).Message;

    console.log(message+"this is stringfy")

    console.log(JSON.parse(message))

    var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {

   // Remove DelaySeconds parameter and value for FIFO queues
  MessageBody: message,
  MessageDeduplicationId: "TheWhistler",  // Required for FIFO queues
  MessageGroupId: "Group1",  // Required for FIFO queues
  QueueUrl: queueURL
};

await sqs.sendMessage(params).promise()
     .then(res=>console.log("this was success"+res) )
     .catch(err=>console.log("this was failed"+err) )

   
    return {
        statusCode: 200,
        body: "Subscribed for: " + event
    };
};