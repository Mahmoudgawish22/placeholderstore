import { FETCH_ALL_PRODUCTS, DELETE_PRODUCT, UPDATE_PRODUCT, CREATE_PRODUCT } from '../constants/actionTypes'

export default (products = [], action) => {
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return action.payload;
        case DELETE_PRODUCT:
            return products.filter(item=> item._id != action.payload)
        case UPDATE_PRODUCT:
            return products.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_PRODUCT:
            return [...products, action.payload];    
        default:
            return products;
    }
}