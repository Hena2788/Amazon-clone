import React, { useContext, useState } from "react";
import LayOut from '../../Component/Layout/Layout'
import Classes from "./Payment.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import ProductCard from "../../Component/Product/ProductCard";
import CurrencyFormat from "../../Component/CurrencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import { ClipLoader } from "react-spinners";

const Payment = () => {
  const [{user, basket }] = useContext(DataContext);
  console.log(user)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce(
    (amount, item) => amount + item.price * item.amount,
    0
  );

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const element = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
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
              <form action="">
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
                  <button >
                    Pay Now
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