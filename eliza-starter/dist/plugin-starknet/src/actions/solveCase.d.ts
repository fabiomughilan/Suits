import { type Action } from "@elizaos/core";
import { DeployData } from "@unruggable_starknet/core";
export declare function convertToDeployData(content: any): DeployData | null;
export declare function isDeployTokenContent(content: DeployData): content is DeployData;
export declare const solveCase: Action;
