import { LOGO_URL } from "../utils/constants";
import '../App.css';
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [btnReact,setBtnReact]=useState("login");
    console.log("Header rendered");
    
    useEffect(()=>{
        console.log("UseEffect  ko called");
    },[]);

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} alt="Hswg" />
            </div>

            <div className="nav-items">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li> <Link to="/contact">Contact Us</Link></li>
                    <li>Cart</li>
                    <button className="login" onClick={()=>{btnReact==="login"?setBtnReact("logOut"):setBtnReact("login")}}>{btnReact}</button>
                </ul>
            </div>


        </div>
    );
};

export default Header;
