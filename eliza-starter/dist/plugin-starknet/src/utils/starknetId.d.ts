import { Account } from "starknet";
export declare const isStarkDomain: (domain: string) => boolean;
export declare const getAddressFromName: (account: Account, name: string) => Promise<string>;
export declare const getTransferSubdomainCall: (account: string, domain: string, recipient: string) => {
    contractAddress: string;
    entrypoint: string;
    calldata: (string | number)[];
}[];
