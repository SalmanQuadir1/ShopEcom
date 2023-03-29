import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3" >
            <div className="card p-3 rounded">
                    <img
                        className="card-img-top mx-auto"
                        src={`data:image/png;base64,${product.images[0].image} `}
                        alt='img' />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product.id}`}>{product.productName}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">(5 Reviews)</span>
                    </div>
                    <p className="card-text">&#8377;{product.price}</p>
                    <Link to={`/product/${product.id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
        )
}

export default Product