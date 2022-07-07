import Caver from 'caver-js';
import FT from "./json/FT.json" assert { type: "json" };
import axios from 'axios';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

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

/**
 * 
 * @param  { string } contractAddress 
 * @param  { string } functionName 
 * @param { Array<string> } inputDataTypes 
 * @param { Array<string> } inputValues 
 * @param { Array<string> } outputDataTypes 
 * @returns 
 */
async function call(contractAddress, functionName, inputDataTypes, inputValues, outputDataTypes) {
  try {
    const params = JSON.stringify({
      "contractAddress": contractAddress,
      "functionName": functionName,
      "inputDataTypes": inputDataTypes,
      "inputValues": inputValues,
      "outputDataTypes": outputDataTypes,
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

async function invoke(contractAddress, functionName, inputDataTypes, inputValues) {
  try {
    const params = JSON.stringify({
      "contractAddress": contractAddress,
      "functionName": functionName,
      "inputDataTypes": inputDataTypes,
      "inputValues": inputValues
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

    const { data } = await axios(config);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  // const result = await deploy('trsTest', 'TRSTEST');
  // console.log(result);
  // const result = await mint('0x04e5AeB1d42b4a4f97d41D75ACb1b3BC9A0A3A8E', '100000000000000');
  const result = await call(
    '0x04e5AeB1d42b4a4f97d41D75ACb1b3BC9A0A3A8E',
    'totalSupply', 
    [], 
    [], 
    ['uint256']
  );
  console.log('result: ' + JSON.stringify(result));
  console.log(result);
})()

export default {
  deploy,
  call,
  invoke
}