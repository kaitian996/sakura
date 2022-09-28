export const isConstructor = (key: string) => {
    return key === 'constructor'
}
export const isFunction = (key: string) => {
    return typeof key === 'function'
}