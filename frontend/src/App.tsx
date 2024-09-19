import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchResultPage from "./pages/SearchResult";
import ProductPage from "./pages/Product";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchQuery" element={<SearchResultPage />} />
      <Route path="/p/:productId" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
