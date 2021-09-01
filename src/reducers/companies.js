import { FETCH_ALL_COMPANIES, DELETE_COMPANY, UPDATE_COMPANY, CREATE_COMPANY} from '../constants/actionTypes'

export default (companies = [], action) => {
    switch (action.type) {
        case FETCH_ALL_COMPANIES:
            return action.payload;
        case DELETE_COMPANY:
            return companies.filter(item=> item._id != action.payload)
        case UPDATE_COMPANY:
            return companies.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_COMPANY:
            return [...companies, action.payload];    
        default:
            return companies;
    }
}