import { FETCH_COMPANY } from '../constants/actionTypes'

export default (company = {}, action) => {
    switch (action.type) {
        case FETCH_COMPANY:
            return  action.payload;  
        default:
            return company;
    }
}