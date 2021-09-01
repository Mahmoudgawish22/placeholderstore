import { FETCH_ALL_OFFERSIMGS, UPDATE_OFFERSIMG, CREATE_OFFERSIMG} from '../constants/actionTypes'
import * as api from '../api'

export const getOffersImg = () => async (dispatch) => {
    try {
        const { data } = await api.getOffersImg();
        dispatch({ type: FETCH_ALL_OFFERSIMGS, payload: data})
    } catch (error) {
        //server Error Div..for OffersImgs
    }
}
export const createOffersImg = (offerImgPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createOffersImg(offerImgPost);
        dispatch({ type: CREATE_OFFERSIMG, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const updateOffersImg = (id, offerImgPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.updateOffersImg(id, offerImgPost);
        dispatch({ type: UPDATE_OFFERSIMG, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}