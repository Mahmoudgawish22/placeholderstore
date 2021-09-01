import { FETCH_ALL_COMPANIES, DELETE_COMPANY, UPDATE_COMPANY, CREATE_COMPANY, FETCH_COMPANY} from '../constants/actionTypes'
import * as api from '../api'

export const getCompanies = () => async (dispatch) => {
    try {
        const { data } = await api.getCompanies();
        dispatch({ type: FETCH_ALL_COMPANIES, payload: data})
    } catch (error) {
        //server Error Div..for Companies
    }
}
export const getCompany = (id) => async (dispatch) => {
    try {
        const { data } = await api.getCompany(id);
        dispatch({ type: FETCH_COMPANY, payload: data})
    } catch (error) {
        //server Error Div..for Companies
    }
}
export const createCompany = (companiesPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createCompany(companiesPost);
        dispatch({ type: CREATE_COMPANY, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateCompany = (id, companiesPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateCompany(id, companiesPost);
        dispatch({ type: UPDATE_COMPANY, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteCompany = (id, offersIn, productsIn, setLoadingModalShow, history, onHide) => async (dispatch) => {
    try {
        await api.deleteCompany(id);
        productsIn.map(item=> {
            api.deleteProduct(item._id);
        })
        offersIn.map(item=> {
            api.deleteOffer(item._id);
        })
        setLoadingModalShow(false);
        onHide();
        dispatch( { type: DELETE_COMPANY, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}