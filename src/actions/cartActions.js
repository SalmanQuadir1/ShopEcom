import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`http://localhost:8089/product/findProduct/${id}`)

    console.log("additemstocart", id, quantity, data)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data.id,
            name: data.productName,
            price: data.price,
            image: data.images[0].image,
            quantity

        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}