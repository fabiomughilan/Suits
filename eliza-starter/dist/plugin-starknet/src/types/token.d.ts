interface QuoteRequest {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount?: bigint;
    buyAmount?: bigint;
    takerAddress?: string;
    size?: number;
    excludeSources?: string[];
    integratorFees?: bigint;
    integratorFeeRecipient?: string;
    integratorName?: string;
}
interface Quote {
    quoteId: string;
    sellTokenAddress: string;
    sellAmount: bigint;
    sellAmountInUsd: number;
    buyTokenAddress: string;
    buyAmount: bigint;
    buyAmountInUsd: number;
    blockNumber?: number;
    chainId: string;
    expiry?: number;
    routes: Route[];
    gasFees: bigint;
    gasFeesInUsd: number;
    avnuFees: bigint;
    avnuFeesInUsd: number;
    avnuFeesBps: bigint;
    integratorFees: bigint;
    integratorFeesInUsd: number;
    integratorFeesBps: bigint;
    priceRatioUsd: number;
    sellTokenPriceInUsd?: number;
    buyTokenPriceInUsd?: number;
    gasless: Gasless;
}
interface Route {
    name: string;
    address: string;
    percent: number;
    sellTokenAddress: string;
    buyTokenAddress: string;
    routes: Route[];
}
export interface Gasless {
    active: boolean;
    gasTokenPrices: {
        tokenAddress: string;
        gasFeesInUsd: number;
        gasFeesInGasToken: bigint;
    }[];
}
export interface TokenInfo {
    name: string;
    symbol: string;
    address: string;
    logoUri: string;
    coingeckoId: string;
    verified: boolean;
    market: {
        currentPrice: number;
        marketCap: number;
        fullyDilutedValuation: number;
        starknetTvl: number;
        priceChange1h: number;
        priceChangePercentage1h: number;
        priceChange24h: number;
        priceChangePercentage24h: number;
        priceChange7d: number;
        priceChangePercentage7d: number;
        marketCapChange24h: number;
        marketCapChangePercentage24h: number;
        starknetVolume24h: number;
        starknetTradingVolume24h: number;
    };
    tags: string[];
}
export type { Quote, QuoteRequest };
