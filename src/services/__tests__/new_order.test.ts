import newOrderSlice, {
  placeNewOrder,
  resetOrder,
  initialState
} from '../slices/new_order';

describe('newOrderSlice — testing reducer for order state', () => {
  it('returns initial state', () => {
    const result = newOrderSlice.reducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  it('resets order state', () => {
    const previousState = {
      loading: true,
      order: {
        _id: '671a8f96d829be001c7787ea',
        ingredients: ['Bun', 'Meat', 'Lettuce'],
        status: 'done',
        name: 'Cheeseburger',
        createdAt: '2024-10-20T18:00:00',
        updatedAt: '2024-10-20T18:00:10',
        number: 12345
      },
      error: 'Error'
    };
    const state = newOrderSlice.reducer(previousState, resetOrder());
    expect(state).toEqual(initialState);
  });

  describe('handling async actions with placeNewOrder', () => {
    it('sets loading to true on pending', () => {
      const action = { type: placeNewOrder.pending.type };
      const state = newOrderSlice.reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.order).toBeNull();
      expect(state.error).toBeUndefined();
    });

    it('updates state with order on fulfilled', () => {
      const mockOrder = {
        _id: '671a8f96d829be001c7787ea',
        ingredients: ['Bun', 'Meat', 'Lettuce'],
        status: 'done',
        name: 'Cheeseburger',
        createdAt: '2024-10-20T18:00:00',
        updatedAt: '2024-10-20T18:00:10',
        number: 12345
      };

      const action = {
        type: placeNewOrder.fulfilled.type,
        payload: { order: mockOrder }
      };

      const state = newOrderSlice.reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.error).toBeUndefined();
    });

    it('sets error on rejected', () => {
      const action = {
        type: placeNewOrder.rejected.type,
        error: { message: 'Error' }
      };

      const state = newOrderSlice.reducer(initialState, action);
      expect(state.loading).toBe(false);
      expect(state.order).toBeNull();
      expect(state.error).toBe('Error');
    });
  });
});
