import Caver from 'caver-js';
import axios from 'axios';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

(async () => {

  const url = 'https://kip7-api.klaytnapi.com/v1/contract';
  let initial = '10000';
  const decimals = 18;

  initial = initial.padEnd(initial.length + decimals, '0');
  console.log(initial);
  const initialSupply = await caver.utils.toHex(initial);
  console.log(initialSupply);

  const convertInitialSupply = await caver.utils.hexToNumberString(initialSupply);
  console.log(convertInitialSupply);
  
  const convertInitial = convertInitialSupply.substring(0, convertInitialSupply.length - decimals);
  console.log(convertInitial);

  /*
  const config = {
    method: 'post',
    url: url,
    headers: {
      'x-chain-id': '1001',
      'Authorization': 'Basic S0FTS0NGVTdUVTdLTkxUUjhKVFZQMVBDOnh6UWpkUE9zMWpWazBnd2FRNVBPc0lBcWoxREhxM3U4M25Qd0xNWXE='
    },
    data: {
      alias: 'trs2',
      name: 'Trs2',
      symbol: 'TRS2',
      decimals: decimals,
      initialSupply: initialSupply
    }
  };
  
  axios(config)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  */

  // const retrieveURL = 'https://kip7-api.klaytnapi.com/v1/contract/${config.data.alias}';
  const retrieveURL = 'https://kip7-api.klaytnapi.com/v1/contract/trs2';

  const config = {
    method: 'get',
    url: retrieveURL,
    headers: {
      'x-chain-id': '1001',
      'Authorization': 'Basic S0FTS0NGVTdUVTdLTkxUUjhKVFZQMVBDOnh6UWpkUE9zMWpWazBnd2FRNVBPc0lBcWoxREhxM3U4M25Qd0xNWXE='
    },
  };
  
  try {
    const { data } = await axios(config);
    console.log(data);
  } catch(error) {
    console.log(error);
  };

  /*
  const address = '0xA3c882daF33a2bcCf854184777cDBCaa9C061C0E'
  const check = await caver.rpc.klay.accountCreated(address)
  console.log(check);

  if (check) {
    const params = { // 입력 받아야되는 param object 생성
      name: 'Trs',
      symbol: 'TRS',
      decimals: 18,
      initialSupply: 10000,
      // deployer: address
    };

    const tokenInfo = {
      name: params.name,
      symbol: params.symbol,
      decimals: params.decimals,
      initialSupply: params.initialSupply,
    }
    // const deployer = params.deployer

    const KIPInstance = await caver.kct.kip7.deploy(tokenInfo);

    console.log(KIPInstance);
  }
  */
})();
