const AWS = require('aws-sdk');

AWS.config.update({region:process.env.AWS_REGION });

exports.handler = async event => {
  var data=JSON.parse(event.body)
  returnmessage=''
  var topicArn=process.env.TOPIC
 
  
  // GET topic name from event and switch the arn form env

  var topic=data.SNSTopic

  
if(topic=='clientNotification'){
  topicArn=process.env.TOPIC_WEBSOCKET
}else if(topic="trigger"){
  topicArn=process.env. TOPIC_QUEUE_TRI
}
else{
  topicArn=process.env.TOPIC_QUEUE
}
 






// Create publish parameters
var params = {
  
  Message: JSON.stringify(data.messageOb), /* required */
  TopicArn: topicArn
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
await publishTextPromise
.then(
  data=>{
    console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
    returnmessage=params.Message
   
  })
  .catch(
    
    err=> {
      return {
        statusCode: 200,
        body: "Sending err for: " + err
    };
   
  });

  return {
    statusCode: 200,
    body: returnmessage
};





};