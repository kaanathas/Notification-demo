# sample system

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

The SNS have 3 topic
    
    * client-notification
    * transactions-queue
    * queue-trigger

The SQS have 4 Queue 

    * transactions
    * ordered-messages-queue.fifo
    * lambda-trigger
    * undeliver-messages

The ApiGateway have 3 main enpoints

    * create-topic 
      this is for creating a new topic in SNS

    * publish-messages
      this publish the messages to WebSockets or SQS Queue

    * poll-messages 
      this will poll messages from the SNS Queue

#   Subcribe  title


To connect with the route in terminal run 
    
    wscat -c <WebSocket URL>

After the connection success then subcribe any tittle using Subcription Route
```Json
    
    {
        "action": "subcribtion",
        "subcribe":"invester"
    }

```

#  Publish  messages to a socket

   The publish-messages lambda handle the message work flow

   if publish the message to the WebSocket
   send the `POST `request to the publish-messages gateway
    
    request body should be

 ```json
      {
            "SNSTopic":"client-notification",
            "messageOb":{
                        "subcribe":"invester",
                        "message":"this is sample message to invester subcribers"
                         }
      }

 ```
#  Publish messages to SNS Queue
   if publish the message to the SNS Queue
   send the `POST` request to the publish-messages gateway
    
    request body should be

 ```json
      {
            "SNSTopic":"transactions-queue",
            "messageOb":{
                         "id":"1",
                        "message":"this sample messages to the transaction Queue"
                         }
      }

 ```
 #  Publish messages to SNS FIFO Queue
   if publish the message to the SNS Queue
   send the `POST` request to the publish-messages gateway
    
    1. trigger topic send the messages to queue-trigger (SNS queue)
    2. queue-tri

     request body should be

 ```json
      {
            "SNSTopic":"trigger",
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

   - [x] Create the queue it will trigger the lambda
   - [x] Create FIFO type queue
   - [ ] Do the unit test  :pray:
   - [ ] Cleanup the code  :v:
   - [ ] Rewrite the document  :relaxed:






   