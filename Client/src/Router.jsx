import {Route,Routes} from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetails/ProductDetail';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
const stripePromise = loadStripe(
  "pk_test_51SJWTpKKw9xwe466azwIISkE9Xd5jQoOcrWc3KTT9DRlOXPMo0D96tsiDO53YRFEBh0xECZrNvh3D7rdiks0UoxD003Mj0bScL"
);
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/payments" element={
            <ProtectedRoute 
            msg={"you must login first"} 
            redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
            </Elements>
            </ProtectedRoute>
            } />
        <Route path="/orders" element={
          <ProtectedRoute 
          msg={"you must login to access your orders"} 
          redirect={"/orders"}
          >
          
          <Orders />
          </ProtectedRoute>
          
          } />
        <Route path="/category/:categoryType" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </>
  );
}

export default Router