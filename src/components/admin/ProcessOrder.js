import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, allOrders, myOrders } from '../../actions/orderActions';
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact';
import { UPDATE_ORDER_SUCCESS } from '../../constants/orderConstants';

const ProcessOrder = () => {
  const [status, setStatus] = useState('');


  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, order, success } = useSelector(state => state.orderDetails)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    if (success) {
      navigate('/admin/products');
      alert.success("Product Created Successfully");
      dispatch({ type: UPDATE_ORDER_SUCCESS })

    }
  }, [dispatch, error, alert, success, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('status', status);

    dispatch(setStatus(formData))



  }
  return (
    <div>ProcessOrder</div>
  )
}

export default ProcessOrder