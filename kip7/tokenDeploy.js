import Caver from 'caver-js';

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const tokenInfo = {
    name: 'Zade',
    symbol: 'ZD',
    decimals: 18,
    initialSupply: '100000000000000000000',
}

const deployer = '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543';

// const kip7Instance = new caver.klay.KIP7()

// const recipient = '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543'; // 받을 사람

// const amount = 10;

// const from = '0x8bbb55cabe555f2032e0e46e7f35e6253c601020';
// const from = '0xb20786792F1513c76d3eDD995ecdb1242e4Db90f';

(async() => {
    try {
        // const account = await caver.klay.getAccount(deployer);
        // console.log(account);
        const result = await caver.kct.kip7.deploy(tokenInfo, '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543');
        console.log(result);
    } catch (err) {
        console.error(err);
    }
})()


// caver.kct.kip7.deploy(tokenInfo, deployer)
// .on('error', function(error) { console.error(error) })
// .on('transactionHash', function(transactionHash) { console.log(transactionHash) })
// .on('receipt', function(receipt) {
//     console.log(receipt.contractAddress) // contains the new token contract address
// })
// .then(function(newKIP7Instance) {
//     console.log(newKIP7Instance.options.address) // instance with the new token contract address
// })