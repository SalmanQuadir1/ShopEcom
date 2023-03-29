import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Navigate, Routes, useNavigate } from 'react-router-dom'


const ProtectedRoute = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    const { user, isAuthenticated, loading } = useSelector(state => state.auth);

    if (isAuthenticated) {

        // if (user && user.role === 'ADMIN') {
        //     return <div>
        //         <Component />
        //     </div>
        // } else {
        return <div>
            <Component {...props}/>
        </div>

    }
    else {
        navigate("/login");

    }

}


export default ProtectedRoute