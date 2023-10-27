import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>BooksForU</h1>
      <div className="links">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/add-your-book" activeClassName="active">
          Add your Book
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
