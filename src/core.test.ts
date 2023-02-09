import { rotateMatrix } from "./core";

type TTestCase = {
  input: {
    id: number;
    data: number[];
  };
  output: {
    id: number;
    data: number[];
    is_valid: boolean;
  };
};

const TEST_CASES: TTestCase[] = [
  // {
  //   input: {
  //     id: 1,
  //     data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   },
  //   output: {
  //     id: 1,
  //     data: [4, 1, 2, 7, 5, 3, 8, 9, 6],
  //     is_valid: true,
  //   },
  // },
  {
    input: {
      id: 2,
      data: [40, 20, 90, 10],
    },
    output: {
      id: 2,
      data: [90, 40, 10, 20],
      is_valid: true,
    },
  },
  {
    input: {
      id: 3,
      data: [-5],
    },
    output: {
      id: 3,
      data: [-5],
      is_valid: true,
    },
  },
  {
    input: {
      id: 9,
      data: [2, -0],
    },
    output: {
      id: 9,
      data: [],
      is_valid: false,
    },
  },
  {
    input: {
      id: 5,
      data: [2, -5, -5],
    },
    output: {
      id: 5,
      data: [],
      is_valid: false,
    },
  },
  {
    input: {
      id: 8,
      data: [1, 1, 1, 1, 1],
    },
    output: {
      id: 8,
      data: [],
      is_valid: false,
    },
  },
];

const testRotation = (testCase: TTestCase) => {
  test(`should ${
    testCase.output.is_valid ? "" : "not"
  } be able to rotate given matrix [${testCase.input.data}] --> [${
    testCase.output.data
  }]`, () => {
    const result = rotateMatrix(testCase.input.id, testCase.input.data);
    expect(result).toEqual(testCase.output);
  });
};

describe("matrix rotation", () => {
  TEST_CASES.forEach((testCase) => testRotation(testCase));
});
