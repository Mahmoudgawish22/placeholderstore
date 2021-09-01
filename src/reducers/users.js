import { FETCH_ALL_USERS, DELETE_USER, UPDATE_USER, CREATE_USER } from '../constants/actionTypes'

export default (users = [], action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return action.payload;
        case DELETE_USER:
            return users.filter(item=> item._id != action.payload)
        case UPDATE_USER:
            return users.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_USER:
            return [...users, action.payload];    
        default:
            return users;
    }
}
