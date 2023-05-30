import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const addItemsToCart = (id, quantity, selectedPriceWeight) => async (dispatch, getState) => {

    const { data } = await axios.get(`/api/v1/product/${id}`)
    console.log("additemstocart", id, quantity, data);

    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: data.product._id,
            name: data.product.name,
            price: parseFloat(selectedPriceWeight.price),
            image: data.product.images[0].url,
            weight: selectedPriceWeight.weight,
            size: selectedPriceWeight.size,
            units: selectedPriceWeight.units,
            quantity

        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}
export const removeItemsFromCart = (id, price) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: { id, price }
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