# Nutrition calculator

Create Foods with base nutrition values, change one of the base values and recalculate other values automatically.

## Installation

```
npm i @csejtei/nutrition
```

## Examples

```
import { Food, Nutritions, Units } from '@csejtei/nutrition';

const baseValues = {
            amount: 100,
            fat: 30,
            carbohydrate: 40,
            protein: 65,
            calories: 124
};
const food = new Food('rice', Units.GRAM, baseValues);

// returns 'rice'
food.getName();

// returns 'g'
food.getUnit();

// changes food amount value and store the result in the
// currentValues.amount
// there are also changeCalories, changeFat,
// changeCarbohydrate, changeCalories functions
food.changeAmount(23);

// get current nutrition values of rice
const { calories, amount, fat, carbohydrate, protein }
                = food.getCurrentValues();

// get base nutrition values of rice
const { calories, amount, fat, carbohydrate, protein }
                = food.getBaseValues();
```

## Error handling

```
import { Food, Nutritions, Units, InvalidFoodAmountError } from '@csejtei/nutrition';

const baseValues = {
    amount: 100,
    fat: 30,
    carbohydrate: 40,
    protein: 65,
    calories: 124
};

try {
    const rice = new Food('rice', Units.GRAM, baseValues);
} catch(error) {
    // error: InvalidFoodAmountError
}
```

All error types:

- InvalidFoodAmountError -> if the amount of the baseValues is less or equal zero or the changeAmount parameter is less or equal zero
- EmptyFoodNameError -> if the Food first parameter is empty
