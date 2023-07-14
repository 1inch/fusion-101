import {NetworkEnum} from "@1inch/fusion-sdk";

export const pk = process.env.PK || '';
export const ethNetworkRPC = process.env.ETH_NETWORK_RPC || 'https://eth.llamarpc.com';

export const OneInchToken = '0x111111111117dC0aa78b770fA6A738034120C302';
export const WETH_Token = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
export const OneInchRouter = '0x1111111254EEB25477B68fb85Ed929f73A960582';
export const OneInchTokenAmount = '100000000000000000000'; // 100 inch tokens
export const network = NetworkEnum.ETHEREUM;