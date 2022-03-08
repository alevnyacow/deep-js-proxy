export const isRecord = (target: unknown): target is Record<string, any> => {
    return typeof target === "object" && target !== null;
};
