import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartNav from "../Cart/allCartNav";


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increase = (id, quantity, stock) => {
    const q = quantity + 1;
    if (stock <= quantity) {
      return; 
    }

    dispatch(addItemsToCart(id, q));
  };
  const decrease = (id, quantity, stock) => {
    const q = quantity - 1;
    if (1 >= quantity) {
      return;
    }

    dispatch(addItemsToCart(id, q));
  };

  console.log(cartItems);

  let total = 0;
  for (let i in cartItems) {
    total += cartItems[i].price * cartItems[i].quantity;
  }

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      {/* <Header /> */}
      <CartNav/>
      <Fragment>
        {cartItems.length === 0 ? (
          <div className="emptyCart">
            <p>No Products in Cart</p>
            <Link to="/home"> Find Products</Link>
          </div>
        ) : (
          <Fragment>
            <div className="cartPage">
              <div className="cartHeader">
                <p>Product</p>
                <p>Qunatity</p>
                <p>Amount</p>
              </div>

              {cartItems &&
                cartItems.map((item, key) => (
                  <div className="cartContainer" key={item.product}>
                    <CartItem item={item} />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decrease(item.product, item.quantity, item.stock)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increase(item.product, item.quantity, item.stock)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`${
                      item.price * item.quantity
                    }/=`}</p>
                  </div>
                ))}

              <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                  <p>Total:</p>
                  <p>{`${total}/=`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button onClick={checkoutHandler}>
                    <h4>Procceed Transaction</h4>
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
      <Footer />
    </>
  );
};

export default Cart;
