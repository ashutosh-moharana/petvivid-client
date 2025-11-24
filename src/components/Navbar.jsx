import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdMenu, MdClose, MdLogout, MdLogin, MdPersonAdd } from "react-icons/md";
import Logout from "./Logout";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200 px-4 py-2 rounded-full hover:bg-white/5"
    >
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="PetVivid Logo" className="w-8 h-8 object-contain invert" />
              <h1 className="text-xl font-bold tracking-tighter text-white">
                Pet<span className="text-primary">Vivid</span>
              </h1>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
                <Link to="/your-posts" className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors px-3 py-1.5 rounded-full hover:bg-white/5">
                  {user?.userpic ? (
                    <img src={user.userpic} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-border">
                      <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <span>Your Posts</span>
                </Link>
                <Logout />
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-border">
                <Link to="/login" className="text-sm font-medium text-white hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-white/5">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 px-5 rounded-full transition-all duration-200 shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-text-muted hover:text-white focus:outline-none p-2 rounded-full hover:bg-white/5"
            >
              {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border absolute w-full animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
            <NavLink to="/contact" onClick={toggleMenu}>Contact</NavLink>

            <div className="h-px bg-border my-2 mx-4"></div>

            {isLoggedIn ? (
              <>
                <Link
                  to="/your-posts"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {user?.userpic ? (
                    <img src={user.userpic} alt="Profile" className="w-8 h-8 rounded-full object-cover border border-border" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center border border-border">
                      <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <span>Your Posts</span>
                </Link>
                <div className="px-4 py-2">
                  <Logout onLogout={toggleMenu} />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 px-4 mt-2">
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl text-sm font-medium text-white hover:bg-surface transition-colors"
                >
                  <MdLogin /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-red-900/20"
                >
                  <MdPersonAdd /> Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
