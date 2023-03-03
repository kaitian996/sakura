import express from "express";
/**
 *
 * @param options 创建一个express应用
 */
export declare const createExpressApp: (options: {
    [key: string]: any;
    cors: boolean;
}) => express.Express;
