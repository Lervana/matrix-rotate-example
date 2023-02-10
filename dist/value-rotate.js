"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueForRotateLeft = exports.getValueForRotateRight = void 0;
const countIndex = (x, y, size) => size * y + x;
const getValueForRotateRight = ({ x, y, size, center, input, }) => {
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
exports.getValueForRotateRight = getValueForRotateRight;
const getValueForRotateLeft = ({ x, y, size, center, input, }) => {
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
exports.getValueForRotateLeft = getValueForRotateLeft;
