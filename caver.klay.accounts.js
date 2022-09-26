import Caver from "caver-js";

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

(async () => {
    const account = await caver.klay.getAccount('0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543');
    console.log(account);

    // const params = {
    //     type: ''
    // }
    // const tx = await caver.klay.sendTransaction()

    // const ac = await caver.klay.accounts.wallet.getAccount('0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543');;
    // console.log(ac);

    // using the event emitter
    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543',
    to:   '0xb20786792F1513c76d3eDD995ecdb1242e4Db90f',
    data: '0xa9059cbb000000000000000000000000b20786792f1513c76d3edd995ecdb1242e4db90f00000000000000000000000000000000000000000000000000000002540be400', // '0x6353586b0000000000000000000000001d389d91886fd0af55f44c56e1240eb6162ddff8',
    gas:  '300000',
    value: caver.utils.toPeb('1', 'KLAY'),
    }, '0xd4b85ff3a99d8861f47e74eaafab0cc25e085ec6dbc3fcc6c0ea4b59f72e6923')
    
    caver.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: '0x10f0eaa52a474f0605afbb8c17bb9189e6ed006c',
    })
    .on('transactionHash', function(hash){
        //
    })
    .on('receipt', function(receipt){
        //
    })
    .on('error', console.error); // 가스 부족 에러(out-of-gas)가 발생한 경우 두 번째 인자는 트랜잭션 영수증입니다.
})()