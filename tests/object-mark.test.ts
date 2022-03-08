import { objectMark } from "../sources/utils/object-mark";

const markedObject = {};
const unmarkedObject = {};

beforeAll(() => {
    objectMark.place(markedObject);
});

test("Marks placement", () => {
    expect(objectMark.placed(markedObject)).toBe(true);
    expect(objectMark.placed(unmarkedObject)).toBe(false);
});

test("JSON representation equality", () => {
    const markedObjectJSON = JSON.stringify(markedObject);
    const unmarkedObjectJSON = JSON.stringify(unmarkedObject);
    expect(markedObjectJSON).toEqual(unmarkedObjectJSON);
});
