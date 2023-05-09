import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productActions';
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductsList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products)
    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    useEffect(() => {
        dispatch(getAdminProducts())
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Product Deleted Successfully");
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

    }, [dispatch, error, alert, isDeleted, deleteError, navigate])

    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))

    }



    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: ' SNO',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: ' ID',
                    field: '_id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
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
        products && products.forEach((product, index) => {
            data.rows.push({
                sno: index + 1,
                _id: product._id,
                name: product.name,
                price: `₹${product.price}`,
                category: product.category,
                stock: product.stock,

                actions:
                    <>

                        <Link to={`/admin/product/${product._id}`} className=' py-1 px-2'><i className='fa fa-pencil text-success'></i></Link>
                        <Link className=' ml-2 py-1 px-2'><i className='fa fa-trash text-danger' onClick={() => deleteHandler(product._id)}></i></Link>
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
                            />
                        )

                        }
                    </>
                </div>

            </div>
        </>

    )
}

export default ProductsList