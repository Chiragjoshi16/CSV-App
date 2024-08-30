import axios from 'axios';

export const signupUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.message });
    throw new Error(error.response.data.message);
  }
};