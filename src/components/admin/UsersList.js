import { MDBDataTable } from 'mdbreact';
import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteUser, getAdminUsers } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

const UsersList = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.users)
    const { isDeleted } = useSelector(state => state.user)
    useEffect(() => {
        dispatch(getAdminUsers())
        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("User Deleted Successfully");
            navigate('/Shopping/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }


    }, [dispatch, error, alert, navigate, isDeleted])

    const deleteHandler = (id) => {
        dispatch(deleteUser(id))

    }



    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: ' SNO',
                    field: 'sno',
                    sort: 'asc'
                },
                {
                    label: ' ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: ' Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },

                {
                    label: 'Role',
                    field: 'role',
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
        users && users.forEach((user, index) => {
            console.log(user);
            data.rows.push({
                sno: index + 1,
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role && String(user.role).includes('admin')
                    ? <p style={{ color: 'green' }}>{user.role}</p>
                    : <p style={{ color: 'red' }}>{user.role}</p>,

                actions:
                    <>

                        <Link to={`/Shopping/admin/user/${user._id}`} className=' py-1 px-2'><i className='fa fa-eye text-primary'></i></Link>
                        <Link className=' ml-2 py-1 px-2'><i className='fa fa-trash text-danger' onClick={() => deleteHandler(user._id)}></i></Link>
                    </>
            })

        })
        return data
    }
    return (
        <>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className='px-3'
                                bordered
                                striped
                                responsive
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

export default UsersList