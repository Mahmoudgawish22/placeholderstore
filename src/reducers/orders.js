import { FETCH_ALL_ORDERS, DELETE_ORDER, UPDATE_ORDER, CREATE_ORDER} from '../constants/actionTypes'

export default (orders = [], action) => {
    switch (action.type) {
        case FETCH_ALL_ORDERS:
            return action.payload;
        case DELETE_ORDER:
            return orders.filter(item=> item._id != action.payload)
        case UPDATE_ORDER:
            return orders.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_ORDER:
            return [...orders, action.payload];    
        default:
            return orders;
    }
}