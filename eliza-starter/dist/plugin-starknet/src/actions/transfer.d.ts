import { type Action, Content } from "@elizaos/core";
export interface TransferContent extends Content {
    tokenAddress: string;
    recipient?: string;
    starkName?: string;
    amount: string | number;
}
export declare function isTransferContent(content: TransferContent): content is TransferContent;
declare const _default: Action;
export default _default;
