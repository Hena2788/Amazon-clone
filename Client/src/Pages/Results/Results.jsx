import { useParams } from "react-router-dom";
import LayOut from "../../Component/Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
import classes from "./result.module.css";

const Results = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { categoryType } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const fetchResults = async () => {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/category/${categoryType}`
        );
        setResults(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResults();
  }, [categoryType]);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.header}>
            <h1>Results</h1>
            <p>Category / {categoryType}</p>
          </div>
          <hr />
          <div className={classes.products_container}>
            {results?.map((singleResults) => {
              return (
                <ProductCard product={singleResults} key={singleResults.id} />
              );
            })}
          </div>
        </>
      )}
    </LayOut>
  );
};

export default Results;
