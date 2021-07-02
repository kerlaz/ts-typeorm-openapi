/**
 * Wrap return value of a single method
 */
export const wrap = () => (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = async function (...args: any[]){
        let returnValue = await original(...args);
        return {
            success: true,
            result: returnValue
        }
    }
}
/**
 * Wrap return value of all class methods
 * @param exclude array if method names to ignore
 */
export const WrappedResponse = (exclude: string[] = []) => (target: Function) => {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)){
        // console.log({propertyName})
        if(exclude.includes(propertyName)) continue
        const descriptor = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
        // console.log(descriptor)
        if(!descriptor) continue;
        const isMethod = descriptor.value instanceof Function;
        if(!isMethod) continue;
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]){
            let returnValue = await originalMethod(...args);
            return {
                success: true,
                result: returnValue
            }
        }
        Object.defineProperty(target.prototype, propertyName, descriptor)
    }
}