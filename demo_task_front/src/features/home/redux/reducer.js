import initialState from './initialState';
import {REFRESH_REQUESTS, REFRESH_PAYMENTS, REFRESH_POSITIONS, SET_IS_LOADING} from "./actions";

const reducers = [
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case REFRESH_REQUESTS:
      return {
        ...state,
        requests: action.requests
      }
    case REFRESH_PAYMENTS:
      return {
        ...state,
        payments: action.payments
      }
    case REFRESH_POSITIONS:
      return {
        ...state,
        positions: action.positions
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}

export const getIsLoading = state => state.home.isLoading;
export const getRequests = state => state.home.requests;
export const getPositions = state => state.home.positions;
