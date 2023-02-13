import axios from "axios";
import { useState, useEffect } from "react";
import "../profile/profile.css"
import NavbarProfile from '../navbar';


const Profile = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4001")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });
  return (
<>
<NavbarProfile/>
        <div className="headerdiv">
        
          <h1 className="yourProfileStyle">Your Profile</h1>
          <div className="upperdiv">
            <h1 className="namestyle">Abhishek Dey</h1>
            <button className="signoutbutton">Signout</button>
          </div>
        </div>

        <div className="image_orderlist">


          <div className="profileImage">
            {data.map((singleData) => {
              const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
              }, ''));
              return <img className="sourceImage" src={`data:image/png;base64,${base64String}`} width="1000" />
            })}
          </div>
          <div className="container_orderlist">
            <div class="description">
              <h2>Classic Peace Lily</h2>
              <h4>Popular House Plant</h4>
              <h1>$18</h1>
              <p>Classic Peace Lily is a spathiphyllum floor plant arranged in a bamboo planter with a blue & red ribbom and butterfly pick.</p>
              <button>Add to Cart</button>
              <button>Wishlist</button>
            </div>
          </div>    
        </div>  
      
      </>
  );

}

export default Profile;