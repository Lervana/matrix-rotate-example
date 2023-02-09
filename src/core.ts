const validateData = (data: number[]) => {
  if (data.length === 0)
    return {
      isValid: false,
      center: undefined,
    };

  const size = Math.sqrt(data.length);
  const center = (size + 1) / 2 - 1;

  return {
    isValid: Number.isInteger(size),
    size,
    center,
  };
};

type TRotationParams = {
  x: number;
  y: number;
  size: number;
  center: number;
  input: number[][];
};

const getValueForRotateLeft = ({
  x,
  y,
  size,
  center,
  input,
}: TRotationParams) => {
  // Check if x,y are in expected quarter
  if (x === y && y === center && size % 2 === 1) return input[x][y];

  if (x <= center && y >= x && y < size - 1) return input[x][y + 1];
  if (x > center && x >= y && y >= size - x) return input[x][y - 1];
  if (y > center) return input[x + 1][y];
  return input[x - 1][y];
};

const getValueForRotateRight = ({
  x,
  y,
  size,
  center,
  input,
}: TRotationParams) => {
  // Check if x,y are in expected quarter
  if (x === y && y === center && size % 2 === 1) return input[x][y];
  if (y <= center && x >= y && x < size - 1 - y) return input[x + 1][y];
  if (y > center && y >= x && x >= size - y) return input[x - 1][y];
  if (x > center) return input[x][y + 1];
  return input[x][y - 1];
};

const rotate = (
  data: number[],
  size: number,
  center: number,
  direction: "right" | "left" = "right"
) => {
  const result: (number | null)[][] = Array.from(
    { length: size },
    (): (number | null)[] =>
      Array.from({ length: size }, (): number | null => null)
  );

  // delete >
  const tmpInput: number[][] = [];

  for (let i = 0; i < data.length; i += size) {
    tmpInput.push(data.slice(i, i + size));
  }

  // > delete

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      result[x][y] = (
        direction === "right" ? getValueForRotateRight : getValueForRotateLeft
      )({
        x,
        y,
        size,
        center,
        input: tmpInput,
      });
    }
  }

  console.table(result);

  return result;
};

export const rotateMatrix = (id: number, data: number[]) => {
  if (!id) throw new Error("Id is required.");
  if (!data) throw new Error("Matrix initial data is required.");

  const { isValid, size, center } = validateData(data);

  if (!isValid) {
    return {
      id,
      data: [],
      is_valid: false,
    };
  }

  const result = { id, is_valid: true };

  if (data.length === 1) return { ...result, data };

  rotate(data, size, center);
  rotate(data, size, center, "left");

  // return { ...result, data: rotate(data, size, center) };
};
