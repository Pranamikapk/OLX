import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/Arrow';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import './Header.css';
import { auth } from '../../firebase/config';

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? `Welcome ${user.displayName}` : (
            <span onClick={()=> navigate('/login')}>Login</span>
          )}</span>
          <hr />
        </div>
        <div className="logout">
          {user && ( <span onClick={()=>{auth.signOut()
          navigate('/login')}}>
            Logout
            </span>
          )}
        </div>
        {user? (
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={()=>
            navigate('/create')}>SELL</span>
          </div>
        </div>
        ):('')}
      </div>
    </div>
  );
};

export default Header;
