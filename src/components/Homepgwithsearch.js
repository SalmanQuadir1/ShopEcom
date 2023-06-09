import React, { useEffect, useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css';

import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products);
    let resPerPage = 5;



    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price))

    }, [dispatch, error, alert, currentPage, keyword, price])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);

    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                    <MetaData title={'Buy Best Products'} />
                    <h1 id="products_heading">Latest Products({productsCount})</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <Range
                                            marks={{
                                                1: `$1`,
                                                1000: `$1000`


                                            }}
                                            min={1}
                                            max={1000}
                                            defaultValue={[1, 1000]}
                                            tipFormatter={value => `$${value}`}
                                            tipProps={{
                                                placement: "top",
                                                visible: true
                                            }}
                                            value={price}
                                            onChange={price => setPrice(price)}
                                        />
                                    </div>
                                </>
                            ) :
                                (
                                    products && products.map((product) => (

                                        <Product product={product} key={product.id} />
                                    ))
                                )}


                        </div>
                    </section>
                    <div className="d-flex justify-content-center mt-5">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass='page-item'
                            linkClass='page-link'

                        />
                    </div>
                </>
            }
        </>

    )
}

export default Home