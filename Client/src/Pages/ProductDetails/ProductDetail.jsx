import React, { useEffect } from 'react'
import LayOut from '../../Component/Layout/Layout'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Component/Product/ProductCard';
import Loader from '../../Component/Loader/Loader';

const ProductDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
      const { productId } = useParams();
  
      useEffect(()=>{
        setIsLoading(true)
       const fetchDetail = async () => {
        try {
          const { data } = await axios.get(
              `https://fakestoreapi.com/products/${productId}`
            );
            // console.log(data)
            setDetail(data)
            setIsLoading(false)
          
        } catch (error) {
          console.log(error)
          setIsLoading(false)
        }
            

      }
      fetchDetail();
      },[])


  return (
    <LayOut>
      {
        isLoading ? <Loader/> : <div>
        {detail && <ProductCard product={detail} flex={true} description ={true}/>}
      </div>
      }
      
    </LayOut>
  );
}

export default ProductDetail