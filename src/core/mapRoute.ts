import "reflect-metadata"
import { metaDataKey } from '../decorator/annotation/index'
import { isConstructor, isFunction } from '../utils'

/**
 * 
 * @param prototype 原型对象
 * @returns 
 */
export const mapRoute = (prototype: Object) => {
    const constructor = prototype.constructor
    const rootPath: string = Reflect.getMetadata(metaDataKey.isController, constructor)
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
        .filter(item => !isConstructor(item) && isFunction(prototype[item]))
    return methodsNames.map(methodName => {
        const fn = prototype[methodName]

        // 取出定义的 metadata
        const route: string = Reflect.getMetadata(metaDataKey.isPath, fn)
        const method: string = Reflect.getMetadata(metaDataKey.isMethod, fn)
        const params: { param: string; paramType: Function; paramPosition: string }[] = Reflect.getMetadata(metaDataKey.isParam, prototype, methodName)
        return {
            route: rootPath + route,
            method,
            fn: fn.bind(prototype),
            params,
            methodName
        }
    })
}