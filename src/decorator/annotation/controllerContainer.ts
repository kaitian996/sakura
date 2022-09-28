export class ControllerContainer {
    private controllerMap: Function[] = []
    
    setController(controller: Function) {
        this.controllerMap.push(controller)
    }
    getController() {
        console.log('收集的依赖', this.controllerMap);
        return this.controllerMap
    }
}

export const rootControllerMap = new ControllerContainer()