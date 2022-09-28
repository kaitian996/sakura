import express from 'express'
import "reflect-metadata"
import { rootControllerMap } from '../decorator/annotation/controllerContainer'
import { metaKeyEnum } from './interface'
import { isConstructor, isFunction } from '../utils'

const mapRoute = (prototype: Object) => {
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
        .filter(item => !isConstructor(item) && isFunction(prototype[item]))
    return methodsNames.map(methodName => {
        const fn = prototype[methodName]

        // 取出定义的 metadata
        const route = Reflect.getMetadata(metaKeyEnum.path, fn)
        const method = Reflect.getMetadata(metaKeyEnum.method, fn)
        const query: string = Reflect.getMetadata(metaKeyEnum.param, prototype, methodName)
        return {
            route,
            method,
            fn: fn.bind(prototype),
            query,
            methodName
        }
    })
}

export class sakuraAppcation {
    constructor(private port: number) {
        this.port = port
    }
    private registerApp() {
        const app = express()
        rootControllerMap.getController().forEach(controllerTag => {
            mapRoute(controllerTag.prototype).forEach(item => {
                switch (item.method) {
                    case 'get':
                        app.get(item.route, (req, res) => {
                            const params = req.query
                            res.send(item.fn(params[item.query]))
                        })
                        break
                    case 'post':
                        app.post(item.route, (req, res) => {
                            res.send(item.fn())
                        })
                        break
                    default:
                        app.get(item.route, (req, res) => {
                            res.send(item.fn())
                        })
                        break
                }
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


