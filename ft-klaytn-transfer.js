import axios from 'axios';

(async () => {

  const BASE_URL = 'https://api.dev.knx.exchange/v1/';
  const url = BASE_URL + `ft/klaytn/transfer`;

  const params = JSON.stringify({
    "contractAddress": "0x32dbcf48cdaa93673a8c642423cb5df4fdf4f469",
    "fromAddress": "0x2FCf7A2bBb08088CcF2e2080c611D3BEC910EbB6",
    "toAddress": "0x2FCf7A2bBb08088CcF2e2080c611D3BEC910EbB6",
    "amount": 1000000000000000000,
    "webhookURL": "https://yourdomain.com/webhook"
  });

  const config = {
    method: 'post',
    url: url,
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Basic NDk2Njg5Q0FCNUQ5RDdEMTpub0QxTTFWdWdsakVOTzRJKitDPQ==',
      'Content-Type': 'application/json'
    },
    // params: params // post인데 params 를 넣기 때문에 에러발생, 필요한 데이터는 data 라고 해서 body 에서 꺼내와야하기 때문
    data: params
  };

  try {
    const { data } = await axios(config);
    console.log(data);
  } catch (error) {
    const { response } = error;
    console.log(response);
  };

})();



