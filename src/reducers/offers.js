import { FETCH_ALL_OFFERS, DELETE_OFFER, UPDATE_OFFER, CREATE_OFFER} from '../constants/actionTypes'

export default (offers = [], action) => {
    switch (action.type) {
        case FETCH_ALL_OFFERS:
            return action.payload;
        case DELETE_OFFER:
            return offers.filter(item=> item._id != action.payload)
        case UPDATE_OFFER:
            return offers.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_OFFER:
            return [...offers, action.payload];    
        default:
            return offers;
    }
}