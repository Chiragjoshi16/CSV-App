
export const SET_CSV_DATA = 'SET_CSV_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';

const API_URL = 'http://localhost:5000/api/auth';
export const setCsvData = (data) => ({
  type: SET_CSV_DATA,
  payload: data,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const saveCsvData = (data) => async (dispatch) => {
  try {
    const response = await fetch('/insert-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    dispatch({ type: 'SAVE_CSV_DATA_SUCCESS', payload: result });
  } catch (error) {
    console.error('Error saving CSV data:', error);
    dispatch({ type: 'SAVE_CSV_DATA_FAILURE', error: error.message });
  }
};

