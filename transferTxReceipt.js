import caver, { getTokenURI } from "./klaytn-util.js";
import { KIP7_EVENT_TRANSFER_SIGNATURE } from "./types.js";
import axios from 'axios';

async function decodeKip7TransferLogs(txHash) {
  try {
    const receipt = await caver.klay.getTransactionReceipt(txHash);
    console.log(receipt);

    // if (receipt.status === "0x1" && receipt.logs.length !== 0) {
    if (receipt.status === true && receipt.logs.length !== 0) {
      for (const log of receipt.logs) {
        const { topics } = log;
        const contract = log.address;
        console.log(topics);
        if (
          topics[0] === KIP7_EVENT_TRANSFER_SIGNATURE &&
          topics.length === 4
        ) {
          console.log("=================================================");
          console.log(log);
          console.log("=================================================");
          const from = caver.abi.decodeParameter("address", topics[1]);
          const to = caver.abi.decodeParameter("address", topics[2]);
          return {
            contract,
            from,
            to,
          };
        }
      }
    }
    return false;
  } catch (error) {
    return error;
  }
}

const BASE_URL = 'https://kip7-api.klaytnapi.com/v1/';
async function transferKas(params) {
  try {
    const URL = BASE_URL + `contract/${params.contractAddress}/transfer`;

    const config = {
      method: 'post',
      url: URL,
      headers: {
        'x-chain-id': '1001',
        'Authorization': 'Basic S0FTS0NGVTdUVTdLTkxUUjhKVFZQMVBDOnh6UWpkUE9zMWpWazBnd2FRNVBPc0lBcWoxREhxM3U4M25Qd0xNWXE=',
        'Content-Type': 'application/json'
      },
      data: params
    };

    const { data } = await axios(config);
    return data;
  } catch (err) {
    // const { response } = err;
    // console.log(response);
    // const error = new Error(response.data.message);
    // error['status'] = response.status;
    // throw error;
    console.error(err);
  };
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  const params = {
    contractAddress: "0x60ac85045bbdee9eb71df988b01d0b1f219660a5",
    from: "0x8bbb55cabe555f2032e0e46e7f35e6253c601020",
    to: "0xb20786792F1513c76d3eDD995ecdb1242e4Db90f",
    amount: "0x2540be400"
  }

  const result = await transferKas(params);
  console.log(result);

  let txData;
  let cnt = 0;
  while (true) {
    txData = await caver.rpc.klay.getTransactionReceipt(result.transactionHash)
    await sleep(2000);
    if (txData !== null) {
      break;
    }
    cnt++;
  }
  console.log('txData:', txData);
  console.log('count:', cnt);
  // decodeKip7TransferLogs('0x22564fd915226a6e5e2d5c32048d09d6bd2f5fc6cae9b73e75f422c9ee994453');
})()
