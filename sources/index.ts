import { v4 } from "uuid";
import { deepProxyCreator } from "./deep-proxy-creator";

export const deepProxy = (handlers: Array<(id: string) => void>, id = v4()) => {
    const handler = (id: string): ProxyHandler<object> => ({
        set: (target, prop, value) => {
            const proxiedValue = deepProxyCreator(handler(id))(value);
            (target as any)[prop] = proxiedValue;
            handlers.forEach((handler) => handler(id));
            return true;
        }
    });

    return <T extends object>(target: T) =>
        deepProxyCreator(handler(id))(target) as T;
};
