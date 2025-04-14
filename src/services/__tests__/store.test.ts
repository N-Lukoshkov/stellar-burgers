import { rootReducer } from '../store';
import { ingredientSlice } from '../slices/ingredient';
import { newOrderSlice } from '../slices/new_order';
import { userOrders } from '../slices/orders_list';
import { userSlice } from '../slices/user';
import { feedSlice } from '../slices/feed';
import { constructorSlice } from '../slices/constructor';

describe('test init rootReducer', () => {
  test('should initialize correctly', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);

    expect(state).toEqual({
      user: userSlice.reducer(undefined, testAction),
      ingredients: ingredientSlice.reducer(undefined, testAction),
      constructorIngredient: constructorSlice.reducer(undefined, testAction),
      feeds: feedSlice.reducer(undefined, testAction),
      newOrder: newOrderSlice.reducer(undefined, testAction),
      orders: userOrders.reducer(undefined, testAction)
    });
  });
});
