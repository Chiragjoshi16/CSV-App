const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, error: null };
    case 'SIGNUP_FAILURE':
    case 'LOGIN_FAILURE':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;