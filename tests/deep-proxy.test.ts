import { deepProxy } from "../sources";

let testCounter: number,
    testObject: Record<string, any>,
    proxiedTestObject: Record<string, any>;

const testDeepProxyCreator = deepProxy([() => testCounter++]);

beforeEach(() => {
    testCounter = 0;
    testObject = { testField: 1 };
    proxiedTestObject = testDeepProxyCreator(testObject);
});

test("Plain object", () => {
    proxiedTestObject["testField"] += 1;

    expect(testCounter).toBe(1);
});

test("Nested object", () => {
    proxiedTestObject["testField_2"] = { test_field: 5 };
    proxiedTestObject["testField_2"]["test_field"] += 1;
    proxiedTestObject["testField_2"]["test_field"] += 1;
    proxiedTestObject["testField_2"] = { test_field: 5 };
    proxiedTestObject["testField_2"]["test_field"] += 1;

    expect(testCounter).toBe(5);
});
