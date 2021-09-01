import { FETCH_ALL_NEWS, DELETE_NEWS, UPDATE, CREATE_NEWS} from '../constants/actionTypes'

export default (news = [], action) => {
    switch (action.type) {
        case FETCH_ALL_NEWS:
            return action.payload;
        case DELETE_NEWS:
            return news.filter(item=> item._id != action.payload)
        case CREATE_NEWS:
            return [...news, action.payload];    
        default:
            return news;
    }
}