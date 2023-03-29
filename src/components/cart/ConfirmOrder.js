import React from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData.jsx'
import CheckoutSteps from '../cart/CheckoutSteps'
import { Link, useNavigate } from 'react-router-dom'
const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();
    //Calculate Order prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 50;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)


    const processPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        navigate('/payment')

    }

    return (
        <>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shipping confirmOrder />

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">

                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b> {user && <>{`${user.firstName}  ${user.lastName}`}</>}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{`${shippingInfo.address},${shippingInfo.city},${shippingInfo.postalCode},${shippingInfo.country}`}</p>

                    <hr />
                    <h4 className="mt-4">Your Cart Items:</h4>
                    {cartItems.map(item => (

                        <>
                            <hr />
                            <div className="cart-item my-1 " key={item.id}>
                                <div className="row">
                                    <div className="col-4 col-lg-2">
                                        <img src={`data:image/png;base64,${item.image} `} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to="#">{item.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0 ">
                                        <p>{item.quantity} x &#8377;{item.price} = <b>&#8377;{item.quantity * item.price}</b></p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                        </>
                    ))
                    }


                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">&#8377;{itemsPrice}</span></p>
                        <p>Shipping: <span className="order-summary-values">&#8377;{shippingPrice}</span></p>
                        <p>Tax:  <span className="order-summary-values">&#8377;{taxPrice}</span></p>

                        <hr />

                        <p>Total: <span className="order-summary-values">&#8377;{totalPrice}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={processPayment} className="btn btn-primary btn-block">Proceed to Payment</button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default ConfirmOrder