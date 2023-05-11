import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import BannerCarousel from './BannerCarousel'




const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 100000]);
    const [category, setCategory] = useState('');
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes',
        'Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount, resPerPage } = useSelector(state => state.products);


    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category))

    }, [dispatch, error, alert, currentPage, keyword, price, category])

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

                            {keyword ?
                                (
                                    <>
                                        <div className="col-6 col-md-3 mt-5 mb-5">
                                            <div className="px-5">
                                                <Range
                                                    marks={{
                                                        1: '₹1',
                                                        100000: '₹100000'
                                                    }}
                                                    min={1}
                                                    max={100000}
                                                    defaultValue={[1, 100000]}
                                                    tipFormatter={value => `₹${value}`}
                                                    tipProps={{
                                                        placement: "top",
                                                        visible: true
                                                    }}
                                                    value={price}
                                                    onChange={price => setPrice(price)}

                                                />
                                                <hr className="my-5" />
                                                <div className="mt-5">
                                                    <h4 className="mb-3">
                                                        Categories
                                                    </h4>
                                                    <ul className='pl-0'>
                                                        {categories.map(category => (
                                                            <li style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                                key={category} onClick={() => setCategory(category)}>{category} </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                )
                                :
                                (
                                    products.map(product => (

                                        <Product product={product} key={product._id} />
                                    ))
                                )}



                        </div>
                    </section>
                    {resPerPage <= productsCount && (
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
                    )}

                </>
            }
        </>

    )
}

export default Home