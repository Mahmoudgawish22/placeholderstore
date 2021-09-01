import axios from 'axios';

const API = axios.create({ baseURL: 'https://placeholderstore.herokuapp.com'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const getTypes = () => API.get('/types');
export const createType = (newType) => API.post('/types/create-type', newType);
export const updateType = (id, updatedType) => API.patch(`/types/${id}`, updatedType);
export const deleteType = (id) => API.delete(`/types/${id}`);

//---------------------------------------------------------------------

export const getUsers = () => API.get('/users');
export const getUser = (id) => API.get(`/users/${id}`);
export const signUp = (formData) => API.post('/users/signup', formData);
export const signUpFromCP = (formData) => API.post('/users/signupfromCP', formData);
export const signIn = (loginFormData) => API.post('/users/signin', loginFormData);
export const updateUser = (id, updatedUser) => API.patch(`/users/${id}`, updatedUser);
export const removeAllFromCart = (id) => API.patch(`/users/${id}`);
export const addToCart = (id, newCart) => API.patch(`/users/addtocart/${id}`, newCart);
export const like = (id, newLike) => API.patch(`/users/like/${id}`, newLike);
export const deleteUser = (id) => API.delete(`/users/${id}`);

//---------------------------------------------------------------------

export const getSells = () => API.get('/sells');
export const createSell = (newSell) => API.post('/sells/create-sell', newSell);

//---------------------------------------------------------------------

export const getReviews = () => API.get('/reviews');
export const createReview = (newReview) => API.post('/reviews/create-review', newReview);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

//---------------------------------------------------------------------

export const getReturns = () => API.get('/returns');
export const createReturn = (newReturn) => API.post('/returns/create-return', newReturn);
export const updateReturn = (id, updatedReturn) => API.patch(`/returns/${id}`, updatedReturn);
export const deleteReturn = (id) => API.delete(`/returns/${id}`);

//---------------------------------------------------------------------

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post('/products/create-product', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

//---------------------------------------------------------------------

export const getOrders = () => API.get('/orders');
export const createOrder = (newOrder) => API.post('/orders/create-order', newOrder);
export const updateOrder = (id, updatedOrder) => API.patch(`/orders/${id}`, updatedOrder);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

//---------------------------------------------------------------------

export const getOffersImg = () => API.get('/offersImg');
export const createOffersImg = (newOffersImg) => API.post('/offersImg/create-offerImg', newOffersImg);
export const updateOffersImg = (id, updatedOffersImg) => API.patch(`/offersImg/${id}`, updatedOffersImg);

//---------------------------------------------------------------------

export const getOffers = () => API.get('/offers');
export const createOffer = (newOffer) => API.post('/offers/create-offer', newOffer);
export const updateOffer = (id, updatedOffer) => API.patch(`/offers/${id}`, updatedOffer);
export const deleteOffer = (id) => API.delete(`/offers/${id}`);

//---------------------------------------------------------------------

export const getNews = () => API.get('/news');
export const createNews = (newNews) => API.post('/news/create-news', newNews);
export const deleteNews= (id) => API.delete(`/news/${id}`);

//---------------------------------------------------------------------

export const getCompanies = () => API.get('/companies');
export const getCompany = (id) => API.get(`/companies/${id}`);
export const createCompany = (newCompany) => API.post('/companies/create-company', newCompany);
export const updateCompany = (id, updatedCompany) => API.patch(`/companies/${id}`, updatedCompany);
export const deleteCompany = (id) => API.delete(`/companies/${id}`);