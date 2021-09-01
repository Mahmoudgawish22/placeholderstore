import { FETCH_ALL_SELLS, CREATE_SELL} from '../constants/actionTypes'

export default (sells = [], action) => {
    switch (action.type) {
        case FETCH_ALL_SELLS:
            return action.payload;
        case CREATE_SELL:
            return [...sells, action.payload];    
        default:
            return sells;
    }
}