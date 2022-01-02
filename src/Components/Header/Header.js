import React from 'react';
import { Link } from 'react-router-dom';
import logo from './risingBull.png';

const Header = ()=>{ 
return (

    <div className="ui secondary pointing menu"> 
    <div> < img src= {logo} alt='logo' width='60px'/></div>
    <Link to="/Home" className="item"> Crypto Bull</Link>
    <Link to="/dashboard" className="item"> My Account</Link>
    <Link to="/login" className="right item"> Sign in <i class="user secret icon"></i></Link>
    </div>
);
};

export default Header;