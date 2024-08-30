const initialState = {
  csvData: [],
  loading: false,
  error: null
};

const csvReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CSV_DATA':
      return {
        ...state,
        csvData: action.payload,
      };
    case 'SAVE_CSV_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SAVE_CSV_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
      };
    case 'SAVE_CSV_DATA_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default csvReducer;