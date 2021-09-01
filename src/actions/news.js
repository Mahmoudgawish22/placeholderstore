import { FETCH_ALL_NEWS, DELETE_NEWS, CREATE_NEWS} from '../constants/actionTypes'
import * as api from '../api'

export const getNews = () => async (dispatch) => {
    try {
        const { data } = await api.getNews();
        dispatch({ type: FETCH_ALL_NEWS, payload: data})
    } catch (error) {
        //server Error Div..for News
    }
}
export const createNews = (newsPost, setDoneModal, setLoadingModalShow, history) => async (dispatch) => {
    try {
        const { data } = await api.createNews(newsPost);
        dispatch({ type: CREATE_NEWS, payload: data});
        setLoadingModalShow(false);
        setDoneModal(true);
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}
export const deleteNews = (id, setLoadingModalShow, history) => async (dispatch) => {
    try {
        await api.deleteNews(id);
        setLoadingModalShow(false);
        dispatch( { type: DELETE_NEWS, payload: id });
    } catch (error) {
        setLoadingModalShow(false);
        history.push('/');
    }
}