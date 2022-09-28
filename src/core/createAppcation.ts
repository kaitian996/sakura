import express, { Express } from 'express'
import "reflect-metadata"
import { rootControllerMap } from '../decorator/annotation/controllerContainer'
import { metaDataKey } from '../decorator/annotation/index'
import { isConstructor, isFunction } from '../utils'

const mapRoute = (prototype: Object) => {
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
        .filter(item => !isConstructor(item) && isFunction(prototype[item]))
    return methodsNames.map(methodName => {
        const fn = prototype[methodName]

        // 取出定义的 metadata
        const route: string = Reflect.getMetadata(metaDataKey.isPath, fn)
        const method: string = Reflect.getMetadata(metaDataKey.isMethod, fn)
        const params: string[] = Reflect.getMetadata(metaDataKey.isParam, prototype, methodName)
        const paramPosition: string = Reflect.getMetadata(metaDataKey.isParamPosition, prototype, methodName)
        return {
            route,
            method,
            fn: fn.bind(prototype),
            paramPosition,
            params,
            methodName
        }
    })
}

export class sakuraAppcation {
    constructor(private port: number) {
        this.port = port
    }
    private registerApp() {
        const app:Express = express()
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        rootControllerMap.getController().forEach(controllerTag => {
            console.log('路由信息收集', mapRoute(controllerTag.prototype))
            mapRoute(controllerTag.prototype).forEach(item => {
                app[item.method](item.route, (req: Express.Request, res: any) => {
                    const paramObject = req[item.paramPosition]
                    const params: any[] = item.params.map(key => paramObject[key])
                    res.send(item.fn(...params))
                })
            })
        })

        return app
    }

    public run() {
        this.registerApp().listen(this.port, () => {
            console.log('sakuraAppcation is running!')
        })
    }
}


