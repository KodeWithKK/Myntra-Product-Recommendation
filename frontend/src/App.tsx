import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import SearchResultPage from "./pages/SearchResult";
import ProductPage from "./pages/Product";

function App() {
  return (
    <div className="bg-gray-50 px-[8%]">
      <Navbar />

      <div className="pb-[50px] pt-[77px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search/:searchQuery" element={<SearchResultPage />} />
          <Route path="/p/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
