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
                <CardElement onChange={handleChange}/>
                {/* price*/}
                <div className={Classes.payment_price}>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <p>Total order |</p>
                    <CurrencyFormat amount={total} />
                  </span>
                  <button type = "submit">
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