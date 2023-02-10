import { getValueForRotateLeft, getValueForRotateRight } from "./value-rotate";

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

export enum DIRECTION {
  RIGHT,
  LEFT,
}

const rotate = (
  input: (number | string)[],
  size: number,
  center: number,
  direction: DIRECTION
) => {
  const result: (number | null | string)[] = Array(size * size).fill(null);
  const rotationMethod =
    direction === DIRECTION.RIGHT
      ? getValueForRotateRight
      : getValueForRotateLeft;

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
  direction: DIRECTION = DIRECTION.RIGHT
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
