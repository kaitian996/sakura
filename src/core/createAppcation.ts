import { createExpressApp } from './createExpressApp'

export class sakuraAppcation {
    constructor(private port: number, private options: { cors: boolean;[key: string]: any } = { cors: true }) {
        this.port = port
        this.options = options
    }
    private registerApp() {
        return createExpressApp(this.options)
    }

    public run() {
        this.registerApp().listen(this.port, () => {
            console.log('sakuraAppcation is running!')
            console.log(`running at 127.0.0.1:${this.port}`)
        })
    }
}


