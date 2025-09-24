import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";
import { producturl } from "../../Api/endPoints";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // start with loading = true

  useEffect(() => {
    axios
      .get(`${producturl}/products`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // stop loading
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false); // stop loading even if error
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
           <ProductCard
           renderAdd={true}
           renderDesc={false}  // Add this line
           product={singleProduct}
           key={singleProduct.id}
         />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;
