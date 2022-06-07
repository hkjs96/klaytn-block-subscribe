import caver, { caverSocket } from "./klaytn-util.js";
import { getTransferHistoryByTxHash } from "./getTransaction.js";
import Caver from './caver-js-ext-kas-util.js';

import { sendMessage } from "./mq/send.js";

// const result = await Caver.kas.tokenHistory.getTransferHistoryByTxHash('0x49dd6124596aaef44bb2077850e6f6332ceb335e797644f5e6bd5c72d5d1cdbb');
// console.log(result);
// for (const tx of result.items) {
//   console.log(tx);
// }


export async function getBlock() {
  setInterval(async () => {
    await caver.rpc.klay.getBlockNumber();
  }, "59500");

  caverSocket.rpc.klay.subscribe("newBlockHeaders", async (error, event) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      while (true) {
        try {
          const block = await caver.rpc.klay.getBlockByNumber(event.number);

          for (const txHash of block.transactions) {
            console.log(txHash);
            // const eventsLog = await caver.klay.getTransactionReceipt(txHash);
            // const txHistory = await Caver.kas.tokenHistory.getTransferHistoryByTxHash(txHash);

            sendMessage(txHash);
            const txHistory = await caver.klay.getTransaction(txHash);

            if (eventsLog) {
              console.log(eventsLog);
            }
            if ( txHistory ) {
              console.log("=======================");
              console.log(txHistory);
              console.log("=======================");
            }
          }

          break;
        } catch (err) {
          console.log(err);
        }
      }
    }
  });
}