import "reflect-metadata"
import {rootControllerMap,ControllerContainer} from "./controllerContainer"
export enum metaDataKey{
    isController='controller',
    isMethod='method',
    isPath='path',
    isConstructor='constructor',
    isParam='param',
}
export const Controller = (path: string): ClassDecorator => {
    return (target) => {
        const controllerMap:ControllerContainer=rootControllerMap
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
const createParameterDecorator = () => (param: string): ParameterDecorator => {
    return (target, propertyKey, parameterIndex) => {
        Reflect.defineMetadata(metaDataKey.isParam,param,target,propertyKey)
    }
}
export const Get=createMappingDecorator('get')
export const Post=createMappingDecorator('post')

export const Query=createParameterDecorator()
