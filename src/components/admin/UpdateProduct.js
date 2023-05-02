import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productActions';
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { product, error } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    const productId = params.id;


    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller)
            setStock(product.stock);
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors());
        }
        if (isUpdated) {
            navigate('/admin/products');
            alert.success("Product Updated Successfully");
            dispatch({ type: UPDATE_PRODUCT_RESET })

        }
    }, [dispatch, updateError, error, alert, product, productId, isUpdated, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        images.forEach(image => {
            formData.append('images', image)
        })
        dispatch(updateProduct(product._id, formData))



    }

    const onChange = (e) => {
        const files = Array.from(e.target.files)
        setImagePreview([]);
        setImages([]);
        setOldImages([]);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])

                }
            }
            reader.readAsDataURL(file)
        })


    }
    const categories = [
        'Choose One',
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


    return (
        <>
            <MetaData title={'Update Product'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        {loading ? <Loader /> : (
                            <>
                                <div className="wrapper my-5 ">
                                    <form className="shadow-lg w-75" onSubmit={submitHandler} encType='multipart/form-data'>
                                        <h1 className="mb-4">Update Product</h1>

                                        <div className="form-group">
                                            <label htmlFor="name_field">Name</label>
                                            <input
                                                type="text"
                                                id="name_field"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="price_field">Price</label>
                                            <input
                                                type="text"
                                                id="price_field"
                                                className="form-control"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="description_field">Description</label>
                                            <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category_field">Category</label>
                                            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                                {categories && categories.map(category => (

                                                    <option key={category} value={category}>{category}</option>

                                                ))}

                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="stock_field">Stock</label>
                                            <input
                                                type="number"
                                                id="stock_field"
                                                className="form-control"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="seller_field">Seller Name</label>
                                            <input
                                                type="text"
                                                id="seller_field"
                                                className="form-control"
                                                value={seller}
                                                onChange={(e) => setSeller(e.target.value)}
                                            />
                                        </div>

                                        <div className='form-group'>
                                            <label>Images</label>

                                            <div className='custom-file'>
                                                <input
                                                    type='file'
                                                    name='product_images'
                                                    className='custom-file-input'
                                                    id='customFile'
                                                    onChange={onChange}
                                                    multiple
                                                />
                                                <label className='custom-file-label' htmlFor='customFile'>
                                                    Choose Images
                                                </label>
                                            </div>
                                        </div>
                                        {oldImages && oldImages.map(img => (
                                            <img key={img} src={img.url} alt={img.url} className="mt-3 mr-2" width={55} height={52} />
                                        ))}
                                        {imagePreview && imagePreview.map(image => (
                                            <img src={image} alt={image} className="mt-3 mr-2" width={55} height={52} />
                                        ))}


                                        <button
                                            id="login_button"
                                            type="submit"
                                            className="btn btn-block py-3"
                                            disabled={loading ? true : false}
                                        >
                                            UPDATE
                                        </button>

                                    </form>
                                </div>
                            </>

                        )

                        }
                    </>
                </div>

            </div>
        </>

    )
}

export default UpdateProduct