import { FETCH_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT, FETCH_PRODUCT} from '../constants/actionTypes'
import * as api from '../api'

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.getProducts();
        dispatch({ type: FETCH_ALL_PRODUCTS, payload: data})
    } catch (error) {
        //server Error Div..for Products
    }
}
export const getProduct = (id, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.getProduct(id);
        if (data.message) {
            history.push('/products/forall');

        }
        dispatch({ type: FETCH_PRODUCT, payload: data})
        setLoadingModalShow(false);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/products/forall');
    }
}
export const createProduct = (productsPost, selectedCompany, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(productsPost);
        const { data2 } = await api.updateCompany(selectedCompany._id, {name: selectedCompany.name, email: selectedCompany.email, address: selectedCompany.address, logo: selectedCompany.logo, phone: selectedCompany.phone, cashFromSelling: selectedCompany.cashFromSelling, numberOfSelledProducts: selectedCompany.numberOfSelledProducts, products: selectedCompany.products +1, offers: selectedCompany.offers})
        dispatch({ type: CREATE_PRODUCT, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateProduct = (id, productsPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, productsPost);
        dispatch({ type: UPDATE_PRODUCT, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateProductRating = (id, productsPost, history, setDisplay) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, productsPost);
        dispatch({ type: UPDATE_PRODUCT, payload: data});
    } catch (error) {
        history.push('/');
    }
}
export const deleteProduct = (id, selectedCompany, setLoadingModalShow, history, onHide) => async (dispatch) => {
    try {
        await api.deleteProduct(id);
        const { data2 } = await api.updateCompany(selectedCompany._id, {name: selectedCompany.name, email: selectedCompany.email, address: selectedCompany.address, logo: selectedCompany.logo, phone: selectedCompany.phone, cashFromSelling: selectedCompany.cashFromSelling, numberOfSelledProducts: selectedCompany.numberOfSelledProducts, products: selectedCompany.products-1, offers: selectedCompany.offers})
        setLoadingModalShow(false);
        onHide();
        dispatch( { type: DELETE_PRODUCT, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}