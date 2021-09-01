import { FETCH_ALL_SELLS, CREATE_SELL} from '../constants/actionTypes'
import * as api from '../api'

export const getSells = () => async (dispatch) => {
    try {
        const { data } = await api.getSells();
        dispatch({ type: FETCH_ALL_SELLS, payload: data})
    } catch (error) {
        //server Error Div..for Sells
    }
}
export const createSell = (sellsPost) => async (dispatch) => {
    try {
        const { data } = await api.createSell(sellsPost);
        dispatch({ type: CREATE_SELL, payload: data});
        // close loading Modal for Sells..
        // open success Modal..
    } catch (error) {
        //close Loading Modal for Sells..
        // "Something Went Wrong" Modal With please Go To The homePage btn..
    }
}