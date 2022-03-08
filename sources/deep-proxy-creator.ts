import { isRecord } from "./utils/type-guards";
import { objectMark } from "./utils/object-mark";

const spreadProxyRecursively = <T extends object>(
    target: T,
    handler: ProxyHandler<object>
) => {
    (Object.keys(target) as Array<keyof T>).forEach((key) => {
        const node = target[key];
        if (isRecord(node)) {
            if (!objectMark.placed(node)) {
                target[key] = new Proxy(target[key] as any, handler) as any;
                objectMark.place(node);
            }
            spreadProxyRecursively(target[key] as any, handler);
        }
    });
};

export const deepProxyCreator = (handler: ProxyHandler<object>) => {
    return function <T extends object>(target: T) {
        if (isRecord(target)) {
            const resultingProxy = new Proxy<T>(target, handler);
            spreadProxyRecursively(resultingProxy, handler);
            return resultingProxy;
        }
    };
};
