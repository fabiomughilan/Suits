import { IAgentRuntime, Provider } from "@elizaos/core";
type CoingeckoPrices = {
    [cryptoName: string]: {
        usd: number;
    };
};
type TokenBalances = {
    [tokenAddress: string]: bigint;
};
export declare class WalletProvider {
    private runtime;
    constructor(runtime: IAgentRuntime);
    getWalletPortfolio(): Promise<TokenBalances>;
    getTokenUsdValues(): Promise<CoingeckoPrices>;
}
declare const walletProvider: Provider;
export { walletProvider, TokenBalances };
