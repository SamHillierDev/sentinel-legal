import { FaSearch } from "react-icons/fa";

const SearchButton = () => (
  <button
    type="submit"
    className="text-md flex cursor-pointer items-center justify-center gap-2 rounded-r-lg bg-blue-500 px-4 py-2 text-nowrap text-white shadow-inner shadow-blue-400 transition hover:bg-blue-600 focus:outline-blue-400 active:bg-blue-700 active:shadow-blue-900"
  >
    <FaSearch className="text-white" />
    <span>Search</span>
  </button>
);

export default SearchButton;
