import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import './assets/navbar.css'
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const { isAuthenticated, verifyAuthSimple,logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const response = await axios.get('http://192.168.0.119:4000/api/userData', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
       // console.log(response.data.user);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    } else {
      setUserData(null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    verifyAuthSimple();
  }, [verifyAuthSimple]);

  const navigateto = (place) => {
    navigate(`/${place}`);
  };
  const handleLogout = () => {
    logout(navigate);
  };
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <header className="header">
      <div className="menu__wrapper">
        <div className="menu__bar">
          <Link to="/" title="Home" aria-label="home" className="logo">
            <img src="http://192.168.0.119:3000/img/logowhite.png" alt="logo" />
          </Link>
          <nav>
            <ul className="navigation hide">
              
              <li>
                <Link to="/productos">
                  Productos
                </Link>
              </li>
              <li>
                <a href="#pricing" title="Pricing">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#docs" title="Docs">
                  Ayuda
                </a>
              </li>
              <li>
                <a href="#blog" title="Blog">
                  SobreNosotros
                </a>
              </li>

              

            </ul>
          </nav>
        </div>
        <div className="action-buttons ">
          
        {userData ? (
          <ul className='navigation '>
            <li>
          <button type="button" className=''>
           <a>{userData[0].username} </a>
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
              <path d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"></path>
            </svg>
          </button>
          <div className="dropdown__wrapper">
            <div className="dropdown">
              <ul className="list-items-with-description">
               
                <li>
                  <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M11.5 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6v-5.5c0-3.07-2.13-5.64-5-6.32V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1l-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></g></svg>
                  </div>
                  <div className="item-title" onClick={() => navigateto("notifications")}>
                    <h3>Notifications</h3>
                    <p>0 Notifications</p>
                  </div>
                </li>
              
                <li>
                  <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </div>
                  
                  <div className="item-title" onClick={() => navigateto("viewcart")}>
                    <h3>Cart</h3>
                    <p>See your cart</p>
                  </div>
                </li>

                <li>
                <div className="icon-wrapper" >
                              <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#ffffff">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <title>profile_round [#1342]</title>
                        <desc>Created with Sketch.</desc>
                        <defs></defs>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                          <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -2159.000000)" fill="#ffffff">
                            <g id="icons" transform="translate(56.000000, 160.000000)">
                              <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" id="profile_round-[#1342]"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg> 
                  </div>
                  <div className="item-title" onClick={() => navigateto("dashboard")}>
                    <h3>Profile</h3>
                    <p>Manage your profile</p>
                  </div>
                </li>
                
                <li>
                  <div className="icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H6C5.44772 19 5 18.5523 5 18V6C5 5.44772 5.44772 5 6 5H17C17.5523 5 18 4.55228 18 4C18 3.44772 17.5523 3 17 3H6ZM15.7071 7.29289C15.3166 6.90237 14.6834 6.90237 14.2929 7.29289C13.9024 7.68342 13.9024 8.31658 14.2929 8.70711L16.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H16.5858L14.2929 15.2929C13.9024 15.6834 13.9024 16.3166 14.2929 16.7071C14.6834 17.0976 15.3166 17.0976 15.7071 16.7071L19.7071 12.7071C20.0976 12.3166 20.0976 11.6834 19.7071 11.2929L15.7071 7.29289Z" fill="#ffffff"></path> </g></svg>
                  </div>
                  <div className="item-title" onClick={handleLogout}>
                    <h3>Logout</h3>
                    <p>AI toolkit to manage embeddings</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </li>
            </ul>
          ) : (
            <Link to="/login" className='secondary'>Sign in</Link>
          )}
          
        </div>
        <button
        aria-label="Open menu"
        className="burger-menu"
        type="button"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </button>

      <div className={`mobile-menu ${menuVisible ? 'visible' : ''}`}>
  <div className={`menu-items ${menuVisible ? 'visible' : ''}`}>
  
    <ul>
      <li>
        <Link to="/productos" onClick={toggleMenu}>
          Productos
        </Link>
      </li>
      <li>
        <a href="#pricing" title="Pricing" onClick={toggleMenu}>
          Ofertas
        </a>
      </li>
      <li>
        <a href="#docs" title="Docs" onClick={toggleMenu}>
          Ayuda
        </a>
      </li>
      <li>
        <a href="#blog" title="Blog" onClick={toggleMenu}>
          SobreNosotros
        </a>
      </li>
      <li>
      <button
      aria-label="Close menu"
      className="close-menu"
      type="button"
      onClick={toggleMenu}
    >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-x"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
      </li>
    </ul>
  </div>
</div>
      </div>
     
    </header>
  );
};

export default Navbar;