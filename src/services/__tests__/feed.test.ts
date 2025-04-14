import { expect, test, describe } from '@jest/globals';
import { feedSlice, initialState, getAllFeeds } from '../slices/feed';

describe('test reducer feedSlice', () => {
  test('handle pending', () => {
    const newState = feedSlice.reducer(initialState, getAllFeeds.pending(''));

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('handle fulfilled', () => {
    const now = new Date().toISOString();

    const feedResponse = {
      success: true,
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2'],
          status: 'done',
          name: 'Test Burger',
          createdAt: now,
          updatedAt: now,
          number: 12345
        },
        {
          _id: '2',
          ingredients: ['3', '4'],
          status: 'done',
          name: 'Another Burger',
          createdAt: now,
          updatedAt: now,
          number: 67890
        }
      ],
      total: 2,
      totalToday: 1
    };

    const newState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getAllFeeds.fulfilled(feedResponse, '')
    );

    expect(newState).toEqual({
      isLoading: false,
      orders: feedResponse.orders,
      total: feedResponse.total,
      totalToday: feedResponse.totalToday
    });
  });

  test('handle rejected', () => {
    const error = new Error('Rejected');

    const newState = feedSlice.reducer(
      initialState,
      getAllFeeds.rejected(error, '')
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      error: error.message
    });
  });
});
