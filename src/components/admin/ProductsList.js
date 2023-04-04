import Slider from 'rc-slider';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, getAdminProducts } from '../../actions/productActions';
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact';

const ProductsList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products)
    console.log('........', products)
    useEffect(() => {
        dispatch(getAdminProducts())
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, error, alert])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: ' ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'ProductName',
                    field: 'productName',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
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
        products && products.forEach(product => {
            console.log(product)
            data.rows.push({
                id: product.id,
                productName: product.productName,
                price: `₹${product.price}`,
                status: product.status,

                actions:
                    <>

                        <Link to={`/products/${product.id}`} className=' py-1 px-2'><i className='fa fa-pencil text-success'></i></Link>
                        <Link to={`/products/${product.id}`} className=' ml-2 py-1 px-2'><i className='fa fa-trash text-danger'></i></Link>
                    </>
            })

        })
        return data
    }
    return (
        <>
        <MetaData title={'ProductList'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Products</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setProducts()}
                                className='px-3'
                                bordered
                                striped
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