import Food from '../FoodClass';
import EmptyFoodNameError from '../errors/EmptyFoodNameError';
import InvalidFoodAmountError from '../errors/InvalidFoodAmountError';
import Units from '../types/Units';

describe('Food Class', () => {
  test('Create new Food instance', () => {
    const baseValues = {
      amount: 100,
      fat: 30,
      carbohydrate: 40,
      protein: 65,
      calories: 124,
    };
    const food = new Food('rice', Units.GRAM, baseValues);

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
      const food = new Food('', Units.GRAM, baseValues);

      expect(food).toThrowError(EmptyFoodNameError);
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyFoodNameError);
      expect(error).toHaveProperty('message', 'Empty food name is not allowed');
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
      const food = new Food('rice', Units.GRAM, baseValues);

      expect(food).toThrowError(InvalidFoodAmountError);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFoodAmountError);
      expect(error).toHaveProperty(
        'message',
        'Invalid amount 0. It must be a positive number.'
      );
    }
  });

  test('Create food and change amount', () => {
    const baseValues = {
      amount: 100,
      fat: 30,
      carbohydrate: 40,
      protein: 65,
      calories: 124,
    };
    const food = new Food('rice', Units.GRAM, baseValues);
    food.changeAmount(23);

    expect(food.getCurrentValues().amount).toEqual(23);
  });

  test('Throws error if change amount with negative number', () => {
    try {
      const baseValues = {
        amount: 100,
        fat: 30,
        carbohydrate: 40,
        protein: 65,
        calories: 124,
      };
      const food = new Food('rice', Units.GRAM, baseValues);

      expect(food.changeAmount(-23)).toThrowError(InvalidFoodAmountError);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFoodAmountError);
      expect(error).toHaveProperty(
        'message',
        'Invalid amount -23. It must be a positive number.'
      );
    }
  });

  test('Create new food, change amount and calculate current values', () => {
    const baseValues = {
      amount: 100,
      fat: 30,
      carbohydrate: 40,
      protein: 65,
      calories: 124,
    };
    const food = new Food('rice', Units.GRAM, baseValues);
    food.changeAmount(87);

    expect(food.getCurrentValues().calories).toEqual(108);
    expect(food.getCurrentValues().fat).toEqual(27);
    expect(food.getCurrentValues().carbohydrate).toEqual(35);
    expect(food.getCurrentValues().protein).toEqual(57);
  });

  describe('Create food and change values', () => {
    let food: Food;

    beforeEach(() => {
      const baseValues = {
        amount: 100,
        fat: 4,
        carbohydrate: 450,
        protein: 1,
        calories: 130,
      };
      food = new Food('rice', Units.GRAM, baseValues);
    });

    test('Change calories and calculate current values', () => {
      food.changeCalories(211);

      const {
        calories,
        amount,
        fat,
        carbohydrate,
        protein,
      } = food.getCurrentValues();

      expect(calories).toEqual(211);
      expect(amount).toEqual(163);
      expect(fat).toEqual(7);
      expect(carbohydrate).toEqual(734);
      expect(protein).toEqual(2);
    });

    test('change fat and calculate current values', () => {
      food.changeFat(20);

      const {
        calories,
        amount,
        fat,
        carbohydrate,
        protein,
      } = food.getCurrentValues();

      expect(fat).toEqual(20);
      expect(amount).toEqual(500);
      expect(calories).toEqual(650);
      expect(carbohydrate).toEqual(2250);
      expect(protein).toEqual(5);
    });

    test('change protein and calculate current values', () => {
      food.changeProtein(103);

      const {
        calories,
        amount,
        fat,
        carbohydrate,
        protein,
      } = food.getCurrentValues();

      expect(protein).toEqual(103);
      expect(amount).toEqual(10300);
      expect(fat).toEqual(412);
      expect(calories).toEqual(13390);
      expect(carbohydrate).toEqual(46350);
    });

    test('change carbohydrate and calculate current values', () => {
      food.changeCarbohydrate(11);

      const {
        calories,
        amount,
        fat,
        carbohydrate,
        protein,
      } = food.getCurrentValues();

      expect(carbohydrate).toEqual(11);
      expect(amount).toEqual(3);
      expect(protein).toEqual(1);
      expect(fat).toEqual(1);
      expect(calories).toEqual(4);
    });
  });
});
