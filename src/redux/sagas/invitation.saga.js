import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions

function* fetchInvitationSaga(action) {
    try {
        const response = yield axios.get('api/invitation');
        yield put({ type: 'SET_INVITATION', payload: response.data })
    } catch (error) {
        console.error(`erroe`, error);
    }
}

function* fetchInvitationAddSaga(action) {
    try {
        yield axios.post('api/invitation', action.payload);
        yield put({ type: 'FETCH_INVITATION' });
    } catch (err) {
        console.log(`err`, err);
    }
}
function* fetchInvitationDeleteSaga(action) {
    try {
        yield axios.delete(`/api/invitation/${action.payload}`);
        yield put({ type: 'FETCH_INVITATION' });
    } catch (err) {
        console.log(`err`, err);
    }
}
function* fetchUpdateInvitation(action) {
    try {
        yield axios.put(`/api/invitation/${action.id}`, action.payload);
        yield put({ type: 'FETCH_INVITATION' });
    } catch (err) {
        console.log(`err`, err);
    }
}


// worker Saga: will be fired on "LOGOUT" actions

function* invitationSaga() {
    yield takeEvery('FETCH_INVITATION', fetchInvitationSaga);
    yield takeEvery('ADD_INVITATION', fetchInvitationAddSaga);
    yield takeEvery('DELETE_INVITATION', fetchInvitationDeleteSaga);
    yield takeEvery('UPDATE_INVITATION', fetchUpdateInvitation);

}


export default invitationSaga;