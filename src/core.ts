const validateData = (data: (number | string)[]) => {
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
  input: (number | string)[];
};

type TDirection = "right" | "left";

const countIndex = (x: number, y: number, size: number) => size * y + x;

const getValueForRotateRight = ({
  x,
  y,
  size,
  center,
  input,
}: TRotationParams): string | number => {
  // Check if x,y are in expected quarter
  if (x === y && y === center && size % 2 === 1) {
    return input[countIndex(x, y, size)];
  }

  if (x <= center && y >= x && y < size - 1) {
    return input[countIndex(x, y + 1, size)];
  }

  if (x > center && x >= y && y >= size - x) {
    return input[countIndex(x, y - 1, size)];
  }

  if (y > center) {
    return input[countIndex(x + 1, y, size)];
  }

  return input[countIndex(x - 1, y, size)];
};

const getValueForRotateLeft = ({
  x,
  y,
  size,
  center,
  input,
}: TRotationParams): string | number => {
  // Check if x,y are in expected quarter
  if (x === y && y === center && size % 2 === 1) {
    return input[countIndex(x, y, size)];
  }

  if (y <= center && x >= y && x < size - 1 - y) {
    return input[countIndex(x + 1, y, size)];
  }

  if (y > center && y >= x && x >= size - y) {
    return input[countIndex(x - 1, y, size)];
  }

  if (x > center) {
    return input[countIndex(x, y + 1, size)];
  }

  return input[countIndex(x, y - 1, size)];
};

const rotate = (
  input: (number | string)[],
  size: number,
  center: number,
  direction: TDirection
) => {
  const result: (number | null | string)[] = Array(size * size).fill(null);
  const rotationMethod =
    direction === "right" ? getValueForRotateRight : getValueForRotateLeft;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      result[size * y + x] = rotationMethod({
        x,
        y,
        size,
        center,
        input,
      });
    }
  }

  return result;
};

export const rotateMatrix = (
  id: string,
  data: (number | string)[],
  direction: TDirection = "right"
): {
  id: string;
  json: string;
  is_valid: boolean;
} => {
  if (!id) throw Error("Id is required.");
  if (!data) throw Error("Matrix initial data is required.");

  const result = {
    id,
    json: JSON.stringify([]),
    is_valid: true,
  };

  const { isValid, size, center } = validateData(data);

  if (!isValid) {
    return {
      ...result,
      is_valid: false,
    };
  }

  if (data.length === 1) {
    return { ...result, json: JSON.stringify(data) };
  }

  return {
    ...result,
    json: JSON.stringify(rotate(data, size, center, direction)),
  };
};
