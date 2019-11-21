import { put, takeEvery } from 'redux-saga/effects';

import { getProducts } from '../actions';
import '../service/seed.js';

export function* getProductsRequest() {
  let data = window.Seed.products.sort((a, b) => (a.votes < b.votes) ? 1 : -1);
  try {
    yield put(
      getProducts.success({
        products: data,
      }),
    );
  } catch (error) {
    yield put(getProducts.failure(error.message));
  }
}

export default function* productsSaga() {
  yield takeEvery(getProducts.REQUEST, getProductsRequest);
}