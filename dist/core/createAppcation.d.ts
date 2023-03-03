export declare class sakuraAppcation {
    private port;
    private options;
    constructor(port: number, options?: {
        cors: boolean;
        [key: string]: any;
    });
    private registerApp;
    run(): void;
}
