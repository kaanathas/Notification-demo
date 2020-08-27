# my-Notification-app

This App is the simple Notification services that include Websocket ,SNS, SQS ,Lambda and Apigateway. 

To use the app
run

    sam build

    sam deploy --guided

This Websocket has 4 main route

    * $connect
    * $disconnect
    * Subcribtion
    * sendmessage

The SNS have 2 topic
    
    * clientNotification
    * TransactionsQueue

The SQS have 1 Queue 

    * Transactions

The ApiGateway have 3 main enpoints

    * create-topic 
      this is for creating a new topic in SNS

    * Publish-messages
      this publish the messages to WebSockets or SQS Queue

    * Poll-messages 
      this will poll messages from the SNS Queue

#   Subcribe any title


To connect with the route in terminal run 
    
    wscat -c <WebSocket URL>

After the connection success then subcribe any tittle using Subcription Route
```Json
    
    {
        "action": "Subcribtion",
        "subcribe":"invester"
    }

```

#  Publish any messages to a socket

   The publish-messages lambda handle the message work flow

   if publish the message to the WebSocket
   send the `POST `request to the publish-messages gateway
    
    request body should be

 ```json
      {
            "SNSTopic":"clientNotification",
            "messageOb":{
                        "subcribe":"invester",
                        "message":"this is sample message to invester subcribers"
                         }
      }

 ```
#  Publish any messages to SNS Queue
   if publish the message to the SNS Queue
   send the `POST` request to the publish-messages gateway
    
    request body should be

 ```json
      {
            "SNSTopic":"TransactionsQueue",
            "messageOb":{
                         "id":"1",
                        "message":"this sample messages to the transaction Queue"
                         }
      }

 ```

#  Polling messages from SNS Queue
   if poll the message to the SNS Queue
   send the `GET` request to the poll-messages gateway

   - [x] delete the messages from queue after read
   - [x] get messages as responce  :blush:


# TODO 

   - [ ] Create the queue it will trigger the lambda
   - [ ] Create FIFO type queue
   - [ ] Do the unit test
   - [ ] Cleanup the code  :v:
   - [ ] Rewrite the document  :relaxed:






   