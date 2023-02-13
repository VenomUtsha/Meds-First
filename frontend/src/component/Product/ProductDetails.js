import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import image from "../../images/rx.jpg";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Header from "../../component/layout/Header/Header";
import Footer from "../../component/layout/Footer/Footer.js";
import { addItemsToCart } from "../../actions/cartAction"
import ProductNav from "../Product/productNav";


const ProductDetails = () => {
  const navigate = useNavigate();
  /////match.params.id doesnot work
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, details, error } = useSelector(
    (state) => state.productDetails
  );


  const [quantity, setQuantity] = useState(1);

  //console.log(details)

  ////review star options
  const options = {
    edit: false,
    color: "white",
    value: product.rating,
    activeColor: "red",
    isHalf: true,
    size: window.innerWidth < 500 ? 20 : 25,
  };

  // console.log("hello " + id);


  const increase = () => {

    if (product.stock > quantity) {
      console.log(quantity);
      const q = quantity + 1;
      setQuantity(q);
    }

  }
  const decrease = () => {
    if (quantity > 1) {
      const q = quantity - 1;
      setQuantity(q);
    }
  }


  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);


  /////add cart


  const addCart = () => {
    dispatch(addItemsToCart(id, quantity));
    alert("Item has been added to cart")
    navigate("/cart");

  }


  return (
    <>
      {/* <Header/> */}
      <ProductNav />
      <Fragment>
        <div className="ProductDetails">
          <div>
            <img className="CarouselImage" src={image} alt="image111" />
            {/* {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  //key={item.url}
                  src={image}
                  alt={`${i} Slide`}
                /> 
              ))} */}
          </div>

          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p >Product # {/*product._id*/}</p>
            </div>

            <div className="detailsBlock-3">
              <h1>{`${product.price}/=`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decrease}>-</button>
                  <input type="number" value={quantity} />
                  <button onClick={increase}>+</button>
                </div>
                <button className="last_button" onClick={addCart}><p>Add to Cart <span className="span1">🛍</span></p></button>
              </div>

              <p>
                Status:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>

            {/* <button className="submitReview">Submit Review</button> */}
          </div>
        </div>
      </Fragment>
      <Footer />
    </>

  );
};
export default ProductDetails;
