import { AccountInterface, CallData, Calldata, Contract, ProviderInterface } from "starknet";
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};
export declare class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
    constructor(token: string, providerOrAccount?: ProviderInterface | AccountInterface);
    address(): string;
    balanceOf(account: string): Promise<bigint>;
    decimals(): Promise<bigint>;
    approveCall(spender: string, amount: bigint): ApproveCall;
    transferCall(recipient: string, amount: bigint): TransferCall;
}
