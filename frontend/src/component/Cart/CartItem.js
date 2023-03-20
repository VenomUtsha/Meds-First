import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";
import image from "../../images/rx.jpg";
import { removeItemsFromCart } from "../../actions/cartAction";
import { useDispatch, useSelector } from "react-redux";


const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const remove = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (


    <div className="CartItemCard">
      <img src={image} alt="" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ${item.price}/=`}</span>
        <h1 onClick={() => remove(item.product)}>Remove 🗑 </h1>
      </div>
    </div>
  );
};

export default CartItemCard;


