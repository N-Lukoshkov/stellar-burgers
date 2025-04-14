import { expect, test, describe } from '@jest/globals';
import {
  fetchIngredients,
  ingredientSlice,
  initialState
} from '../slices/ingredient';

describe('ingredientSlice reducer', () => {
  test('sets loading on pending', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(newState).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('stores ingredients on fulfilled', () => {
    const mockIngredients = [
      {
        _id: '1',
        name: 'Bun',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];

    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      fetchIngredients.fulfilled(mockIngredients, '')
    );

    expect(newState).toEqual({
      loading: false,
      ingredients: mockIngredients,
      error: null
    });
  });

  test('sets error on rejected', () => {
    const error = new Error('Error');

    const newState = ingredientSlice.reducer(
      { ...initialState, loading: true },
      fetchIngredients.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: error.message
    });
  });
});
