import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, allOrders } from '../../actions/orderActions';
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact';

const ProductsList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, orders } = useSelector(state => state.allOrders)
    useEffect(() => {
        dispatch(allOrders())
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        // if(isDeleted) {
        //     alert.success("Product Deleted Successfully");
        //     navigate('/admin/products');
        //     dispatch({ type: DELETE_PRODUCT_RESET });
        // }

    }, [dispatch, error, alert, navigate])

    const deleteHandler = (id) => {
        //dispatch((id))
        console.log(id);

    }



    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: ' SNO',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: ' Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
               
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Payment Info',
                    field: 'paymentInfo',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        orders && orders.forEach((order, index) => {
            data.rows.push({
                sno: index + 1,
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `₹${order.totalPrice}`,
            
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,

                paymentInfo: order.paymentInfo.status && String(order.paymentInfo.status).includes('succeeded')
                    ? <p style={{ color: 'green' }}>Success</p>
                    : <p style={{ color: 'red' }}>Failed</p>,

                actions:
                    <>

                        <Link to={`/admin/order/${order._id}`} className=' py-1 px-2'><i className='fa fa-eye text-success'></i></Link>
                        <Link className=' ml-2 py-1 px-2'><i className='fa fa-trash text-danger' onClick={() => deleteHandler(order._id)}></i></Link>
                    </>
            })

        })
        return data
    }

    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Orders</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className='px-3'
                                bordered
                                striped
                                responsive
                                hover
                                noBottomColumns={true}
                            />)

                        }
                    </>
                </div>

            </div>
        </>

    )
}

export default ProductsList