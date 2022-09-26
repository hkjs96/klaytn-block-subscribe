import Caver from 'caver-js';
import dotenv from "dotenv";

dotenv.config();

const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const key = process.env.KLAYTN_WALLET_PRIVATE_KEY;

const kip7Instance = new caver.kct.kip7('0x60ac85045bbdee9eb71df988b01d0b1f219660a5');

const recipient = '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543';

(async() => {
    try {
        // const result =  caver.klay.accounts.getLegacyAccount(key);
        let result = caver.wallet.newKeyring('0xb20786792F1513c76d3eDD995ecdb1242e4Db90f', key)
        console.log(result);
        // result = caver.wallet.add(result);
        // console.log(result);
        const aresult = await kip7Instance.transfer(recipient, 10000000000, { from: result._address })
        console.log(aresult);
        const aresult1 = await kip7Instance.transfer(recipient, 10000000000, { from: result._address })
        console.log(aresult1);
    } catch (err) {
        console.error(err);
    }
})()


