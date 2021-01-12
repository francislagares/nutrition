import EmptyFoodNameError from './errors/EmptyFoodNameError';
import InvalidFoodAmountError from './errors/InvalidFoodAmountError';
import Nutritions from './types/Nutritions';
import Units from './types/Units';

export default class Food {
  private currentValues: Nutritions;
  constructor(
    private readonly name: string,
    private readonly unit: Units,
    private readonly baseValues: Nutritions
  ) {
    this.validateFoodName(name);
    this.validateFoodAmount(baseValues.amount);
    this.currentValues = { ...baseValues };
  }

  private validateFoodAmount(amount: number) {
    if (amount <= 0) {
      throw new InvalidFoodAmountError(amount);
    }
  }

  private validateFoodName(name: string) {
    if (!name) {
      throw new EmptyFoodNameError();
    }
  }

  getName(): string {
    return this.name;
  }

  getUnit(): string {
    return this.unit;
  }

  getBaseValues(): Nutritions {
    return this.baseValues;
  }

  getCurrentValues(): Nutritions {
    return this.currentValues;
  }

  changeAmount(amount: number) {
    this.validateFoodAmount(amount);
    this.currentValues.amount = amount;
    this.calculateNutrients(['calories', 'fat', 'carbohydrate', 'protein']);
  }

  private calculateNutrients(nutrients: string[]) {
    nutrients.map((nutrient) => {
      this.currentValues[nutrient] = this.calculateNutritionFromAmount(
        nutrient
      );
    });
  }

  calculateNutritionFromAmount(nutrition: string) {
    return Math.ceil(
      (this.currentValues.amount * this.baseValues[nutrition]) /
        this.baseValues.amount
    );
  }
}
