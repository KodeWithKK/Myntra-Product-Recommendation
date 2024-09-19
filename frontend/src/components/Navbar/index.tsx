import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AvatarIcon } from "@/lib/icons";

function Navbar() {
  return (
    <div className="fixed left-0 z-[10] flex w-full items-center gap-4 border-b bg-white px-[8%] py-2 shadow-sm">
      <h1 className="text-center text-orange-800">
        <Link to="/">Myntra</Link>
      </h1>

      <SearchBar className="mr-0 sm:w-[286px] md:w-[380px] lg:w-[566px]" />
      <AvatarIcon className="h-10 w-10 flex-shrink-0 text-orange-700" />
    </div>
  );
}

export default Navbar;
