import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions

function* fetchStoriesSaga(action) {
    try {
        const response = yield axios.get('api/stories');
        yield put({ type: 'SET_STORIES', payload: response.data })
    } catch (error) {
        console.error(`erroe`, error);
    }
}

function* storyAddSaga(action) {
    try {
        yield axios.post('api/stories', action.payload);
        yield put({ type: 'FETCH_STORIES' });
    } catch (err) {
        console.log(`err`, err);
    }
}
function* storysDeleteSaga(action) {
    try {
        yield axios.delete(`/api/stories/${action.payload}`);
        yield put({ type: 'FETCH_STORIES' });
    } catch (err) {
        console.log(`err`, err);
    }
} 
function* storyUpdateSaga(action) {
    try {
        yield axios.put(`/api/stories/${action.id}`, action.payload);
        yield put({ type: 'FETCH_STORIES' });
    } catch (err) {
        console.log(`err`, err);
    }
}


// worker Saga: will be fired on "LOGOUT" actions

function* storiesSaga() {
    yield takeEvery('FETCH_STORIES', fetchStoriesSaga);
    yield takeEvery('ADD_STORY', storyAddSaga);
    yield takeEvery('DELETE_STORY', storysDeleteSaga);
    yield takeEvery('UPDATE_STORY', storyUpdateSaga);

}


export default storiesSaga;