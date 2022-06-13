import caver, { caverSocket } from "./klaytn-util.js";

const kip7 = new caver.kct.kip7('0x60ac85045bbdee9eb71df988b01d0b1f219660a5');

const address = '0x1E73Db1e88bdd80a2615AC076d27f5C7eFe1e543';

(async () => {
    const result = await kip7.balanceOf(address);
    console.log(result);
})();
