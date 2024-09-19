import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/lib/core/Loader";
import Button from "@/lib/core/Button";
import MyProduct from "@/components/Product";
import SearchBar from "@/components/SearchBar";
import ProductsContainer from "@/components/ProductsContainer";
import type { Product } from "@/types/type";
import api from "@/utils/api";

const fetchProducts = async ({ page }: { page: number }) => {
  const results = await api.get<Product[]>(
    `/products?page=${page}&per_page=10`,
  );

  return {
    results,
    nextPage: page + 1,
  };
};

function HomePage() {
  const {
    data: products,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return (
    <div className="px-[8%] py-8">
      <h1 className="mb-6 text-center text-orange-800">
        <Link to="/">Myntra</Link>
      </h1>

      <SearchBar />

      <ProductsContainer className="my-6">
        {products?.pages
          .flatMap((product) => product.results)
          .map((product) => <MyProduct key={product.p_id} product={product} />)}
      </ProductsContainer>
      {isFetching && (
        <div className="flex justify-center">
          <Loader />
        </div>
      )}
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={fetchNextPage}>Load More</Button>
      </div>
    </div>
  );
}

export default HomePage;
