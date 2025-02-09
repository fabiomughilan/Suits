import { Plugin } from "@elizaos/core";
export declare const PROVIDER_CONFIG: {
    AVNU_API: string;
    MAX_RETRIES: number;
    RETRY_DELAY: number;
    TOKEN_ADDRESSES: {
        BTC: string;
        ETH: string;
        STRK: string;
    };
    TOKEN_SECURITY_ENDPOINT: string;
    TOKEN_TRADE_DATA_ENDPOINT: string;
    DEX_SCREENER_API: string;
    MAIN_WALLET: string;
};
export declare const starknetPlugin: Plugin;
export default starknetPlugin;
