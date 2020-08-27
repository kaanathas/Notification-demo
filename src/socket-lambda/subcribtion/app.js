
'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10'
});

exports.handler = async(event, context) => {

    const connectionId = event.requestContext.connectionId;
    const subcribe= JSON.parse(event.body).subcribe;

    const {
        TABLE_NAME
    } = process.env;

    var params = {
        TableName: TABLE_NAME,
        Item: {
            'connectionId': connectionId,
            'subcribe': subcribe
        },
        ReturnValues: 'NONE'
    };

    const data = await docClient.put(params).promise();
    return {
        statusCode: 200,
        body: "Subscribed for: " + event
    };
};