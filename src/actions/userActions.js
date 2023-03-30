import axios from "axios"
import { useSelector } from "react-redux"
import {
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:8089/api/authenticate', { email, password }, config);
        sessionStorage.setItem('LoginUser', JSON.stringify(data));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}
//Register User
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:8089/api/register', userData, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load User
export const loadUser = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_USER_REQUEST })

        //const { data } = await axios.post('http://localhost:8089/api/register');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: JSON.parse(sessionStorage.getItem('LoginUser')).user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response
        })
    }
}
//LOGOUT 
export const logout = () => async (dispatch) => {
    try {

        await axios.post('http://localhost:8089/api/logout');
        dispatch({
            type: LOGOUT_SUCCESS,

        })
        sessionStorage.removeItem('LoginUser')

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
} 