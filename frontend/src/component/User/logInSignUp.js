import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import "./logInSignUp.css";
import image from "../../images/sun-tornado.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

const move = keyframes`
0%{
    opacity:0;
}
95%{
    opacity:1;
}
`;

const Main = styled.div`
  .main {
    background-image: url(${image});
    background-attachment: fixed;
    background-size: cover;

    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
`;

const BackgroundBox = styled.div`
  background-color: #4c87e6;
  height: 65vh;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15rem auto;

  position: relative;
  border-radius: 23px;

  .signin {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "-600" : "500")};
    transform: ${(props) => (props.clicked ? "none" : "translateX(-70%)")};
    transition: all 1s;
  }

  .signup {
    position: absolute;
    top: 0%;
    text-align: center;
    z-index: ${(props) => (props.clicked ? "500" : "-600")};
    transform: ${(props) => (props.clicked ? "translateX(70%)" : "none")};
    transition: all 1s;
  }

  .text1 {
    z-index: ${(props) => (props.clicked ? "-600" : "600")};
    transform: ${(props) =>
    props.clicked ? "translateX(0)" : "translateX(100%)"};

    transition: transform 1s ease-in-out;

    animation: ${(props) => (props.clicked ? move : "none")} 1s;
  }
  .text2 {
    z-index: ${(props) => (props.clicked ? "700" : "-700")};
    transform: ${(props) =>
    props.clicked ? "translateX(-100%)" : "translateX(0%)"};

    transition: transform 1s ease-in-out;

    animation: ${(props) => (props.clicked ? "none" : move)} 1s;
  }
`;

const Box1 = styled.div`
  background-color: #f1fdcd;
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(90%)" : "translateX(5%)"};
  transition: transform 1s;

  &::after,
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f1fdcd;
    z-index: -200;
  }

  &::before {
    top: 3rem;
    border-radius: 23px;
  }
  &::after {
    bottom: 3rem;
    border-radius: 23px;
  }
`;

const Box2 = styled.div`
  background-color: #4c87e6;
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;

  transform: ${(props) =>
    props.clicked ? "translateX(-110%)" : "translateX(5%)"};
  transition: transform 1s;
  border-radius: ${(props) =>
    props.clicked ? "23px 0 0 23px" : "0 23px 23px 0"};
`;

const Form = styled.form`
  color: #1b1b1b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 4rem;
  //z-index: 100;
`;

const Input = styled.input`
  background-color: #fff;
  border: none;

  border-bottom: 3px solid #d72f0a;
  padding: 1rem 2rem;

  margin: 0.5rem 0;
  width: 100%;

  &:focus {
    outline: none;
    border: none;
    border: 3px solid #d72f0a;
  }
`;

const Button = styled.button`
  border-radius: 3px;
  padding: 1rem 3.5rem;
  margin-top: 1rem;
  border: 1px solid black;
  background-color: black;
  color: #fff;
  cursor: pointer;
  letter-spacing: 1px;
  box-shadow: 0 7px #999;
  &:hover {
    background-color: #1b1b1b;
  }
  &:active {
    background-color: black;
    box-shadow: 0 2px #666;
    transform: translateY(7px);
  }
  &:focus {
    outline: none;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  margin: 1rem 0;
`;

const ButtonAnimate = styled.button`
  position: absolute;
  z-index: 1000;
  height: 5rem;
  width: 5rem;
  top: 70%;
  border: none;
  cursor: pointer;
  background-color: transparent;

  &::before {
    content: "→";
    font-size: 4rem;
  }

  right: ${(props) => (props.clicked ? "52%" : "50%")};
  transform: ${(props) => (props.clicked ? "rotate(180deg)" : "rotate(0)")};
  transition: all 1.5s;

  &:focus {
    outline: none;
  }
`;

const Text = styled.div`
  position: absolute;
  z-index: 1000;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  letter-spacing: 0.2rem;
  color: #fff;
  .attention {
    font-size: 2.5rem;
    position: relative;
    margin-top: 2rem;
  }

  .attention-icon {
    position: absolute;
    right: ${(props) => (props.clicked ? "0" : "none")};
    top: 100%;
    font-size: 5rem;
  }
`;

function Formcomponent() {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, isauthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bankAccount: "",
  });

  const { name, email, password, phone, bankAccount } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      console.log(error);
      dispatch(clearErrors());
    }
    if (isauthenticated) {
      navigate("/home");
    }
  }, [dispatch, error, isauthenticated, navigate]);

  const registerDataChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();


    dispatch(register(name, email, password, phone, bankAccount));
  };

  const handleClick = () => setClick(!click);

  return (
    <>
      <div className="main">
        <BackgroundBox clicked={click}>
          {/* <ButtonAnimate clicked={click} onClick={handleClick}></ButtonAnimate> */}

          <Form className="signin">
            <Title>Sign In</Title>
            <Input
              type="email"
              required
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              id="passwordId"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Link href="#">Forgot Your Password?</Link>
            <Button onClick={loginSubmit}>Sign In</Button>
          </Form>

          <Form className="signup">
            <Title>Sign Up</Title>

            <Input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={registerDataChange}
            />
            <Input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={registerDataChange}
            />

            <Input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={registerDataChange}
            />
            <Input
              type="phone"
              placeholder="phone"
              required
              name="phone"
              value={phone}
              onChange={registerDataChange}
            />
            <Input
              type="bankAccount"
              placeholder="bankAccount"
              required
              name="bankAccount"
              value={bankAccount}
              onChange={registerDataChange}
            />
            {/* <Link href="#" onClick={handleClick}>
              Already have an Account?
            </Link> */}
            <Button onClick={registerSubmit}>Sign Up</Button>
          </Form>
          <Box1 clicked={click} />
          <Box2 clicked={click} onClick={handleClick} />

          <Text className="text2 " clicked={click} onClick={handleClick}>
            <h1>Hi,There!</h1>
            Already have an account?
            <br />
            <span clicked={click} onClick={handleClick} className="attention">
              Click Here
            </span>
          </Text>

          <Text className="text1" clicked={click} onClick={handleClick}>
            <h1>Welcome To </h1>
            <h1>Meds Next Door </h1>
            Don't have an account?
            <br />
            <span clicked={click} onClick={handleClick} className="attention">
              Click Here
            </span>
          </Text>
        </BackgroundBox>
      </div>
    </>
  );
}

export default Formcomponent;
