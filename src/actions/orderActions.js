import axios from "axios";
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    console.log("createOrder",order)
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/orders/checkoutOrders', order, config);
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data
        })

    }
}
export const myOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST })

        const { data } = await axios.get('/orders/me');
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data
        })

    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
} 