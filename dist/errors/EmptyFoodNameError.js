"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmptyFoodNameError extends Error {
    constructor(message = 'Empty food name is not allowed') {
        super(message);
    }
}
exports.default = EmptyFoodNameError;
