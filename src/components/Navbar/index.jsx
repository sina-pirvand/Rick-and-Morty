import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar = ({ numOfResult }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo</div>
      <input type="text" className="text-field" placeholder="Search..." />
      <div className="navbar__result">Found {numOfResult} Results</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
    </nav>
  );
};
export default Navbar;
