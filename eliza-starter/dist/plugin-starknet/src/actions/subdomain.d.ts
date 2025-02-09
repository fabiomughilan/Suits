import { type Action, Content } from "@elizaos/core";
export interface SubdomainCreationContent extends Content {
    recipient: string;
    subdomain: string;
}
export declare function isSubdomainCreation(content: SubdomainCreationContent): content is SubdomainCreationContent;
declare const _default: Action;
export default _default;
