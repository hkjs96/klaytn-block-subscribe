import Caver from 'caver-js';
import dotenv from "dotenv";

dotenv.config();

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

// const caver = new Caver(
//     process.env.CHAIN_ID,
//     process.env.ACCESS_KEY,
//     process.env.SECRET_ACCESS_KEY
// );

const kip7Instance = new caver.kct.kip7('0x60ac85045bbdee9eb71df988b01d0b1f219660a5')


// kip7Instance.approve(
//     '0xb20786792F1513c76d3eDD995ecdb1242e4Db90f',
//     10, 
//     '0x8bbb55cabe555f2032e0e46e7f35e6253c601020'
// )

const recipient = '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543'; // 받을 사람
const sender = '0xb20786792F1513c76d3eDD995ecdb1242e4Db90f'; // 대리 보내는 사람

const amount = 10;

// const from = '0x8bbb55cabe555f2032e0e46e7f35e6253c601020';
const from = '0xb20786792F1513c76d3eDD995ecdb1242e4Db90f';

(async() => {
    try {
        // const result = await kip7Instance.transfer(recipient, amount, { from: from })
        let result = await kip7Instance.isMinter('0x8bbb55cabe555f2032e0e46e7f35e6253c601020')
        console.log(result);
        result = await kip7Instance.balanceOf('0x8bbb55cabe555f2032e0e46e7f35e6253c601020')
        console.log(result);
        result = await kip7Instance.allowance('0xb20786792F1513c76d3eDD995ecdb1242e4Db90f', '0x8bbb55cabe555f2032e0e46e7f35e6253c601020');
        console.log(result);
        // result = await kip7Instance.approve('0xb20786792F1513c76d3eDD995ecdb1242e4Db90f', 10, { from: '0x8bbb55cabe555f2032e0e46e7f35e6253c601020' })
        // console.log(result);
        // result = await kip7Instance.allowance('0xb20786792F1513c76d3eDD995ecdb1242e4Db90f', '0x8bbb55cabe555f2032e0e46e7f35e6253c601020');
        // console.log(result);
        
        result = await kip7Instance.transferFrom(sender, recipient, 1, {from: '0x8bbb55cabe555f2032e0e46e7f35e6253c601020'});
        console.log(result);
    } catch (err) {
        console.error(err);
    }
    
})()
