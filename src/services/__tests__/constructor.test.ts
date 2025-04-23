import { describe, it, expect } from '@jest/globals';
import {
  initialState,
  addItem,
  deleteItem,
  clearAll,
  updateAll,
  constructorReducer
} from '../slices/constructor';

const testBun = {
  _id: '1',
  id: 'bun-1',
  name: 'Булка космическая',
  type: 'bun',
  proteins: 100,
  fat: 30,
  carbohydrates: 60,
  calories: 500,
  price: 1000,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0
};

const testIngredient = {
  _id: '2',
  id: 'ing-1',
  name: 'Котлета внеземная',
  type: 'main',
  proteins: 200,
  fat: 50,
  carbohydrates: 40,
  calories: 600,
  price: 300,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0
};

describe('test reducer constructorSlice', () => {
  it('should add an ingredient', () => {
    const state = constructorReducer(initialState, {
      type: addItem.type,
      payload: testIngredient
    });

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({ name: testIngredient.name });
  });

  it('should add a bun', () => {
    const state = constructorReducer(initialState, {
      type: addItem.type,
      payload: testBun
    });

    expect(state.bun?._id).toBe('1');
  });

  it('should remove an ingredient', () => {
    const state = {
      bun: null,
      ingredients: [testIngredient]
    };

    const newState = constructorReducer(state, {
      type: deleteItem.type,
      payload: testIngredient
    });

    expect(newState.ingredients).toHaveLength(0);
  });

  it('should remove bun', () => {
    const state = {
      bun: testBun,
      ingredients: []
    };

    const newState = constructorReducer(state, {
      type: deleteItem.type,
      payload: testBun
    });

    expect(newState.bun).toBeNull();
  });

  it('should reset state to initial', () => {
    const state = {
      bun: testBun,
      ingredients: [testIngredient]
    };

    const newState = constructorReducer(state, clearAll());
    expect(newState).toEqual(initialState);
  });

  it('should update ingredients array', () => {
    const newIngredients = [
      { ...testIngredient, id: 'ing-2' },
      { ...testIngredient, id: 'ing-3', name: 'Соус кометный' }
    ];

    const newState = constructorReducer(
      initialState,
      updateAll(newIngredients)
    );

    expect(newState.ingredients).toEqual(newIngredients);
  });
});
