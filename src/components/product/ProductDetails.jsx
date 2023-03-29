import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getProductDetails, clearErrors } from '../../actions/productActions'
import Loader from '../layout/Loader';
import { Carousel } from 'react-bootstrap'
import { addItemsToCart } from '../../actions/cartActions'
const ProductDetails = () => {
    const { id } = useParams();
    const alert = useAlert();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector((state) => state.productDetails);
    console.log(product)

    useEffect(() => {
        dispatch(getProductDetails(id))
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, id])

    const decreaseQty = () => {
        const count = document.querySelector('.count');
        // if (count.valueAsNumber >= product.quantity) {
        //     return

        // }
        const qty = count.valueAsNumber - 1;
        setQuantity(qty);

    }

    const increaseQty = () => {
        const count = document.querySelector('.count');
        // if (count.valueAsNumber <= product.quantity) {
        //     return

        // }
        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    }

    const addToCart = () => {
        
        dispatch(addItemsToCart(id ,quantity))
        alert.success('Item Added to Cart')
    }

    return (
        <>
            {loading ? <Loader /> :
                <>

                    <div className="row f-flex justify-content-around product">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover'>
                                {product.images && product.images.map(img => (
                                    <Carousel.Item key={img.id} interval={1000}>

                                        <img src={`data:image/png;base64,${img.image} `} className='w-100 d-block' alt="sdf" height="500" />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.productName}</h3>
                            <p id="product_id">{product.id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner"></div>
                            </div>
                            <span id="no_of_reviews">(5 Reviews)</span>

                            <hr />

                            <p id="product_price">&#8377;{product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" onClick={addToCart} className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span id="stock_status" className={product.quantity > 0 ? 'greenColor' : 'redColor'} >{product.quantity > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>Binge on movies and TV episodes, news, sports, music and more! We insisted on 720p High Definition for this 32" LED TV, bringing out more lifelike color, texture and detail. We also partnered with Roku to bring you the best possible content with thousands of channels to choose from, conveniently presented through your own custom home screen.</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>

                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                            </button>

                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea name="review" id="review" className="form-control mt-3">

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </>
            }



        </>
    )
}

export default ProductDetails