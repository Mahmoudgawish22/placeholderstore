import { FETCH_ALL_OFFERSIMGS, UPDATE_OFFERSIMG, CREATE_OFFERSIMG} from '../constants/actionTypes'

export default (offersImgs = [], action) => {
    switch (action.type) {
        case FETCH_ALL_OFFERSIMGS:
            return action.payload;
        case UPDATE_OFFERSIMG:
            return offersImgs.map(item=> item._id == action.payload._id? action.payload : item)
        case CREATE_OFFERSIMG:
            return [...offersImgs, action.payload];    
        default:
            return offersImgs;
    }
}