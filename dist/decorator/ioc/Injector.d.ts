export declare class Injector {
    private readonly providerMap;
    private readonly instanceMap;
    setProvider(key: any, value: any): void;
    getProvider(key: any): any;
    setInstance(key: any, value: any): void;
    getInstance(key: any): any;
}
export declare const rootInjector: Injector;
