# klaytn-block-subscribe
 - 
 ```js
 async function test() {
    setInterval(async () => {
        console.log(blockNumber);
    }, "59500");
    
    caver.rpc.klay.subscribe("newBlockHeaders", async (error, event) => {
        if (error) {
          console.log(error);
          return error;
        } else {
          while (true) {
            try {
              const block = await caver.rpc.klay.getBlockByNumber(event.number);
              
              for (const txHash of block.transactions) {
                console.log(txHash);
              }
    
              break;
            } catch (err) {
              console.log(err);
            }
          }
        }
      });
}
 ```