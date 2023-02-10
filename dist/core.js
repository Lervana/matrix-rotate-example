"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateMatrix = exports.DIRECTION = void 0;
const value_rotate_1 = require("./value-rotate");
const validateData = (data) => {
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
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["RIGHT"] = 0] = "RIGHT";
    DIRECTION[DIRECTION["LEFT"] = 1] = "LEFT";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
const rotate = (input, size, center, direction) => {
    const result = Array(size * size).fill(null);
    const rotationMethod = direction === DIRECTION.RIGHT
        ? value_rotate_1.getValueForRotateRight
        : value_rotate_1.getValueForRotateLeft;
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
const rotateMatrix = (id, data, direction = DIRECTION.RIGHT) => {
    if (!id)
        throw Error("Id is required.");
    if (!data)
        throw Error("Matrix initial data is required.");
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
exports.rotateMatrix = rotateMatrix;
