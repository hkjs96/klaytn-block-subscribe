import Caver from "caver-js-ext-kas";
import dotenv from "dotenv";

dotenv.config();

const caverJsExtKas = new Caver(process.env.CHAIN_ID, 
                                process.env.ACCESS_KEY, 
                                process.env.SECRET_ACCESS_KEY,
                                { useNodeAPIWithHttp: false }
                            );

export default caverJsExtKas;