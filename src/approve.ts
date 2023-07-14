import Web3 from 'web3';
import {ERC20_ABI} from "./abi/erc20";

export async function approveERC20Token(
    web3: Web3,
    contractAddress: string,
    privateKey: string,
    spenderAddress: string,
    amount: string,
): Promise<boolean> {
    try {
        const tokenContract = new web3.eth.Contract(ERC20_ABI, contractAddress);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        web3.eth.defaultAccount = account.address;

        // @ts-ignore
        const approvalData = tokenContract.methods.approve(spenderAddress, amount).encodeABI();

        const signedTransaction = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data: approvalData,
                gas: '50000', // Adjust the gas limit as needed
            },
            privateKey
        );

        if (!signedTransaction.rawTransaction) throw new Error('Failed to sign transaction');

        // Send the signed transaction
        const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

        console.log('Transaction successful:', transactionReceipt);
        return true;
    } catch (error) {
        console.error('Failed to approve ERC20 token:', error);
        return false;
    }
}
