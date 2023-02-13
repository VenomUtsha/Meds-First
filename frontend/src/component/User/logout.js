import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Logout = () => {
    const navigate = useNavigate()
    const [data,setData] = useState([])
    useEffect(() => {
        axios.get(`/api/v1/logout`).then((res) => {
            alert("Logged out successfully");
            navigate("/login");
        });
      }, []);
      

  return (
    <div></div>
  );
};

export default Logout;
