import { AUTH, FETCH_ALL_USERS, DELETE_USER, UPDATE_USER, CREATE_USER, FETCH_USER } from '../constants/actionTypes'
import * as api from '../api'

export const signIn = (loginFormData, setLoadingModalShow, setErrorLoginRespond, history) => async (dispatch) => {
    try {
        var { data } = await api.signIn(loginFormData);
        dispatch({ type: AUTH, data});
        setLoadingModalShow(false);
        history.push('/');
    } catch (error) {
        setLoadingModalShow(false);
        setErrorLoginRespond({
            message: 1
          });
    }
}

export const signUp = (formData, setLoadingModalShow, setErrorLoginRespond, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data});
        setLoadingModalShow(false);
        history.push('/');
    } catch (error) {
        setLoadingModalShow(false);
        setErrorLoginRespond({
            message: 2
          });
    }
}
export const signUpFromCP = (formData, setDoneModal, setLoadingModalShow, setErrorLoginRespond) => async (dispatch) => {
    try {
        const { data } = await api.signUpFromCP(formData);
        dispatch({ type: CREATE_USER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        setErrorLoginRespond({
            message: 2
          });
    }
}

export const updateUser = (id, user, setDoneModal, setLoadingModalShow, setErrorLoginRespond) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: UPDATE_USER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        setErrorLoginRespond({
            message: 2
          });
    }
}
export const addToCart = (id, newCart, setDoneModal, history, setLikeLoading) => async (dispatch) => {
    try {
        const { data } = await api.addToCart(id, newCart);
        dispatch({ type: UPDATE_USER, payload: data});
        setLikeLoading(false)
        setDoneModal(true);
    } catch (error) {
        history.push('/');
    }
}
export const removeallFromCart = (id, history) => async (dispatch) => {
    try {
        const { data } = await api.removeAllFromCart(id);
        dispatch({ type: UPDATE_USER, payload: data});
    } catch (error) {
        history.push('/');
    }
}

export const like = (id, newLike, history, liked, setLiked, setLikeLoading) => async (dispatch) => {
    try {
        const { data } = await api.like(id, newLike);
        dispatch({ type: UPDATE_USER, payload: data});
        if (liked) {
            setLiked(false)
        } else {
            setLiked(true)
        }
        setLikeLoading(false);
    } catch (error) {
        history.push('/');
    }
}
export const unLike = (id, newLike, history, setLikeLoading) => async (dispatch) => {
    try {
        const { data } = await api.like(id, newLike);
        dispatch({ type: UPDATE_USER, payload: data});
        setLikeLoading(false);
    } catch (error) {
        history.push('/');
    }
}

export const deleteUser = (id, setLoadingModalShow, history, onHide) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        setLoadingModalShow(false);
        onHide();
        dispatch( { type: DELETE_USER, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.getUsers();
        dispatch({ type: FETCH_ALL_USERS, payload: data});
    } catch (error) {
        //server Error Div..for Products
    }
}
export const getUser = (id, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.getUser(id);
        dispatch({ type: FETCH_USER, payload: data});
        setLoadingModalShow(false);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}