import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBookContentSaga(action) {
    try {
        const response = yield axios.get('api/bookContent');
        yield put({ type: 'SET_BOOK_CONTENT', payload: response.data })
    } catch (error) {
        console.error(`erroe`, error);
    }
}
function* bookContentSaga() {

    // yield takeEvery('FETCH_BOOK_CONTENT', fetchBookContentSaga);

}
export default bookContentSaga;