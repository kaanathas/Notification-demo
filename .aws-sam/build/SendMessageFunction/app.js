const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

const { TABLE_NAME ,CALLBACK_URL } = process.env;

exports.handler = async event => {
  let connectionData;
  
  // console.log(JSON.parse(event.Records[0].body).Message.message+"tis is test")
  let messageo = JSON.parse(event.Records[0].Sns.Message);
  

  // console.log(messageo)

 
  const postData = messageo.message
  console.log(`notification data 1 is ${postData}`);
  // const postData = JSON.parse(event.body).data;
  const subcribe = messageo.subcribe;
  try {
    connectionData = await ddb.scan({ TableName: TABLE_NAME, ProjectionExpression: 'connectionId', FilterExpression: "subcribe= :topic",
    ExpressionAttributeValues: {
      ":topic": subcribe
    } }).promise();
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  
  
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: CALLBACK_URL
  });
  
  
  console.log(`notification data ${postData}`);
  const postCalls = connectionData.Items.map(async ({ connectionId }) => {
    console.log(`Found stale connectionids${connectionId }`);
    try {
      await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise();
    } catch (e) {
      if (e.statusCode === 410) {
        console.log(`Found stale connection, deleting ${connectionId}`);
        await ddb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
      } else {
        throw e;
      }
    }
  });
  
  try {
    await Promise.all(postCalls);
  } catch (e) {
    return { statusCode: 500, body: e.stack };
  }

  return { statusCode: 200, body: 'Data sent.' };
};