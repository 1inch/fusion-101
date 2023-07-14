import {ordersByMaker} from "./get-orders";
import {FusionSDK, PrivateKeyProviderConnector} from "@1inch/fusion-sdk";
import {ethNetworkRPC, network, OneInchRouter, OneInchToken, OneInchTokenAmount, pk, WETH_Token} from "./config/config";
import Web3 from "web3";
import {approveERC20Token} from "./approve";
import {getQuote} from "./get-rate";
import {createOrder, getAddressFromPrivateKey} from "./create-order";
import {PresetEnum} from "@1inch/fusion-sdk/api";


const DO_APPROVE = false;
const DO_SWAP = false;
const DO_QUOTE = false;

async function main() {

    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetworkRPC));

    const blockchainProvider = new PrivateKeyProviderConnector(
        pk,
        web3,
    )

    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: network,
        blockchainProvider
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
        console.log('Starting to create Fusion Order...')
    }

    if (DO_SWAP) {
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


    const orders = await ordersByMaker(sdk, getAddressFromPrivateKey(pk))
    if (orders) {
        console.log('-------------------')
        console.log(JSON.stringify(orders))
        console.log('-------------------')
    }

}

main()