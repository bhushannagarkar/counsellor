import React from 'react'
import './Navbar.css'
import WebLogo from "../../public/logo.jpg"
const Navbar = () => {
  return (
    <div className="AdminDivBody">
    <img src={WebLogo} className="logo-image" alt="logo-image" />
    <div className="companyText">
      <marquee behavior="" direction="left">
        <h1 className="psychortexHead">
          Welcome to... Psycortex Pvt. Ltd.
        </h1>
      </marquee>
    </div>
      </div>
  )
}

export default Navbar