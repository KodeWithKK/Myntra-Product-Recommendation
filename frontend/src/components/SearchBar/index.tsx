import { cn } from "@/utils/cn";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  className?: string;
}

function SearchBar({ className }: Readonly<SearchBarProps>) {
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
    <form onSubmit={handleSearch} className={cn("mx-auto w-[60%]", className)}>
      <input
        type="text"
        name="searchBar"
        className="block w-full rounded-md focus:border-orange-800 focus:ring-orange-800"
        placeholder="Search Products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchBar;
