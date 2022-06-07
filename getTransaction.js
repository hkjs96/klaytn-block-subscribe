import Caver from './caver-js-ext-kas-util.js';
import caver from 'caver-js';

export async function getTransferHistoryByTxHash(txHash) {
  // const result = await Caver.kas.tokenHistory.getTransferHistoryByTxHash('0x3ce27413818f4b85dc2771a605b6c8893191c1bba66835d0a2f54271a9ef70d6');
  const result = await Caver.kas.tokenHistory.getTransferHistoryByTxHash(txHash);
  // for (const tx of result.items) {
  //   if ( tx.transferType == 'ft' ){
  //     console.log(tx);
  //     console.log("값 : " + caver.utils.hexToNumberString(tx.value)/10000000000);
  //   }
  // }
  return result;
}