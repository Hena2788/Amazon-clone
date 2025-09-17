import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./carousel.module.css";

const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imgItem) => {
          return <img src={imgItem} alt="carousel" />;
        })}
      </Carousel>
      <div className={classes.hero__img}></div>
    </>
  );
};

export default CarouselEffect;
