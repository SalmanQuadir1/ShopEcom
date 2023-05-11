import axios from "axios"
//import { useSelector } from "react-redux"
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
    CLEAR_ERRORS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    ADMIN_USERS_REQUEST,
    ADMIN_USERS_SUCCESS,
    ADMIN_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
   
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config);
        sessionStorage.setItem('LoginUser', JSON.stringify(data));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
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
        const { data } = await axios.post('/api/v1/register', userData, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Update User profile
export const updateProfile = (userData) => async (dispatch) => {
    console.log(".....", userData)
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.put('/api/v1/me/update', userData, config);
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Update User password
export const updatePassword = (passwords) => async (dispatch) => {
    console.log(".....", passwords)
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put('/api/v1/password/update', passwords, config);
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}


//Load User
export const loadUser = () => async (dispatch) => {

    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me');
        console.log("xsaxaxa", data);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}
//LOGOUT  user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('/api/v1/logout');
        dispatch({
            type: LOGOUT_SUCCESS,

        })
        sessionStorage.removeItem('LoginUser')

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}


//get all users
export const getAdminUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_USERS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/users`);

        dispatch({
            type: ADMIN_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADMIN_USERS_FAIL,
            payload: error.response.data.errMessage
        })

    }
}
//Delete User 
export const deleteUser = (id) => async (dispatch) => {


    try {


        dispatch({ type: DELETE_USER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.errMessage
        })

    }
}