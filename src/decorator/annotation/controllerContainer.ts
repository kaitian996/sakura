export class ControllerContainer {
    private controllerMap: Function[] = []
    
    setController(controller: Function) {
        this.controllerMap.push(controller)
    }
    getController() {
        return this.controllerMap
    }
}

export const rootControllerMap = new ControllerContainer()