import "reflect-metadata"
import { rootControllerMap, ControllerContainer } from "./controllerContainer"
export enum metaDataKey {
    isController = 'controller',
    isMethod = 'method',
    isPath = 'path',
    isConstructor = 'constructor',
    isParam = 'param',
    isParamPosition = 'paramPosition'
}
export const Controller = (path: string): ClassDecorator => {
    return (target) => {
        const controllerMap: ControllerContainer = rootControllerMap
        controllerMap.setController(target)
        Reflect.defineMetadata(metaDataKey.isController, path, target);
        Reflect.defineMetadata(metaDataKey.isConstructor, target, target);
    }
}
type httpMethod = 'get' | 'post'
const createMappingDecorator = (method: httpMethod) => (path: string): MethodDecorator => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(metaDataKey.isMethod, method, descriptor.value as any)
        Reflect.defineMetadata(metaDataKey.isPath, path, descriptor.value as any)
    }
}
type paramPosition = 'query' | 'body' | 'headers' | 'cookie' | 'session'
const createParameterDecorator = (paramPosition: paramPosition) => (param: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
        //放参数
        let paramList: string[] = Reflect.getMetadata(metaDataKey.isParam, target, propertyKey) || []
        paramList.push(param)
        Reflect.defineMetadata(metaDataKey.isParam, paramList, target, propertyKey)
        //位置
        Reflect.defineMetadata(metaDataKey.isParamPosition, paramPosition, target, propertyKey)
    }
}
export const Get = createMappingDecorator('get')
export const Post = createMappingDecorator('post')

export const Query = createParameterDecorator('query')
export const Body = createParameterDecorator('body')
export const Headers = createParameterDecorator('headers')
