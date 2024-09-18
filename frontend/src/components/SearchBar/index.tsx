import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(`/search/${searchQuery}`);
    },
    [searchQuery, navigate],
  );

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        name="searchBar"
        className="mx-auto block w-[60%] rounded-md focus:border-orange-800 focus:ring-orange-800"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
