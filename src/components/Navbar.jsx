import { Link } from "react-router-dom";
import { RiMenu2Fill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";

const Navbar = () => {
  const { isLoggedIn, user,authLoading } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-2 sm:px-4 min-h-[4rem]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
            <RiMenu2Fill/>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-64 p-4 shadow-lg gap-1"
          >
            <li>
              <Link to="/" className="py-3 text-base">Home</Link>
            </li>
            
            {isLoggedIn && !authLoading  && <li>
             <Link to="/your-posts" className="py-3 text-base">Your Posts</Link>
          </li>}
            <li>
              <Link to="/about" className="py-3 text-base">About</Link>
            </li>
            <li>
              <Link to="/contact" className="py-3 text-base">Contact</Link>
            </li>
            {isLoggedIn && (
              <li className="lg:hidden mt-2">
                <Logout />
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl normal-case px-2 sm:px-4">
          <div>
            <img src="./logo.png" alt="PetVivid Logo" className="h-7 sm:h-8 invert" />
          </div>
          <span className="ml-2">PetVivid</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
         
          {isLoggedIn && !authLoading  && <li>
             <Link to="/your-posts">Your Posts</Link>
          </li>}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="navbar-end items-center gap-2 sm:gap-4">
          <p className=" size-8 md:size-10 flex justify-center items-center font-bold text-base sm:text-lg md:text-xl truncate max-w-[100px] sm:max-w-none rounded-full ring-1 ring-red-500">
            {user.name.split("")[0]}
          </p>
          <div className="hidden lg:block">
            
            <Logout />
          </div>
        </div>
      ) : (
        <div className="navbar-end gap-2">
          <Link to="/signup" className="btn btn-ghost btn-sm sm:btn-md px-2 sm:px-4">
            SignUp
          </Link>
          <Link to="/login" className="btn btn-primary btn-sm sm:btn-md px-2 sm:px-4">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
