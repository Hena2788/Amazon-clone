import CarouselEffect from "../../Component/Carousel/Carousel"
import Category from "../../Component/Category/Category"
import Header from "../../Component/Header/Header"
import Layout from "../../Component/Layout/Layout"
import Product from "../../Component/Product/Product"


const Landing = () => {
  return (
    <>
    <Layout>
    <CarouselEffect/>
    <Category/>
    <Product/>
    </Layout>
    </>
  )
}

export default Landing