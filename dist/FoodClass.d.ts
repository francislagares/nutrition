import Nutritions from './types/Nutritions';
import Units from './types/Units';
export default class Food {
    private readonly name;
    private readonly unit;
    private readonly baseValues;
    private currentValues;
    constructor(name: string, unit: Units, baseValues: Nutritions);
    private validateFoodAmount;
    private validateFoodName;
    getName(): string;
    getUnit(): string;
    getBaseValues(): Nutritions;
    getCurrentValues(): Nutritions;
    changeAmount(amount: number): void;
    changeCalories(calories: number): void;
    changeFat(fat: number): void;
    changeProtein(protein: number): void;
    changeCarbohydrate(carbohydrate: number): void;
    private calculateAmountFromNutrition;
    private calculateNutrients;
    calculateNutritionFromAmount(nutrition: string): number;
}
