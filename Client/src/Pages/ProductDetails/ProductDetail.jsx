import React, { useEffect } from 'react'
import LayOut from '../../Component/Layout/Layout'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../Component/Product/ProductCard';
import Loader from '../../Component/Loader/Loader';
import { producturl } from '../../Api/endPoints';

const ProductDetail = () => {
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
      const { productId } = useParams();
      useEffect(()=>{
        setIsLoading(true)
       const fetchDetail = async () => {
        try {
          const { data } = await axios.get(
              `${producturl}/products/${productId}`
            );
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
        {detail && <ProductCard product={detail} flex={true} renderDesc={true}/>}
      </div>
      }
      
    </LayOut>
  );
}

export default ProductDetail