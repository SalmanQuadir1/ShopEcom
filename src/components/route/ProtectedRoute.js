import React from 'react'
import { useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ isAdmin, ...rest }) => {
    const { Component } = rest;
    const navigate = useNavigate();
    const { user, isAuthenticated} = useSelector(state => state.auth);

    if (isAuthenticated) {
        
        if (isAdmin === true && user.role !== 'admin') {
            return navigate('/')
        }

        return <div>
            <Component {...rest} />
        </div>

    }
    else {
        navigate("/login");

    }

}


export default ProtectedRoute