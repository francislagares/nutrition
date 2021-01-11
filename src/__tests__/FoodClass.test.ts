import Food from '../FoodClass';
import EmptyFoodNameError from '../errors/EmptyFoodNameError';
import InvalidFoodAmountError from '../errors/InvalidFoodAmountError';

describe('Food Class', () => {
  test('Create new Food instance', () => {
    const baseValues = {
      amount: 100,
      fat: 30,
      carbohydrate: 40,
      protein: 65,
      calories: 124,
    };
    const food = new Food('rice', 'g', baseValues);

    expect(food).toBeDefined();
    expect(food.getName()).toEqual('rice');
    expect(food.getUnit()).toEqual('g');
    expect(food.getBaseValues().amount).toEqual(100);
    expect(food.getBaseValues().fat).toEqual(30);
    expect(food.getBaseValues().carbohydrate).toEqual(40);
    expect(food.getBaseValues().protein).toEqual(65);
    expect(food.getBaseValues().calories).toEqual(124);
    expect(food.getCurrentValues()).toEqual(food.getBaseValues());
  });

  test('Throws error if food is called without name', () => {
    try {
      const baseValues = {
        amount: 100,
        fat: 30,
        carbohydrate: 40,
        protein: 65,
        calories: 124,
      };
      const food = new Food('', 'g', baseValues);

      expect(food).toThrowError(EmptyFoodNameError);
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyFoodNameError);
    }
  });

  test('Throws error when food is called with zero amount', () => {
    try {
      const baseValues = {
        amount: 0,
        fat: 30,
        carbohydrate: 40,
        protein: 65,
        calories: 124,
      };
      const food = new Food('rice', 'g', baseValues);

      expect(food).toThrowError(InvalidFoodAmountError);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFoodAmountError);
      expect(error).toHaveProperty(
        'message',
        `Invalid amount 0. It must be a positive number.`
      );
    }
  });
});
