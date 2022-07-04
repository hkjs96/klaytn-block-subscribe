import caver from "./klaytn-util.js";
import FT from "./json/FT.json" assert { type: "json" };

function getDeployContractInput() {
  return caver.abi.encodeContractDeploy(
    FT.abi,
    FT.bytecode,
    'trsTest', 'TRSTEST'
  );
}

const deployInput = getDeployContractInput();

console.log(deployInput);