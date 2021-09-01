import { FETCH_ALL_RETURNS, DELETE_RETURN, UPDATE_RETURN, CREATE_RETURN} from '../constants/actionTypes'

export default (returns = [], action) => {
    switch (action.type) {
        case FETCH_ALL_RETURNS:
            return action.payload;
        case DELETE_RETURN:
            return returns.filter(item=> item._id != action.payload)
        case UPDATE_RETURN:
            return returns.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_RETURN:
            return [...returns, action.payload];    
        default:
            return returns;
    }
}