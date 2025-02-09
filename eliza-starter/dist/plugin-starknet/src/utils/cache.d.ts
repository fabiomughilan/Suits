export declare class Cache {
    private cache;
    cacheDir: string;
    constructor();
    private readCacheFromFile;
    private writeCacheToFile;
    get<T>(cacheKey: string): T | undefined;
    set<T>(cacheKey: string, data: T): void;
    getCachedData<T>(cacheKey: string): T | null;
    setCachedData<T>(cacheKey: string, data: T): void;
}
