import React, { useState } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom'
import axios from 'axios'

const AddProductFile = () => {
    const [files, setfiles] = useState('')
    const alert = useAlert();
    const changeHandler = async (file) => {
        console.log(file);
        setfiles(file)


    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // const config = {
        //     headers: {
        //         "Content-Type": "application/json",
        //     }
        // }
        const formData = new FormData();
        formData.append('file', files);
        try {
            const { data } = await axios.post('/upload', formData);
            if (data.success) {

                alert.success("Data Saved Successfully ");
                document.getElementById('file').value = null
            }
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <>
            <MetaData title={'Add Product File'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <div className="wrapper my-5 ">
                            <form className="shadow-lg w-75" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Upload Product File (.csv)</h1>
                                <div className='d-flex justify-content-between'>
                                    <input type="file" className="form-control pb3 w-75" id="file" accept=".csv,.xlsx" name="file" onChange={(e) => changeHandler(e.target.files[0])} />
                                    <Link to="/files/product.csv" target="_blank" download><i className='fa fa-download fa-3x' title='Download Product Format'></i></Link>                              </div>
                                <input className="btn btn-block py-3" type="submit" />

                            </form>
                        </div>
                    </>
                </div>

            </div>
        </>
    )
}

export default AddProductFile