import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/Metadata";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../component/layout/Header/Header";
import Footer from "../../component/layout/Footer/Footer.js";
import CartNav from "../Cart/allCartNav"

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <CartNav />
      <Fragment>
        <MetaData title="Meds Next Door" />
        <div className="banner" >
          <h1 style={{ color: "black", fontSize: "xx-large" }}>Find your Needful medicine</h1>

          <a href="#container">
            <button className="button-29">
              Click Here
              <CgMouse />
            </button>

          </a>
        </div>
        <h2 className="homeHeading">Available Medicines</h2>
        <div className="container" id="container">
          {products &&
            products.map((product, key) => <Product product={product} />)}
        </div>
      </Fragment>
      <Footer />
    </>
  );
};

export default Home;
