import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,

    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {

    switch (action.type) {

        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}
export const myOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}
export const orderDetailsReducer = (state = { orders: [] }, action) => {

    switch (action.type) {

        case ALL_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                totalAmount: action.payload.totalAmount
            }
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }


        default:
            return state
    }
}

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
       

        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

            
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false

               
            }
            case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}