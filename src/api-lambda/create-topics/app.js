const AWS = require('aws-sdk');

AWS.config.update({region:process.env.AWS_REGION });
const ddb=new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10', region: process.env.AWS_REGION
})

exports.handler = async event => {
  var datare=JSON.parse(event.body)
  const topicNAme= datare.topic;
  var topicArn
  var createTopicPromise = new AWS.SNS({apiVersion: '2010-03-31'}).createTopic({Name: topicNAme}).promise();
  console.log("Topic is recive " + datare.topic);
  // Handle promise's fulfilled/rejected states
  await createTopicPromise.then(
    async data=> {
      topicArn=data.TopidatacArn
      console.log("Topic ARN is " + data.TopicArn);

      const putParams = {
        TableName: process.env.TABLE_NAME,
        Item: {
          topicName: topicNAme,
          Arn: data.TopicArn
        }
      };
    
      try {
        await ddb.put(putParams).promise();
      } catch (err) {
        return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
      }
     
// TODO  subcribe a lambda function
 





    }).catch(
      err =>{
        console.log("Topic ARN is err "  );
      console.error(err, err.stack);
    });


  return {
    statusCode: 200,
    body: topicArn
    };


};