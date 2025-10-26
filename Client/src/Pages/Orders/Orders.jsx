import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import classes from "./orders.module.css";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { db } from "../../utils/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Component/Product/ProductCard";

const Orders = () => {
  // FIX: Use array destructuring like in Payment component
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      setLoading(true);
      console.log("Setting up listener for user:", user.uid);
      
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const q = query(ordersRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(
          q, 
          (snapshot) => {
            console.log("Firestore snapshot received");
            const ordersData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Orders data:", ordersData);
            setOrders(ordersData);
            setLoading(false);
          }, 
          (error) => {
            console.error("Firestore error:", error);
            setLoading(false);
          }
        );

        return () => {
          console.log("Cleaning up orders listener");
          unsubscribe();
        };
      } catch (error) {
        console.error("Error setting up orders listener:", error);
        setLoading(false);
      }
    } else {
      console.log("No user found, skipping orders setup");
      setLoading(false);
    }
  }, [user]);

  // Debug logs to see what we have
  console.log("Current user:", user);
  console.log("Orders:", orders);
  console.log("Loading:", loading);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          
          {loading && <div>Loading orders...</div>}
          
          {!loading && !user && (
            <div>Please log in to view your orders.</div>
          )}
          
          {!loading && user && orders?.length === 0 && (
            <div>You don't have any orders yet.</div>
          )}
          
          {!loading && orders?.length > 0 && (
            <div className={classes.orders_list}>
              {orders.map((eachOrder, i) => (
                <div key={eachOrder.id || i} className={classes.order_item}>
                  <hr />
                  <p><strong>Order ID:</strong> {eachOrder.id}</p>
                  <p><strong>Order Date:</strong> {new Date(eachOrder.created * 1000).toLocaleDateString()}</p>
                  <p><strong>Total Amount:</strong> ${(eachOrder.amount / 100).toFixed(2)}</p>
                  
                  <div className={classes.order_products}>
                    <h4>Products:</h4>
                    {eachOrder.basket?.map((item) => (
                      <ProductCard 
                        product={item} 
                        flex={true} 
                        key={item.id} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
export default Orders;