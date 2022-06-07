import Caver from "caver-js-ext-kas";
import dotenv from "dotenv";

dotenv.config();

const caver = new Caver(process.env.CHAIN_ID,
    process.env.ACCESS_KEY,
    process.env.SECRET_ACCESS_KEY,
    { useNodeAPIWithHttp: false }
);


// const blockNumber = await caver.rpc.klay.getBlockNumber()

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
                console.log(txHash.length);
                //   const txHistory = await caver.klay.getTransaction(txHash);
                // console.log(typeof txHash);
                // const txHistory = await caver.kas.tokenHistory.getTransferHistoryByTxHash(txHash);
                // if ( txHistory ) {
                //   console.log("=======================");
                //   console.log("txHistory");
                //   console.log(txHistory);
                //   console.log("=======================");
                // }
                
              }
    
              break;
            } catch (err) {
              console.log(err);
            }
          }
        }
      });
}

test();

// caver.currentProvider.connection.close()