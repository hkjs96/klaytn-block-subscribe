# klaytn-block-subscribe
 - caver.rpc.klay.subscribe() : 소켓 연동 하는방법
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

 - MessageQueue 사용해보기

 - transaction 내역 `const result = items.filter(item => item.rasaction.timestamp)` 로 필터링