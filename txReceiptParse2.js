import caver, { getTokenURI } from "./klaytn-util.js";
import { KIP7_EVENT_TRANSFER_SIGNATURE } from "./types.js";

async function decodeKip7TransferLogs(txHash) {
  try {
    // const receipt = await caver.rpc.klay.getTransactionReceipt(txHash);
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
          // const tokenId = caver.abi.decodeParameter("uint256", topics[3]);
          // const tokenURI = await getTokenURI(contract, tokenId);
          return {
            contract,
            from,
            to,
            // tokenId,
            // tokenURI,
          };
        }
      }
    }
    return false;
  } catch (error) {
    return error;
  }
}

(async () => {
  const TX_HASH = '0xaac8ea713cfa90056f59c7d56f012e67e6be07a6f21a2ca61f3ef92903502c15';
  // const TX_HASH = '0x218eee604cf2559c62fabbb3d6ac30d8f44cecc2ab1bdf119cf0bc0a9698f310'; // Deploy
  decodeKip7TransferLogs(TX_HASH);

  /*
  const encodeValue = caver.klay.abi.encodeParameter('uint256', '1000000000');
  console.log(encodeValue);
  const encodeEventSignature = caver.klay.abi.encodeEventSignature({
    name: 'Transfer',
    type: 'event',
    inputs: [{
      type: 'address',
      name: 'from'
    }, {
      type: 'address',
      name: 'to'
    }, {
      type: 'uint256',
      name: 'value'
    }]
  })
  console.log(encodeEventSignature);

  const encodeFunctionCall = caver.klay.abi.encodeFunctionCall({
    name: "safeTransfer",
    type: 'function',
    inputs: [{
      type: 'address',
      name: 'recipient'
    }, {
      type: 'uint256',
      name: 'amount'
    }]
  }, ['0x1e73db1e88bdd80a2615ac076d27f5c7efe1e543', '0x5af3107a4000']);
  console.log(encodeFunctionCall);

  const functionSignature = {
    name: "safeTransfer",
    type: 'function',
    inputs: [{
      type: 'address',
      name: 'recipient'
    }, {
      type: 'uint256',
      name: 'amount'
    }]
  }

  const encodeFunctionSignature = caver.klay.abi.encodeFunctionSignature(functionSignature);
  console.log(encodeFunctionSignature);
  */
})()


/*
  1. KIP 7 관련 이벤트 관련 SQS
  - knx-util { parse }
  - processBlockHandler 
  - listenBlock
  - caver-util
  
  knx-util parse() 에서 결과를 반환 하면 processBlockHandler에서 parse()에서 받은 결과를 
  SNS 에 보내면 SQS 에서 메시지를 가지고 있음 이것을 처리해야한다.
  
 listenBlock 블록이 새로 생성되는 것을 캐치해서 SQS( KLAYTN_BLOCK_PROCESS_QUEUE ) 에 집어 넣는다. caver-util 에서 서비스체인정보를 가져오는것 같습니다.

근데 트랜잭션을 발생 시켰을 때 블록 생성 관련 이벤트가 수집되지는 않는 것 같았습니다.

2. ksc/receipt API 를 보았는데 마지막이 caver.klaytn.getTransaction() 으로 가져 오는 것 이었습니다.
  - 💦 KIP7의 이벤트를 가져오면 가져오면 다른 것도 마찬가지로 KIP 입력 시그니처, from, to 이렇게 밖에 없었습니다.
  - log의  data에 value 값으로 나오는데
  - 대신 receipt의 input 에서 input: "0x423f6cef0000000000000000000000001e73db1e88bdd80a2615ac076d27f5c7efe1e54300000000000000000000000000000000000000000000000000005af3107a4000",
이렇게 있다고 하면 
 맨 처음 
0x423f6cef000000000000000000000000는 0x423f6cef는 functionSignature
중간에  1e73db1e88bdd80a2615ac076d27f5c7efe1e543 는 받는 주소 였고 
00000000000000000000000000000000000000000000000000005af3107a4000의 5af3107a4000는 보내는 수량인거 같아서  5af3107a4000 를 amount로 쓸 수 있는 것인지 여쭤보고싶습니다.
*/