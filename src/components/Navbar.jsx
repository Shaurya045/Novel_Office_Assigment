import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import ThemeToggle from "./ThemeToggle";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { theme } = useContext(StoreContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const headerBg = theme === "dark" ? "bg-gray-900" : "bg-blue-600";
  const textColor = "text-white";

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`${headerBg} ${textColor} shadow-md`}>
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-medium">Loan Calculator</h1>
          </div>

          {isMobile ? (
            <div className="flex items-center">
              <ThemeToggle />
              <button
                className="ml-2 p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                    } px-4 py-2 rounded-md`
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/exchange_rates_live"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                    } px-4 py-2 rounded-md`
                  }
                >
                  EXCHANGE RATES (LIVE)
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                    } px-4 py-2 rounded-md`
                  }
                >
                  ABOUT
                </NavLink>
                <NavLink
                  to="/error_page"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                    } px-4 py-2 rounded-md`
                  }
                >
                  ERROR PAGE
                </NavLink>
              </div>
              <ThemeToggle />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="pb-4 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                  } px-4 py-2 rounded-md`
                }
                onClick={closeMenu}
              >
                HOME
              </NavLink>
              <NavLink
                to="/exchange_rates_live"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                  } px-4 py-2 rounded-md`
                }
                onClick={closeMenu}
              >
                EXCHANGE RATES (LIVE)
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                  } px-4 py-2 rounded-md`
                }
                onClick={closeMenu}
              >
                ABOUT
              </NavLink>
              <NavLink
                to="/error_page"
                className={({ isActive }) =>
                  `${
                    isActive ? "bg-white/20 font-medium" : "hover:bg-white/10"
                  } px-4 py-2 rounded-md`
                }
                onClick={closeMenu}
              >
                ERROR PAGE
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
