import { v4 } from "uuid";
import { deepProxyCreator } from "./deep-proxy-creator";
import { isRecord } from "./utils/type-guards";

export const deepProxy = (handlers: Array<(id: string) => void>, id = v4()) => {
    const handler = (id: string): ProxyHandler<object> => ({
        set: (target, prop, value) => {
            (target as any)[prop] = isRecord(value)
                ? deepProxyCreator(handler(id))(value)
                : value;
            handlers.forEach((handler) => handler(id));
            return true;
        }
    });

    return <T extends object>(target: T) =>
        deepProxyCreator(handler(id))(target) as T;
};
