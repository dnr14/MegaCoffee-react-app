import { useReducer } from 'react';

const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
export const loadingAction = () => ({ type: LOADING });
export const successAction = res => ({ type: SUCCESS, res });
export const errorAction = error => ({ type: ERROR, error });

const INIT = {
  loading: null,
  success: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,
        loading: null,
        success: action.res,
      };
    case ERROR:
      return {
        ...state,
        loading: null,
        success: null,
        error: action.error,
      };
    default:
      throw new Error('Action not Found');
  }
};

const useFetch = () => {
  const [state, dispatch] = useReducer(reducer, INIT);

  const callApi = async cb => {
    dispatch(loadingAction());
    try {
      const response = await cb();
      dispatch(successAction(response));
    } catch (error) {
      dispatch(errorAction(error));
    }
  };

  return { state, callApi };
};

export default useFetch;
