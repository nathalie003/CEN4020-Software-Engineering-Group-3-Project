import React from 'react';
import Logo from '../Assets/Logo.png';
import {Link} from 'react-router-dom';
import '../Styles/Navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='LeftSide'>
        <img src={Logo}/>
      </div>
      <div className='RightSide'>
        <Link to='/'>Home</Link>
        <Link to='/Menu'>Menu</Link>
        <Link to='/About'>About</Link>
        <Link to='/Contact'>Contact</Link>
      </div>
    </div>
  )
}

export default Navbar
