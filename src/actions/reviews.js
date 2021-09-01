import { FETCH_ALL_REVIEWS, DELETE_REVIEW, CREATE_REVIEW} from '../constants/actionTypes'
import * as api from '../api'

export const getReviews = () => async (dispatch) => {
    try {
        const { data } = await api.getReviews();
        dispatch({ type: FETCH_ALL_REVIEWS, payload: data})
    } catch (error) {
        //server Error Div..for Reviews
    }
}
export const createReview = (reviewPost) => async (dispatch) => {
    try {
        const { data } = await api.createReview(reviewPost);
        dispatch({ type: CREATE_REVIEW, payload: data});
        // close loading Modal for Reviews..
        // open success Modal..
    } catch (error) {
        //close Loading Modal for Reviews..
        // "Something Went Wrong" Modal With please Go To The homePage btn..
    }
}
export const deleteReview = (id) => async (dispatch) => {
    try {
        await api.deleteReview(id);
        // close "Are You Sure" Modal for Reviews..
        // open success Modal..
        dispatch( { type: DELETE_REVIEW, payload: id });
    } catch (error) {
        //close Loading Modal for Reviews..
        // "Something Went Wrong" Modal With please Go To The homePage btn..
    }
}