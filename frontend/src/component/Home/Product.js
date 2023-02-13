import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import image from "../../images/rx.jpg";


const Product = ({ product }) => {


  const options = {
    edit: false,
    color: "white",
    value: product.rating,
    activeColor: "red",
    isHalf: true,
    size: window.innerWidth < 500 ? 20 : 25,
  }


  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={image} alt={product.name} />
      <p>{product.name}</p>
      <span>{`${product.price}/=`}</span>
    </Link>





  );
};

export default Product;
