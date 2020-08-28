const WebSocket = require('ws');
const axios = require('axios');
 

var subPayload= {
    "action": "subcribtion",
    "subcribe":"investers"
}
var publishdata={ 
"messageOb":{
        "id":"4",
        "subcribe":"investers",
        "message":"check fifo queue"},
"SNSTopic":"client-notification"
}




var wsconnect=function ConnectSocket(url){
    const ws = new WebSocket(url);
    
    return ws
}





var publish=function PublishMessages(MessagePayload){
    return new Promise ((resolve,rejects)=>{
        axios.post('https://p217jh5pj4.execute-api.us-east-1.amazonaws.com/Stage/publish',MessagePayload )
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            rejects(error)
          });
    })
   
}



module.exports={
    wsconnect,
    publish,
    subPayload,
    publishdata
}
















// const ws = new WebSocket('wss://e87jw3xvsg.execute-api.us-east-1.amazonaws.com/Stag');
 
// ws.on('open', function open() {
//     ws.send(JSON.stringify(  {
//       "action": "subcribrgtion",
//       "subcribe":"invester"
//   }));
//   });
   
//   ws.on('message', function incoming(data) {
//     console.log(data);
//   })