const helper= require('./test-helper');
const { describe } = require('mocha');
var chai= require('chai')
var expect = chai.expect;


describe('testing the transaction queue',function(done){


    describe('test',()=>{
        it('publish the message and poll it', function(done){
             helper.publish(helper.publishQueueData).then(res=>{
                if(res){
                    done()
                }
            }
                
            ).catch(done)
        
           
        }).timeout(10000)
    })

    describe('poll it messages',function(){
        it('poll from queue',(done)=>{
            helper.poll().then(res=>{
                
              
                expect(res.data).to.eql(helper.publishQueueData.messageOb)
                    
                    
                    done();
            }).catch(done)
        })
       
    })
  

})