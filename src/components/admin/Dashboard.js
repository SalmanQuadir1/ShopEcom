import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { allOrders } from '../../actions/orderActions'
import Sidebar from './Sidebar'
import { getAdminUsers } from '../../actions/userActions'
import { getProducts } from '../../actions/productActions'

const Dashboard = () => {
    const dispatch = useDispatch();
    const { error, orders, totalAmount } = useSelector(state => state.allOrders)
    const { productsCount } = useSelector(state => state.products)
    const { users } = useSelector(state => state.users)

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(allOrders())
        dispatch(getAdminUsers())
        dispatch(getProducts())



    }, [dispatch, error])


    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>
                    <div className="row pr-4">
                        <div className="col-xl-12 col-sm-12 mb-3">
                            <div className="card shadow-lg o-hidden h-100 border-0">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 text-center pt-2">
                                            <i className="fa fa-bar-chart fa-4x ml-5 text-primary"></i>
                                        </div>
                                        <div className="col-md-6 text-center">
                                            <div>
                                                <h3>₹{totalAmount && totalAmount}</h3>
                                            </div>
                                            <div className="text-center card-font-size">Total Amount<br />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row pr-4">
                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card shadow-lg o-hidden h-100 border-0">
                                <div className="card-body  ">
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <div className="mt-2 text-center"> <i className="fa fa-clone fa-3x text-warning"></i></div>

                                        </div>
                                        <div className="col-md-6 text-center">
                                            <div>
                                                <h1>{productsCount && productsCount}</h1> </div>
                                            <div className="text-center card-font-size">Products<br />
                                            </div>
                                        </div>

                                    </div>



                                </div>
                                <Link className="card-footer  clearfix small z-1" to="/admin/products">
                                    <span className="float-left text-warning">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right text-warning"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card shadow-lg o-hidden h-100 border-0">
                                <div className="card-body  ">
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <div className="mt-2 text-center"> <i className="fa fa-shopping-basket fa-3x text-success"></i></div>

                                        </div>
                                        <div className="col-md-6 text-center">
                                            <div>
                                                <h1>{orders && orders.length}</h1> </div>
                                            <div className="text-center card-font-size">Orders<br />
                                            </div>
                                        </div>

                                    </div>



                                </div>
                                <Link className="card-footer  clearfix small z-1" to="/admin/orders">
                                    <span className="float-left text-success">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right text-success"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card shadow-lg o-hidden h-100 border-0">
                                <div className="card-body  ">
                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <div className="mt-2 text-center"> <i className
                                                ="fa fa-users fa-3x text-info"></i></div>

                                        </div>
                                        <div className="col-md-6 text-center">
                                            <div>
                                                <h1>{users && users.length}</h1> </div>
                                            <div className="text-center card-font-size">Users<br />
                                            </div>
                                        </div>

                                    </div>



                                </div>
                                <Link className="card-footer  clearfix small z-1" to="/admin/users">
                                    <span className="float-left text-info ">View Details</span>
                                    <span className="float-right">
                                        <i className="fa fa-angle-right text-info"></i>
                                    </span>
                                </Link>
                            </div>
                        </div>


                        {/* <div className="col-xl-4 col-sm-6 mb-3">
                            <div className="card shadow-lg o-hidden h-100 border-0">
                                <div className="card-body">
                                    <div className="text-center card-font-size">Out of Stock<br /> <b>4</b></div>
                                    <div className="mt-2 text-center "> <i className="fa fa-stop-circle fa-2x text-danger"></i></div>

                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard