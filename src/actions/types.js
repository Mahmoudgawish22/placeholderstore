import { FETCH_ALL_TYPES, DELETE_TYPE, UPDATE_TYPE, CREATE_TYPE} from '../constants/actionTypes'
import * as api from '../api'

export const getTypes = () => async (dispatch) => {
    try {
        const { data } = await api.getTypes();
        dispatch({ type: FETCH_ALL_TYPES, payload: data})
    } catch (error) {
        //server Error Div..for Types
    }
}
export const createType = (typePost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createType(typePost);
        dispatch({ type: CREATE_TYPE, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateType = (id, typePost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateType(id, typePost);
        dispatch({ type: UPDATE_TYPE, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteType = (id, productsIn, offersIn, setLoadingModalShow, history, onHide) => async (dispatch) => {
    try {
        await api.deleteType(id);
        productsIn.map(item=> {
            api.deleteProduct(item._id);
        })
        offersIn.map(item=> {
            api.deleteOffer(item._id);
        })
        setLoadingModalShow(false);
        onHide();
        dispatch( { type: DELETE_TYPE, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}