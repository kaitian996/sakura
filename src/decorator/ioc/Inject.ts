import "reflect-metadata"
import { Injector, rootInjector } from "./Injector";

export const Provider = (): ClassDecorator => {
    return target => {
        rootInjector.setProvider(target, target)
    }
}

export const Inject = (): PropertyDecorator => {
    return (target: Object, propertyKey) => {
        // 元数据反射 获取当前装饰的元素的类型
        const propertyType: any = Reflect.getMetadata('design:type', target, propertyKey)
        const injector: Injector = rootInjector
        let providerInsntance = injector.getInstance(propertyType)
        // 维护一个单列
        if (!providerInsntance) {
            const providerClass = injector.getProvider(propertyType)
            providerInsntance = new providerClass();
            injector.setInstance(propertyType, providerInsntance)
        }
        Reflect.defineProperty(target,propertyKey,{
            value:providerInsntance
        })
    }
}