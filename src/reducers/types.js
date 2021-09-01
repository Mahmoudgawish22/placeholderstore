import { FETCH_ALL_TYPES, DELETE_TYPE, UPDATE_TYPE, CREATE_TYPE} from '../constants/actionTypes'

export default (types = [], action) => {
    switch (action.type) {
        case FETCH_ALL_TYPES:
            return action.payload;
        case DELETE_TYPE:
            return types.filter(item=> item._id != action.payload)
        case UPDATE_TYPE:
            return types.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_TYPE:
            return [...types, action.payload];    
        default:
            return types;
    }
}