import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions

function* fetchBookSaga(action) {
    try {
        const response = yield axios.get('api/book');
        yield put({ type: 'SET_BOOK', payload: response.data })
    } catch (error) {
        console.error(`erroe`, error);
    }
}

function* fetchBookAddSaga(action) {
    try {
        yield axios.post('api/book', action.payload);
        yield put({ type: 'FETCH_BOOK' });
    } catch (err) {
        console.log(`err`, err);
    }
}
function* fetchBookDeleteSaga(action) {
    console.log("delete", action.payload);
    try {
        yield axios.delete(`/api/book/${action.payload}`);
        yield put({ type: 'FETCH_BOOK' });
    } catch (err) {
        console.log(`err`, err);
    }
}
function* fetchUpdateBook(action) {
    try {
        yield axios.put(`/api/book/${action.id}`, action.payload);
        yield put({ type: 'FETCH_BOOK' });
    } catch (err) {
        console.log(`err`, err);
    }
}


// worker Saga: will be fired on "LOGOUT" actions

function* bookSaga() {
    yield takeEvery('FETCH_BOOK', fetchBookSaga);
    yield takeEvery('ADD_BOOK', fetchBookAddSaga);
    yield takeEvery('DELETE_BOOK', fetchBookDeleteSaga);
    yield takeEvery('UPDATE_BOOK', fetchUpdateBook);
    

}


export default bookSaga;