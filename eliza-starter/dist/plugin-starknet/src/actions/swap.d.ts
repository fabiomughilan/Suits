import { Action } from "@elizaos/core";
interface SwapContent {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount: string;
}
export declare function isSwapContent(content: SwapContent): content is SwapContent;
export declare const executeSwap: Action;
export {};
