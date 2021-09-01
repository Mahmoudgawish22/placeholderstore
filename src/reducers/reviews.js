import { FETCH_ALL_REVIEWS, DELETE_REVIEW, CREATE_REVIEW} from '../constants/actionTypes'

export default (reviews = [], action) => {
    switch (action.type) {
        case FETCH_ALL_REVIEWS:
            return action.payload;
        case DELETE_REVIEW:
            return reviews.filter(item=> item._id != action.payload)
        case CREATE_REVIEW:
            return [...reviews, action.payload];    
        default:
            return reviews;
    }
}