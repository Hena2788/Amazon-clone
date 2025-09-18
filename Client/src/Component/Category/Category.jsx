import React from "react";
import { categoryInfos } from "./categoryfullInfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";
const Category = () => {
  return (
    <section className={classes.category__container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.imgLink} data={infos} />
      ))}
    </section>
  );
}

export default Category;
