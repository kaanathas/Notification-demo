const AWS = require('aws-sdk');

AWS.config.update({region:process.env.AWS_REGION });
// Create an SQS service object

exports.handler = event => {
  var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
  var queueURL = process.env.QUEUE_URL;

  console.log("this is poll url "+queueURL)
  var messgesPolled=''
  var params = {
   AttributeNames: [
      "SentTimestamp",
      "message"
   ],
   MaxNumberOfMessages: 10,
   MessageAttributeNames: [
      "All"
   ],
   QueueUrl: queueURL,
   VisibilityTimeout: 20,
   WaitTimeSeconds: 0
  };
  

    sqs.receiveMessage(params).promise()
    .then(res=>{
      console.log(res)
      if(res.Messages){
        messgesPolled=JSON.parse(res.Messages[0].Body).Message;
        console.log("this messages come out"+ messgesPolled)
        var deleteParams = {
          QueueUrl: queueURL,
          ReceiptHandle: res.Messages[0].ReceiptHandle
        };
        sqs.deleteMessage(deleteParams).promise()
        .then(res=>console.log(res+"delete complete"))
        .catch(err=>{
          return { 'statusCode': 500, 'body': err }
        })
      }
    })
    .catch(err => {
      console.log(err)
      return { 'statusCode': 500, 'body': err }});
   
  

    return {
      'statusCode': 200,
      'body':  messgesPolled
          

  }


};

/*

  
*/