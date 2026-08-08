import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import iconP from "../../assets/iconP.png";
import { Link } from "react-router-dom";

// overflow-hidden
function Header() {
  return (
    <header className="h-16 w-full bg-surface-container border-outline shadow-md  overflow-hidden">
      <div className="flex justify-start items-center  w-full h-16">
        <img className="h-32 w-auto ml-3" src={logo} alt="logo" />

        <nav className="flex items-center gap-6 h-16 w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative pb-1 transition-colors
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-primary after:transition-all left-6
     ${
       isActive
         ? "text-primary font-semibold after:w-full"
         : "text-text-secondary hover:text-primary after:w-0 hover:after:w-full"
     }`
            }
          >
            Домашняя страница
          </NavLink>
          <NavLink
            to={"/login"}
            className="flex ml-auto gap-2 right-6 relative pb-1 text-text-secondary hover:text-primary transition-colors
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:h-0.5 after:w-0 after:bg-primary after:transition-all
             hover:after:w-full"
          >
            <span className="px-2">Войти</span>
            <img className="h-6 w-6" src={iconP} alt="icon" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
export default Header;
