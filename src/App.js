
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

const ApiKey = "pk_test_51MqZeDSDgpDtZZvuQAj3Hrxw4sqbsQb63UGMNbI5PLr8qVf4KZlQicvroBw2urAOdOHuDtOOcYNg5f5AeDRJ4wNF009Ts079Qa";
function App() {
  const [stripeApiKey, setStripeApiKey] = useState(ApiKey);

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path="/search/:keyword" Component={Home} />
            <Route exact path='/product/:id' Component={ProductDetails} />
            <Route exact path='/cart' Component={Cart} />

            <Route exact path='/login' Component={Login} />
            <Route exact path='/register' Component={Register} />

            <Route path='/me' element={<ProtectedRoute Component={Profile}></ProtectedRoute>}></Route>
            <Route path='/shipping' element={<ProtectedRoute Component={Shipping}></ProtectedRoute>}></Route>
            <Route path='/order/confirm' element={<ProtectedRoute Component={ConfirmOrder}></ProtectedRoute>}></Route>
            <Route path='/order/success' element={<ProtectedRoute Component={OrderSuccess}></ProtectedRoute>}></Route>
            <Route path='/order/listOrders' element={<ProtectedRoute Component={ListOrders}></ProtectedRoute>}></Route>



            {stripeApiKey && (
              <Route exact path="/payment" element={stripeApiKey &&
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute Component={Payment}></ProtectedRoute>
                </Elements>}

              />
            )}

          </Routes>

        </div>
        <Routes>

          <Route path='/dashboard' element={<ProtectedRoute isAdmin={true} Component={Dashboard}></ProtectedRoute>}></Route>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
