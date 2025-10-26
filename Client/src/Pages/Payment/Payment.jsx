import React, { useContext, useState } from "react";
import LayOut from '../../Component/Layout/Layout'
import Classes from "./payment.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../utils/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { Type } from "../../utils/action.type";
import { useNavigate } from "react-router-dom";
//import {toast} from 'react-toastify'

const Payment = () => {

  const [{user, basket }, dispatch] = useContext(DataContext);
  //console.log(user)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const element = useElements();
  const navigate = useNavigate();

  // Card styling for Stripe CardElement
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "12px 14px",
        border: "1px solid #e1e8ed",
        borderRadius: "8px",
        backgroundColor: "white",
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault()
    
    try{
      setProcessing(true);
    //backend function contact to the client secret
    const response = await axiosInstance({
      method: "post",
      url: `/payment/create?total=${total*100}`,
    });
    //console.log(response.data);
    //2 client side(react side confirmation)
    const ClientSecret = response.data?.client_secret;
    //3 after the confirmation order firebase save, clear basket
    const  {paymentIntent}  = await stripe.confirmCardPayment(ClientSecret, {
      payment_method: {
        card: element.getElement(CardElement),
      },
    }); 
    //console.log(paymentIntent);
    await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
      basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });

    setProcessing(false);
    navigate("/orders", {state:{msg:"you have placed a new order"}})

    //toast.success("Order saved successfully!");
    dispatch({
      type:Type.EMPTY_CART
    })
  }catch (error) {
    console.error("Payment processing error:", error);
    setProcessing(false)

  }

    
  };

  return (
    <LayOut>
      {/* header */}
      <div className={Classes.payment_header}>
        Check out ({totalItem}) {totalItem === 1 ? "item" : "items"}
      </div>
       {/* payment */}
       <section className={Classes.payment}>
         {/* address*/}
         <div className={Classes.flex}>
          <h3>Deliver address</h3>
         <div>
         <div>{user?.email || "Guest checkout"}</div>
         <div>{user?.email?.split("@")[0]}</div>
         <div>Chicago, L</div>
          </div>
          </div>
         <hr/>

          {/*product */}
          <div className={Classes.flex}>
          <h3>Review item and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard product={item} flex={true} key={i} />
            ))}
          </div>
        </div>
        <hr />
          <hr/>

           {/* card form */}
           <div className={Classes.flex}>
          <h3>Payment method</h3>
          <div className={Classes.payment_card_component}>
            <div className={Classes.payment_details}>
              <form onSubmit= {handlePayment}>
                {/* Error message */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Payment card */}
                <CardElement 
                  onChange={handleChange}
                  options={cardStyle}
                />
                
                {/* Security notice */}
                <div className={Classes.security_notice}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                  <span>Your payment details are secured with 256-bit SSL encryption</span>
                </div>

                {/* price*/}
                <div className={Classes.payment_price}>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <p>Total order |</p>
                    <CurrencyFormat amount={total} />
                  </span>
                  <button type="submit" disabled={processing}>
                  {processing ? (
                      <div className={Classes.loading}>
                        <ClipLoader size={12} color="gray" /> <p>Please wait</p>{" "}
                      </div>
                    ) : (
                      "Pay now"
                    )}
                  </button>
                </div>
              </form>
             </div>
            </div>
          </div>
        </section>
    </LayOut>
    
  )
}

export default Payment