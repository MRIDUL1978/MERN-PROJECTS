import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-slate-900 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={closeMenu}>
            <h1 className="text-2xl font-bold text-white">PassOp</h1>
          </Link>

          <ul className="hidden md:flex items-center space-x-6">
            <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              <Link to="/about">About</Link>
            </li>
            <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
              <Link to="/contactus">Contact Us</Link>
            </li>

            {!user ? (
              <>
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Link to="/signin">Sign In</Link>
                </li>
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <ul className="flex flex-col space-y-4 mt-4 text-center">
              <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                <Link to="/about" onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                <Link to="/contactus" onClick={closeMenu}>
                  Contact Us
                </Link>
              </li>

              {!user ? (
                <>
                  <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <Link to="/signin" onClick={closeMenu}>
                      Sign In
                    </Link>
                  </li>
                  <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <Link to="/signup" onClick={closeMenu}>
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
