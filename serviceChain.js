import Caver from 'caver-js';
import FT from "./json/FT.json" assert { type: "json" };
import axios from 'axios';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

/**
 * 
 * @param {string} name 
 * @param {string} symbol 
 */
async function deploy(name, symbol) {
  try {
    const deployInput = await caver.abi.encodeContractDeploy(
      FT.abi,
      FT.bytecode,
      name,
      symbol
    );

    const params = { contractData: '0x' + deployInput };

    const config = {
      method: 'post',
      url: 'https://api.dev.knx.exchange/v1/ksc/deploy',
      headers: {
        'Authorization': 'Basic NDJGREFBQTQ4RUM5MTcyQjpTWW5NekNBQ2xocG0xb3F0WnZKYk5Idll0RTZHZXhXMA==',
        'Content-Type': 'text/plain'
      },
      data: params
    };

    const deployResult = await axios(config);
    console.log(deployResult);
  } catch (error) {
    console.error(error);
  }
}


/*
  amount 양은 decimals를 반영한 값이어야한다.
  peb() 참고 : https://ko.docs.klaytn.foundation/klaytn/design/klaytn-native-coin-klay
             : https://ko.docs.klaytn.foundation/dapp/sdk/caver-js/v1.4.1/api-references/caver.utils_1.4.1#topeb

*/
async function mint(contractAddress, amount) {
  try {
    const params = JSON.stringify({
      "contractAddress": contractAddress,
      "functionName": "mint",
      "inputDataTypes": [
        "uint256"
      ],
      "inputValues": [
        amount
      ]
    });

    const config = {
      method: 'post',
      url: 'https://api.dev.knx.exchange/v1/ksc/invoke',
      headers: {
        'Authorization': 'Basic NDJGREFBQTQ4RUM5MTcyQjpTWW5NekNBQ2xocG0xb3F0WnZKYk5Idll0RTZHZXhXMA==',
        'Content-Type': 'application/json'
      },
      data: params
    };

    const deployResult = await axios(config);
    console.log(deployResult);
  } catch (error) {
    console.error(error);
  }
}


async function decimals(contractAddress) {
  try {
    const params = JSON.stringify({
      "contractAddress": contractAddress,
      "functionName": "decimals",
      "inputDataTypes": [],
      "inputValues": [],
      "outputDataTypes": [
        "uint8"
      ]
    });

    const config = {
      method: 'post',
      url: 'https://api.dev.knx.exchange/v1/ksc/call',
      headers: {
        'Authorization': 'Basic NDJGREFBQTQ4RUM5MTcyQjpTWW5NekNBQ2xocG0xb3F0WnZKYk5Idll0RTZHZXhXMA==',
        'Content-Type': 'application/json'
      },
      data: params
    };

    const { data } = await axios(config);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function parseTxReceipt() {

}

(async () => {
  // const result = await deploy('trsTest', 'TRSTEST');
  // console.log(result);
  // const result = await mint('0x04e5AeB1d42b4a4f97d41D75ACb1b3BC9A0A3A8E', '100000000000000');
  const result = await decimals('0x04e5AeB1d42b4a4f97d41D75ACb1b3BC9A0A3A8E');
  console.log('result: ' + JSON.stringify(result));
  console.log(result);
})()

export default {
  deploy,
  mint,
  decimals
}