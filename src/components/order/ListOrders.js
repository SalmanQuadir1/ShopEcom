import { MDBDataTable } from 'mdbreact';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, myOrders } from '../../actions/orderActions';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';


const ListOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(myOrders())
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert,])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num Of Items',
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
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }
            ],
            rows: []
        }
        orders && orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `₹${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ?
                    <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className=''><i className='fa fa-eye'></i></Link>
            })

        })
        return data;
    }

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'My Orders'} />
                    <h1 className='mt-5'>My Orders</h1>
                    <MDBDataTable
                        data={setOrders()}
                        className='px-3'
                        bordered
                        striped
                        hover
                        noBottomColumns={true}
                    />
                </>
            )}
        </>
    )
}

export default ListOrders