import React from 'react'
import Search from '../Search'
import { Link, Route, Routes } from 'react-router-dom'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userActions';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.cart)

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out Successfully')
  }

  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <img src="/images/ecom.jpg" width={100} height={50} alt="Logo img" />
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">

          {/* <Route path='/search/:keyword' render={({ history }) => <Search history={history} />} /> */}
          <Search />
        </div>


        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <Link to={'/cart'} style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">Cart<sup><span className=" mr-4 rounded-circle " id="cart_count">{cartItems.length}</span></sup></span>

          </Link>
          {user ? (
            <div className="ml-4 d-inline dropdown">
              <Link to='#' className='btn dropdown-toggle text-white' type="button" id="dropDownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <figure className="avatar avatar-nav">
                  <img src='/images/User-avatar.svg.png' alt="user" className='rounded-circle bg-white' />
                </figure>
                <span>{user && user.firstName}</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>
                {user && user.role === 'ADMIN' && (

                  <Link className='dropdown-item ' to={'/dashboard'}>Dashboard</Link>

                )}
                <Link className='dropdown-item ' to={'/orders/me'}>Orders</Link>
                <Link className='dropdown-item ' to={'/me'}>Profile</Link>

                <Link className='dropdown-item text-danger' onClick={logoutHandler} to={'/logout'}>Logout</Link>

              </div>
            </div>
          ) : !loading && <Link to={'/login'} className="btn" id="login_btn">Login</Link>}



        </div>
      </nav>
    </>
  )
}

export default Header
