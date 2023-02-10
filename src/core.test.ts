import { rotateMatrix } from "./core";

type TTestCase = {
  id: string;
  input: (string | number)[];
  output_left: (string | number)[];
  output_right: (string | number)[];
  is_valid: boolean;
};

const TEST_CASES: TTestCase[] = [
  {
    id: "1",
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    output_left: [2, 3, 6, 1, 5, 9, 4, 7, 8],
    output_right: [4, 1, 2, 7, 5, 3, 8, 9, 6],
    is_valid: true,
  },
  {
    id: "2",
    input: [40, 20, 90, 10],
    output_left: [20, 10, 40, 90],
    output_right: [90, 40, 10, 20],
    is_valid: true,
  },
  {
    id: "3",
    input: [-5],
    output_left: [-5],
    output_right: [-5],
    is_valid: true,
  },
  {
    id: "9",
    input: [2, -0],
    output_left: [],
    output_right: [],
    is_valid: false,
  },
  {
    id: "5",
    input: [2, -5, -5],
    output_left: [],
    output_right: [],
    is_valid: false,
  },
  {
    id: "8",
    input: [1, 1, 1, 1, 1],
    output_left: [],
    output_right: [],
    is_valid: false,
  },
];

const testRotation = (testCase: TTestCase) => {
  describe(`should ${testCase.is_valid ? "" : "not"} be able to rotate [${
    testCase.input
  }] as given input`, () => {
    test(`to left --> [${testCase.output_left}]`, () => {
      const result = rotateMatrix(testCase.id, testCase.input, "left");

      expect(result).toEqual({
        id: testCase.id,
        is_valid: testCase.is_valid,
        json: JSON.stringify(testCase.output_left),
      });
    });

    test(`to right --> [${testCase.output_right}]`, () => {
      const result = rotateMatrix(testCase.id, testCase.input, "right");

      expect(result).toEqual({
        id: testCase.id,
        is_valid: testCase.is_valid,
        json: JSON.stringify(testCase.output_right),
      });
    });
  });
};

describe("matrix rotation", () => {
  TEST_CASES.forEach((testCase) => testRotation(testCase));

  test(`should throw error when input data is null`, () => {
    const t = () => {
      rotateMatrix("1", null);
    };

    expect(t).toThrowError("Matrix initial data is required.");
  });

  test(`should throw error when input data is undefined`, () => {
    const t = () => {
      rotateMatrix("1", undefined);
    };

    expect(t).toThrowError("Matrix initial data is required.");
  });

  test(`should throw error when id is null`, () => {
    const t = () => {
      rotateMatrix(null, []);
    };

    expect(t).toThrowError("Id is required.");
  });
});
