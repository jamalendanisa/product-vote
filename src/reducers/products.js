import { handleActions } from 'redux-actions';

import { getProducts } from '../actions';

const INITIAL_STATE = {
    products: [],
    pending: true,
    error: false
}

const products = handleActions(
  {
    [getProducts.REQUEST]: state => ({
        ...state
    }),
    [getProducts.SUCCESS]: (state, { payload }) => ({
      ...state,
      products: payload.products,
      pending: false
    }),
    [getProducts.FAILURE]: state => ({
      ...state,
      error: true,
    })
  },
  INITIAL_STATE,
);

export default products;