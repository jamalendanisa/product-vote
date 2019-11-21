import { all, fork } from 'redux-saga/effects';

import productsSaga from './products';

export default function* rootSaga() {
  yield all([
    fork(productsSaga)
  ])
}