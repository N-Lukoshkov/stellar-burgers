import userSlice, {
  register,
  login,
  checkAuthorization,
  userUpdate,
  logout,
  initialState
} from '../slices/user';

const mockUser = {
  email: 'test@test.ru',
  name: 'testt'
};

describe('userSlice — модульные тесты', () => {
  it('register success', () => {
    const action = {
      type: register.fulfilled.type,
      payload: { user: mockUser }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('register rejected', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'Error' }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: 'Error'
    });
  });

  it('login success', () => {
    const action = {
      type: login.fulfilled.type,
      payload: { user: mockUser }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('login rejected', () => {
    const action = {
      type: login.rejected.type,
      error: { message: 'Error' }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: 'Error'
    });
  });

  it('checkAuthorization fulfilled', () => {
    const action = {
      type: checkAuthorization.fulfilled.type,
      payload: { user: mockUser }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('checkAuthorization rejected', () => {
    const action = {
      type: checkAuthorization.rejected.type,
      error: { message: 'Error' }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: 'Error'
    });
  });

  it('userUpdate fulfilled', () => {
    const action = {
      type: userUpdate.fulfilled.type,
      payload: { user: mockUser }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: true,
      user: mockUser,
      error: ''
    });
  });

  it('userUpdate rejected', () => {
    const action = {
      type: userUpdate.rejected.type,
      error: { message: 'Error' }
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: 'Error'
    });
  });

  it('logout fulfilled', () => {
    const action = {
      type: logout.fulfilled.type
    };

    const result = userSlice.reducer(initialState, action);

    expect(result).toEqual({
      isAuthChecked: false,
      user: { email: '', name: '' },
      error: ''
    });
  });
});
