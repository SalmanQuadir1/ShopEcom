import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom'


const ProtectedRoute = ({ isAdmin, ...rest }) => {
    const { Component } = rest;
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useSelector(state => state.auth);

    if (isAuthenticated) {
        
        if (isAdmin === true && user.role !== 'ADMIN') {
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