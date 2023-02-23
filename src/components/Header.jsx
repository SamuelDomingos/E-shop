import "./Header.css"

import {Link, NavLink} from "react-router-dom";
import {BsCartDashFill, BsFillHeartFill, BsSearch} from "react-icons/bs"
import {BiExit} from "react-icons/bi";
import {FaUserAlt} from "react-icons/fa"
import { useStateContext } from "../context/StateContext";
import { useAuth } from '../context/AuthContext';

const Header = () => {

    const {cartItems} = useStateContext();
    const { user, profileImageUrl, logout } = useAuth();

  return (
    <div className='header flex'>
        <Link to="/">
        <div className="logo"><h2>E-shop</h2></div>
        </Link>

        <div className="buttons flex">

            {user ? (
              <NavLink to='/usuario'>
                { profileImageUrl &&
                  profileImageUrl ? (
                    <img className="img-perfil" src={profileImageUrl} alt="" />
                  ) : (
                    <FaUserAlt/>
                  )
                }
              </NavLink>
            ) : (
              <NavLink to='/register'>
                <FaUserAlt/>
              </NavLink>
            )}

            <NavLink className="cart-button" to="/cart">
                <BsCartDashFill/>
                {
                  cartItems.length < 1 ? (
                    ""
                  ) : (
                    <span className="flex cart-item-qty">
                      {cartItems.length}
                    </span>
                  )
                }
            </NavLink>

            {
              user ? (
                <button onClick={logout} className="btn-exit"><BiExit/></button>
              ): null
            }
        </div>
    </div>
  )
}

export default Header