import {ordersByMaker} from "./get-orders";
import {FusionSDK, PrivateKeyProviderConnector} from "@1inch/fusion-sdk";
import {
    authKey,
    ethNetworkRPC,
    network,
    OneInchRouter,
    OneInchToken,
    OneInchTokenAmount,
    pk,
    WETH_Token
} from "./config/config";
import Web3 from "web3";
import {approveERC20Token} from "./approve";
import {getQuote} from "./get-rate";
import {createOrder, getAddressFromPrivateKey} from "./create-order";
import {PresetEnum} from "@1inch/fusion-sdk/api";


const DO_APPROVE = false;
const DO_SWAP = false;
const DO_QUOTE = true;
const DO_CHECK_ORDERS = false;

async function main() {

    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetworkRPC));

    const blockchainProvider = new PrivateKeyProviderConnector(
        pk,
        // @ts-ignore
        web3,
    )

    const sdk = new FusionSDK({
        url: "https://api.1inch.dev/fusion",
        network: network,
        blockchainProvider,
        authKey: authKey,
    })


    if (DO_APPROVE) {
        const approveResult = await approveERC20Token(web3, OneInchToken, pk, OneInchRouter, OneInchTokenAmount)
        if (approveResult) {
            console.log('-------------------')
            console.log('Approved');
            console.log('-------------------')
        }
    }

    if (DO_QUOTE) {
        const quote = await getQuote(sdk, OneInchToken, WETH_Token, OneInchTokenAmount)
        if (quote) {
            console.log('-------------------')
            console.log(JSON.stringify(quote))
            console.log('-------------------')
        }
    }

    if (DO_SWAP) {
        console.log('Starting to create Fusion Order...')

        const info = await createOrder(sdk,
            OneInchToken,
            WETH_Token,
            OneInchTokenAmount,
            getAddressFromPrivateKey(pk),
            PresetEnum.fast);

        console.log('Finished with Fusion Order...')

        if (info) {
            console.log('-------------------')
            console.log(JSON.stringify(info))
            console.log('-------------------')

        }
    }

   if (DO_CHECK_ORDERS) {
       console.log('Searching for Fusion Orders...')
       const orders = await ordersByMaker(sdk, getAddressFromPrivateKey(pk))
       if (orders) {
           console.log('-------------------')
           console.log(JSON.stringify(orders))
           console.log('-------------------')
       }
   }



}

main()