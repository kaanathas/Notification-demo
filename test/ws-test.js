const helper= require('./test-helper');
const { describe } = require('mocha');
var chai= require('chai')
var expect = chai.expect;


describe('testing socket functionality',function(){
    var ws
before(()=>{
     ws=helper.wsconnect('wss://e87jw3xvsg.execute-api.us-east-1.amazonaws.com/Stag');
    
})

describe('publish and reciving messages',()=>{
    it('subcribe the subcribe title',(done)=>{
    
    
          ws.on('open', function open() {
            ws.send(JSON.stringify( helper.subPayload));
            ws.on('message', function incoming(data) {
                expect(data).equal(helper.publishdata.messageOb.message),
               
                done();
              })
            helper.publish(helper.publishdata).then(res=>{
              
            })
          });
        
         
        
           
        }).timeout(10000)
        
})


after(()=>{
  ws.terminate()
})

})



