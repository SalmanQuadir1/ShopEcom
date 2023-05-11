
import './App.css';
import Home from './components/Home';
import Footer from './components/layout/Footer/Footer';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import { loadUser } from './actions/userActions';
import store from './store';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import ListOrders from './components/order/ListOrders';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import ProductsReviews from './components/admin/ProductReviews';
import OrdersList from './components/admin/OrdersList';
import NewProduct from './components/admin/NewProduct';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import axios from 'axios';
import UpdateProduct from './components/admin/UpdateProduct';
import UsersList from './components/admin/UsersList';
import ProcessOrder from './components/admin/ProcessOrder';
import OrderDetails from './components/order/OrderDetails';
import BannerCarousel from './components/BannerCarousel';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');


  useEffect(() => {

    store.dispatch(loadUser())

    async function getStripeApiKey() {

      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey);

    }
    getStripeApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
            <Route exact path='/' Component={BannerCarousel} />

        </Routes>
        <div className="container container-fluid">
          <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path="/search/:keyword" Component={Home} />
            <Route exact path='/product/:id' Component={ProductDetails} />
            <Route exact path='/cart' Component={Cart} />
            <Route exact path='/login' Component={Login} />
            <Route exact path='/register' Component={Register} />

            <Route path='/me' element={<ProtectedRoute Component={Profile}></ProtectedRoute>}></Route>
            <Route path='/password/update' element={<ProtectedRoute Component={UpdatePassword}></ProtectedRoute>}></Route>
            <Route path='/me/update' element={<ProtectedRoute Component={UpdateProfile}></ProtectedRoute>}></Route>
            <Route path='/shipping' element={<ProtectedRoute Component={Shipping}></ProtectedRoute>}></Route>
            <Route path='/order/confirm' element={<ProtectedRoute Component={ConfirmOrder}></ProtectedRoute>}></Route>
            <Route path='/order/success' element={<ProtectedRoute Component={OrderSuccess}></ProtectedRoute>}></Route>
            <Route path='/orders/me' element={<ProtectedRoute Component={ListOrders}></ProtectedRoute>}></Route>
            <Route path='/order/:id' element={<ProtectedRoute  Component={OrderDetails}></ProtectedRoute>}></Route>



            {stripeApiKey && (
              <Route exact path='/payment' element={stripeApiKey &&
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute Component={Payment}></ProtectedRoute>
                </Elements>}

              />
            )}

          </Routes>

        </div>
        <Routes>
          <Route path='/dashboard' element={<ProtectedRoute isAdmin={true} Component={Dashboard}></ProtectedRoute>}></Route>
          <Route path='/admin/products' element={<ProtectedRoute isAdmin={true} Component={ProductsList}></ProtectedRoute>}></Route>
          <Route path='/admin/product/:id' element={<ProtectedRoute isAdmin={true} Component={UpdateProduct}></ProtectedRoute>}></Route>
          <Route path='/admin/product' element={<ProtectedRoute isAdmin={true} Component={NewProduct}></ProtectedRoute>}></Route>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true} Component={OrdersList}></ProtectedRoute>}></Route>
          <Route path='/admin/order/:id' element={<ProtectedRoute isAdmin={true} Component={ProcessOrder}></ProtectedRoute>}></Route>
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true} Component={UsersList}></ProtectedRoute>}></Route>
          <Route path='/admin/reviews' element={<ProtectedRoute isAdmin={true} Component={ProductsReviews}></ProtectedRoute>}></Route>
        </Routes>

      {/* {!loading && user.role !== 'admin ' && ( */}

          <Footer />
        {/* )} */}
      </div>
    </Router>
  );
}

export default App;
