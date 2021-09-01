import { FETCH_ALL_ORDERS, DELETE_ORDER, UPDATE_ORDER, CREATE_ORDER} from '../constants/actionTypes'
import * as api from '../api'

export const getOrders = () => async (dispatch) => {
    try {
        const { data } = await api.getOrders();
        dispatch({ type: FETCH_ALL_ORDERS, payload: data})
    } catch (error) {
        //server Error Div..for Orders
    }
}
export const createOrder = (ordersPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createOrder(ordersPost);
        dispatch({ type: CREATE_ORDER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateOrder = (id, ordersPost , setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateOrder(id, ordersPost);
        dispatch({ type: UPDATE_ORDER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteOrder = (id, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        await api.deleteOrder(id);
        setLoadingModalShow(false);
        setDoneModal(true);
        dispatch( { type: DELETE_ORDER, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteOrderFromReturn = (id, history) => async (dispatch) => {
    try {
        await api.deleteOrder(id);
        dispatch( { type: DELETE_ORDER, payload: id });
    } catch (error) {
        history.push('/');
    }
}