import React, { useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

const Home = () => {
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector((state) => state.products);
    let resPerPage = 5;



    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage))

    }, [dispatch, error, alert, currentPage, keyword])

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
                            {products && products.map((product) => (

                                <Product product={product} key={product.id} />
                            ))}

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