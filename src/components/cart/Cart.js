import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import MetaData from '../layout/MetaData'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth);

    console.log("cart", cartItems);

    const removeCartItemHandler = (id, price) => {
        dispatch(removeItemsFromCart(id, price));

    }

    const decreaseQty = (id, quantity, priceObj) => {
        const newQty = quantity - 1;
        dispatch(addItemsToCart(id, newQty, priceObj))

    }

    const increaseQty = (id, quantity, price) => {
        console.log(price, ".......pricedm")
        const newQty = quantity + 1;
        dispatch(addItemsToCart(id, newQty, price))
    }
    const checkoutHandler = () => {
        if (isAuthenticated) {
            navigate('/shipping')
        } else {
            navigate('/login')
        }
    }


    return (
        <>
            <MetaData title={'Cart'} />
            {cartItems.length === 0 ? (
                <>
                    <h2 className='mt-5  text-center p-5 ml-5'>Your Cart is Empty !!</h2>

                </>
            ) : (
                <>
                    <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                    <div className="row d-flex justify-content-between">
                        <div className="col-12 col-lg-8">
                            <hr />
                            {cartItems.map(item => (
                                <>
                                    <div className="cart-item" key={item.id}>
                                        <div className="row">
                                            <div className="col-4 col-lg-3">
                                                <img src={item.image} alt={item.name} height="90" width="115" />
                                            </div>

                                            <div className="col-5 col-lg-3">
                                                <Link to="#">{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0 text-center">
                                                <p id="card_item_price">&#8377;{item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <div className="stockCounter d-inline">
                                                    <span className="btn btn-danger minus" onClick={() => decreaseQty(item.id, item.quantity, item)}>-</span>
                                                    <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                    <span className="btn btn-primary plus" onClick={() => increaseQty(item.id, item.quantity, item)}>+</span>
                                                </div>
                                            </div>

                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                                <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.id, item.price)}></i>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            ))}

                            <hr />
                        </div>

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">&#8377;{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)} </span></p>

                                <hr />
                                <button id="checkout_btn" onClick={checkoutHandler} className="btn btn-primary btn-block">Check out</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart