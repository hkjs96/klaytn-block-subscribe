import caver, { getTokenURI } from "./klaytn-util.js";

const receipt = {
  success: true,
  response: {
    data: {
      blockHash: "0xe91caf297655c6b92ffcc460693a7ded0399f83222c913fdaeba85422f87d43b",
      blockNumber: 2736496,
      contractAddress: null,
      from: "0xfeacd681b2044e706ae0f7bb971219611c410633",
      gas: "0x2dc6c0",
      gasPrice: "0x0",
      gasUsed: 57602,
      input: "0x423f6cef0000000000000000000000001e73db1e88bdd80a2615ac076d27f5c7efe1e54300000000000000000000000000000000000000000000000000005af3107a4000",
      logs: [
        {
          address: "0x04e5AeB1d42b4a4f97d41D75ACb1b3BC9A0A3A8E",
          topics: [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x000000000000000000000000feacd681b2044e706ae0f7bb971219611c410633",
            "0x0000000000000000000000001e73db1e88bdd80a2615ac076d27f5c7efe1e543"
          ],
          data: "0x00000000000000000000000000000000000000000000000000005af3107a4000",
          blockNumber: 2736496,
          transactionHash: "0x408f73e4701b13e658881ee3e204be13220a1a094b9d4ead5c080ead8cfd5e30",
          transactionIndex: 0,
          blockHash: "0xe91caf297655c6b92ffcc460693a7ded0399f83222c913fdaeba85422f87d43b",
          logIndex: 0,
          id: "log_8f52a759"
        }
      ],
      logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000001000000000000000000000000000000000000000000000000000000000000000000400000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000040000000000000000000100000000002000000000000000000000000000000100000000000000000000000000000000000000000000000000020000000000008000000000000000008000000",
      nonce: "0x1c",
      senderTxHash: "0x408f73e4701b13e658881ee3e204be13220a1a094b9d4ead5c080ead8cfd5e30",
      signatures: [
        {
          V: "0x61ea4",
          R: "0xd11b0942e795c177274e0838687f46bc6641344804ab5def275685a784a9ac0e",
          S: "0x6b8ca1219ed8675dfca9e67b34012d6b1c2023c5332b1babcb1f43f88edbac4f"
        }
      ],
      status: true,
      to: "0x04e5aeb1d42b4a4f97d41d75acb1b3bc9a0a3a8e",
      transactionHash: "0x408f73e4701b13e658881ee3e204be13220a1a094b9d4ead5c080ead8cfd5e30",
      transactionIndex: 0,
      type: "TxTypeSmartContractExecution",
      typeInt: 48,
      value: "0x0"
    }
  },
  error: null
}

async function decodeKip7TransferLogs() {
  try {
    if (receipt.response.data.logs.length !== 0) {
      for (const log of receipt.response.data.logs) {
        const { topics } = log;
        const contract = log.address;
        if (
          topics.length === 3
        ) {
          // console.log("=================================================");
          // console.log(log);
          // console.log("=================================================");

          // const what = caver.abi.decodeParameter("uint256", topics[0]).toString();
          const from = caver.abi.decodeParameter("address", topics[1]); // 보내는 주소
          const to = caver.abi.decodeParameter("address", topics[2]); // 받는 주소 
          // const what = caver.abi.decodeParameter("address", topics[3]); // 받는 주소 

          // const tokenId = caver.abi.decodeParameter("uint256", topics[3]);
          // const tokenURI = await getTokenURI(contract, tokenId);

          
          // const result = caver.abi.decodeLog([{
          //   type: 'unit256',
          //   name: 'value',
          //   indexed: false
          // }, {
          //   type: 'address',
          //   name: 'to',
          //   indexed: true
          // }, {
          //   type: 'address',
          //   name: 'from',
          //   indexed: true
          // }],
          //   '0x00000000000000000000000000000000000000000000000000005af3107a4000',
          //   topics
          // )
          // console.log(result);

          console.log(from);
          console.log(to);
          console.log(topics[0]);
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

(async () => {
  const result = await decodeKip7TransferLogs();
  // console.log(result);



  /*
  // From a JSON interface object
  const result = await caver.abi.encodeEventSignature({
    name: 'transfer',
    type: 'function',
    inputs: [{
        type: 'address',
        name: 'to'
    },{
      type: 'unit256',
      name: 'amount'
    }]
  });
  */
  console.log(result);
  
})();



/*
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
*/