import { HeartIcon } from "@heroicons/react/24/outline";
const Navbar = ({ numOfResult, search, setSearch, NumOfFavorites }) => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Logo</div>
      <input
        type="text"
        className="text-field"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="navbar__result">Found {numOfResult} Results</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{NumOfFavorites}</span>
      </button>
    </nav>
  );
};
export default Navbar;
