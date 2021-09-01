import { FETCH_ALL_RETURNS, DELETE_RETURN, UPDATE_RETURN, CREATE_RETURN} from '../constants/actionTypes'
import * as api from '../api'

export const getReturns = () => async (dispatch) => {
    try {
        const { data } = await api.getReturns();
        dispatch({ type: FETCH_ALL_RETURNS, payload: data})
    } catch (error) {
        //server Error Div..for Returns
    }
}
export const createReturn = (returnsPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createReturn(returnsPost);
        dispatch({ type: CREATE_RETURN, payload: data});
        setLoadingModalShow(false)
        setDoneModal(true)
    } catch (error) {
        setLoadingModalShow(false)
        history.push('/')
    }
}
export const updateReturn = (id, returnsPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateReturn(id, returnsPost);
        dispatch({ type: UPDATE_RETURN, payload: data});
        setLoadingModalShow(false)
        setDoneModal(true)
    } catch (error) {
        setLoadingModalShow(false)
        history.push('/')
    }
}
export const deleteReturn = (id, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        await api.deleteReturn(id);
        setLoadingModalShow(false)
        setDoneModal(true)
        dispatch( { type: DELETE_RETURN, payload: id });
    } catch (error) {
        setLoadingModalShow(false)
        history.push('/')
    }
}