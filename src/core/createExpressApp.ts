import express, { Express } from 'express'
import { rootControllerMap } from '../decorator/annotation/controllerContainer'
import { mapRoute } from './mapRoute'

/**
 * 
 * @param options 创建一个express应用
 */
export const createExpressApp = (options: { cors: boolean;[key: string]: any }) => {
    const app: Express = express()
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    //配置跨域
    if(options.cors){
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
            res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
            next()
        })
    }

    rootControllerMap.getController().forEach(controllerTag => {
        console.log('路由信息收集', mapRoute(controllerTag.prototype))
        mapRoute(controllerTag.prototype).forEach(item => {
            app[item.method](item.route, (req: Express.Request, res: any) => {
                //收集参数
                const params: any[] = item.params.map(paramObject => {
                    return paramObject.param === '*' ? req[paramObject.paramPosition] : paramObject.paramType(req[paramObject.paramPosition][paramObject.param])
                })
                res.send(item.fn(...params))
            })
        })
    })

    return app
}