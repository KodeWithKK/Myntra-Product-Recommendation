import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SearchResultPage from "./pages/SearchResult";
import ProductPage from "./pages/Product";

function App() {
  return (
    <div className="bg-gray-50 px-[8%]">
      <div className="block min-h-screen md:hidden">
        <div className="flex h-screen flex-col items-center justify-center text-center">
          <img src="/mascot.webp" alt="mascot" className="-mt-10 h-[240px]" />
          <p className="text-pretty">
            This demo application is currently optimized for desktop viewing and
            is not yet responsive for mobile devices. Please view on a desktop
            browser for the best experience.
          </p>
        </div>
      </div>

      <div className="hidden md:block">
        <Navbar />

        <div className="pb-[50px] pt-[77px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search/:searchQuery" element={<SearchResultPage />} />
            <Route path="/p/:productId" element={<ProductPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
