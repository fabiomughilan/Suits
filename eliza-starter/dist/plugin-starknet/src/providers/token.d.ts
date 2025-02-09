import { Provider } from "@elizaos/core";
import { DexScreenerData, DexScreenerPair, HolderData, ProcessedTokenData, TokenSecurityData, CalculatedBuyAmounts, Prices } from "../types/trustDB.ts";
import { WalletProvider, TokenBalances } from "./portfolioProvider.ts";
import { TokenInfo } from "../types/token.ts";
export declare const PORTFOLIO_TOKENS: {
    BROTHER: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    CASH: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    ETH: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    LORDS: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    STRK: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    USDC: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    USDT: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
    WBTC: {
        address: string;
        coingeckoId: string;
        decimals: number;
    };
};
export declare class TokenProvider {
    private tokenAddress;
    private walletProvider;
    private cache;
    constructor(tokenAddress: string, walletProvider: WalletProvider);
    private fetchWithRetry;
    getTokensInWallet(): Promise<TokenBalances>;
    getTokenFromWallet(tokenSymbol: string): Promise<string>;
    fetchPrices(): Promise<Prices>;
    calculateBuyAmounts(): Promise<CalculatedBuyAmounts>;
    fetchTokenSecurity(): Promise<TokenSecurityData>;
    fetchTokenTradeData(): Promise<TokenInfo>;
    fetchDexScreenerData(): Promise<DexScreenerData>;
    searchDexScreenerData(symbol: string): Promise<DexScreenerPair | null>;
    getHighestLiquidityPair(dexData: DexScreenerData): DexScreenerPair | null;
    analyzeHolderDistribution(_tradeData: TokenInfo): Promise<string>;
    fetchHolderList(): Promise<HolderData[]>;
    filterHighValueHolders(tradeData: TokenInfo): Promise<Array<{
        holderAddress: string;
        balanceUsd: string;
    }>>;
    checkRecentTrades(volume24hUsd: bigint): Promise<boolean>;
    countHighSupplyHolders(securityData: TokenSecurityData): Promise<number>;
    getProcessedTokenData(): Promise<ProcessedTokenData>;
    shouldTradeToken(): Promise<boolean>;
    formatTokenData(data: ProcessedTokenData): string;
    getFormattedTokenReport(): Promise<string>;
}
declare const tokenProvider: Provider;
export { tokenProvider };
