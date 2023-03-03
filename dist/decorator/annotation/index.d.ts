import "reflect-metadata";
export declare enum metaDataKey {
    isController = "controller",
    isMethod = "method",
    isPath = "path",
    isConstructor = "constructor",
    isParam = "param"
}
export declare const Controller: (path: string) => ClassDecorator;
export declare const Get: (path: string) => MethodDecorator;
export declare const Post: (path: string) => MethodDecorator;
export declare const Delete: (path: string) => MethodDecorator;
export declare const Put: (path: string) => MethodDecorator;
export declare const Patch: (path: string) => MethodDecorator;
export declare const Options: (path: string) => MethodDecorator;
export declare const Head: (path: string) => MethodDecorator;
export declare const All: (path: string) => MethodDecorator;
export declare const Query: (param?: string) => ParameterDecorator;
export declare const Body: (param?: string) => ParameterDecorator;
export declare const Headers: (param?: string) => ParameterDecorator;
