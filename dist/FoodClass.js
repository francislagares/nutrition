"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmptyFoodNameError_1 = __importDefault(require("./errors/EmptyFoodNameError"));
const InvalidFoodAmountError_1 = __importDefault(require("./errors/InvalidFoodAmountError"));
class Food {
    constructor(name, unit, baseValues) {
        this.name = name;
        this.unit = unit;
        this.baseValues = baseValues;
        this.validateFoodName(name);
        this.validateFoodAmount(baseValues.amount);
        this.currentValues = { ...baseValues };
    }
    validateFoodAmount(amount) {
        if (amount <= 0) {
            throw new InvalidFoodAmountError_1.default(amount);
        }
    }
    validateFoodName(name) {
        if (!name) {
            throw new EmptyFoodNameError_1.default();
        }
    }
    getName() {
        return this.name;
    }
    getUnit() {
        return this.unit;
    }
    getBaseValues() {
        return this.baseValues;
    }
    getCurrentValues() {
        return this.currentValues;
    }
    changeAmount(amount) {
        this.validateFoodAmount(amount);
        this.currentValues.amount = amount;
        this.calculateNutrients(['calories', 'fat', 'carbohydrate', 'protein']);
    }
    changeCalories(calories) {
        this.currentValues.calories = calories;
        this.currentValues.amount = this.calculateAmountFromNutrition('calories');
        this.calculateNutrients(['fat', 'carbohydrate', 'protein']);
    }
    changeFat(fat) {
        this.currentValues.fat = fat;
        this.currentValues.amount = this.calculateAmountFromNutrition('fat');
        this.calculateNutrients(['calories', 'carbohydrate', 'protein']);
    }
    changeProtein(protein) {
        this.currentValues.protein = protein;
        this.currentValues.amount = this.calculateAmountFromNutrition('protein');
        this.calculateNutrients(['calories', 'carbohydrate', 'fat']);
    }
    changeCarbohydrate(carbohydrate) {
        this.currentValues.carbohydrate = carbohydrate;
        this.currentValues.amount = this.calculateAmountFromNutrition('carbohydrate');
        this.calculateNutrients(['calories', 'protein', 'fat']);
    }
    calculateAmountFromNutrition(nutrition) {
        return Math.ceil((this.currentValues[nutrition] * this.baseValues.amount) /
            this.baseValues[nutrition]);
    }
    calculateNutrients(nutrients) {
        nutrients.map((nutrient) => {
            this.currentValues[nutrient] = this.calculateNutritionFromAmount(nutrient);
        });
    }
    calculateNutritionFromAmount(nutrition) {
        return Math.ceil((this.currentValues.amount * this.baseValues[nutrition]) /
            this.baseValues.amount);
    }
}
exports.default = Food;
