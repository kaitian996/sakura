export class Injector {
    private readonly providerMap: Map<any, any> = new Map() // 存储class对象
    private readonly instanceMap: Map<any, any> = new Map() // 存储new后的class实列 每一个类型对应一个单例

    public setProvider(key: any, value: any): void {
        if (!this.providerMap.has(key)) this.providerMap.set(key, value)
    }

    public getProvider(key: any): any {
        return this.providerMap.get(key)
    }

    public setInstance(key: any, value: any): void {
        if (!this.instanceMap.has(key)) this.instanceMap.set(key, value)
    }

    public getInstance(key: any): any {
        if (this.instanceMap.has(key)) return this.instanceMap.get(key)
        return null
    }
}

export const rootInjector = new Injector();
