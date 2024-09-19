import { cn } from "@/utils/cn";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@/lib/icons";

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
    <form onSubmit={handleSearch} className={cn("mx-auto", className)}>
      <span className="relative">
        <input
          type="text"
          name="searchBar"
          className="peer block w-full rounded-md border-gray-400 bg-gray-50 pl-[40px] placeholder:text-gray-600 focus:border-orange-800 focus:ring-orange-800"
          placeholder="Search Products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <SearchIcon
          className={cn(
            "absolute left-[10px] top-[9px] h-6 text-gray-600 peer-focus-within:text-orange-900",
          )}
        />
      </span>
    </form>
  );
}

export default SearchBar;
