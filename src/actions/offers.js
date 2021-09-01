import { FETCH_ALL_OFFERS, DELETE_OFFER, UPDATE_OFFER, CREATE_OFFER} from '../constants/actionTypes'
import * as api from '../api'

export const getOffers = () => async (dispatch) => {
    try {
        const { data } = await api.getOffers();
        dispatch({ type: FETCH_ALL_OFFERS, payload: data})
    } catch (error) {
        //server Error Div..for Offers
    }
}
export const createOffer = (offersPost, selectedCompany, productsFinal, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createOffer(offersPost);
        const { data2 } = await api.updateCompany(selectedCompany._id, {name: selectedCompany.name, email: selectedCompany.email, address: selectedCompany.address, logo: selectedCompany.logo, phone: selectedCompany.phone, cashFromSelling: selectedCompany.cashFromSelling, numberOfSelledProducts: selectedCompany.numberOfSelledProducts, products: selectedCompany.products, offers: selectedCompany.offers+1})
        productsFinal.map(item=> {
            const offersInArr = [...item.offersIn];
            offersInArr.push(offersPost.saleOff)
            const { data3 } =  api.updateProduct(item._id, {name: item.name, realPrice: item.realPrice, afterPrice: item.afterPrice,
                quantity: item.quantity, colors: item.colors, size: item.size, for: item.for,
                mainType: item.mainType, company: item.company, discribtion: item.discribtion, photo: item.photo, rating: item.rating, liked: item.liked,
                 ordered: item.ordered, offersIn: offersInArr});

        })
        dispatch({ type: CREATE_OFFER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateOffer = (id, offersPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateOffer(id, offersPost);
        dispatch({ type: UPDATE_OFFER, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteOffer = (id, productsFinal, selectedCompany, regex, setLoadingModalShow, history, onHide) => async (dispatch) => {
    try {
        await api.deleteOffer(id);
        productsFinal.map(item=> {
            const offersInArr = item.offersIn.filter(item=> item!==regex);
            const { data3 } =  api.updateProduct(item._id, {name: item.name, realPrice: item.realPrice, afterPrice: item.afterPrice,
                quantity: item.quantity, colors: item.colors, size: item.size, for: item.for,
                mainType: item.mainType, company: item.company, discribtion: item.discribtion, photo: item.photo, rating: item.rating, liked: item.liked,
                ordered: item.ordered, offersIn: offersInArr})
        })
        const { data2 } = await api.updateCompany(selectedCompany._id, {name: selectedCompany.name, email: selectedCompany.email, address: selectedCompany.address, logo: selectedCompany.logo, phone: selectedCompany.phone, cashFromSelling: selectedCompany.cashFromSelling, numberOfSelledProducts: selectedCompany.numberOfSelledProducts, products: selectedCompany.products, offers: selectedCompany.offers-1})
        setLoadingModalShow(false);
        onHide();
        dispatch( { type: DELETE_OFFER, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}