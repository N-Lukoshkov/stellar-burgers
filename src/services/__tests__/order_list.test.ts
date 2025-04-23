import { getOrders, userOrders, initialState } from '../slices/orders_list';

jest.mock('@api', () => ({
  getOrdersApi: jest.fn(() =>
    Promise.resolve([
      {
        _id: '66d7fc9d119d45001b503fa1',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2024-09-04T06:22:21.104Z',
        updatedAt: '2024-09-04T06:22:21.577Z',
        number: 51930
      }
    ])
  )
}));

describe('userOrders — unit-тесты слайса', () => {
  it('обработка pending состояния', () => {
    const stateAfterPending = userOrders.reducer(
      initialState,
      getOrders.pending('', undefined)
    );

    expect(stateAfterPending.loading).toBe(true);
    expect(stateAfterPending.orders).toStrictEqual([]);
  });

  it('обработка успешного запроса (fulfilled)', () => {
    const mockOrders = [
      {
        _id: '66e9f8b2119d45001b507802',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0942',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный spicy био-марсианский минеральный бургер',
        createdAt: '2024-09-17T21:46:26.339Z',
        updatedAt: '2024-09-17T21:46:26.815Z',
        number: 53260
      }
    ];

    const intermediateState = userOrders.reducer(
      initialState,
      getOrders.pending('', undefined)
    );

    const finalState = userOrders.reducer(
      intermediateState,
      getOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(finalState.loading).toBe(false);
    expect(finalState.orders).toStrictEqual(mockOrders);
  });

  it('обработка неудачного запроса (rejected)', () => {
    const intermediateState = userOrders.reducer(
      initialState,
      getOrders.pending('', undefined)
    );

    const failedState = userOrders.reducer(
      intermediateState,
      getOrders.rejected(new Error('Error'), '', undefined)
    );

    expect(failedState.loading).toBe(false);
    expect(failedState.orders).toStrictEqual([]);
  });
});
