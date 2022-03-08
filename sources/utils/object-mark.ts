import { v4 } from "uuid";

/**
 * Represents an object mark which can be placed and checked if it exists.
 */
class ObjectMark {
    /**
     * Name of field will be used to store a mark.
     */
    private _markerField: string;

    constructor(markerField: string) {
        this._markerField = markerField;
    }

    /**
     * Marks target object. Added mark does not affect object JSON representation.
     */
    place = (target: Record<string, any>) => {
        target[this._markerField] = () => {};
    };

    /**
     * Checks if target object contains a mark.
     */
    placed = (target: Record<string, any>) =>
        typeof target[this._markerField] === "function";
}

const objectMark = new ObjectMark(v4());

export { objectMark };
