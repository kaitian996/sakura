import "reflect-metadata";
/**
 *
 * @param prototype 原型对象
 * @returns
 */
export declare const mapRoute: (prototype: Object) => {
    route: string;
    method: string;
    fn: any;
    params: {
        param: string;
        paramType: Function;
        paramPosition: string;
    }[];
    methodName: string;
}[];
