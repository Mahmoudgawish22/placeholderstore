import { FETCH_USER } from '../constants/actionTypes'

export default (user = {}, action) => {
    switch (action.type) {
        case FETCH_USER:
            return  action.payload;  
        default:
            return user;
    }
}