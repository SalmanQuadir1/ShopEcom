import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productsReducer, productDetailsReducer, newProductReducer, productReducer, newReviewReducer } from './reducers/productReducers';
import { authReducer, userReducer, usersReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';
import { myOrdersReducer, newOrderReducer, allOrdersReducer, orderReducer } from './reducers/orderReducers';
const reducer = combineReducers({
    products: productsReducer,
    users: usersReducer,
    productDetails: productDetailsReducer,
    product: productReducer,
    user: userReducer,
    auth: authReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    newProduct: newProductReducer,
    newReview: newReviewReducer
})
let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}

    }
}
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
