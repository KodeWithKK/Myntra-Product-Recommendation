import { useInfiniteQuery } from "@tanstack/react-query";
import Loader from "@/lib/core/Loader";
import Button from "@/lib/core/Button";
import ProductCard from "@/components/ProductCard";
import ProductsContainer from "@/components/ProductsContainer";
import type { Product } from "@/types/type";
import api from "@/utils/api";

const fetchProducts = async ({ page }: { page: number }) => {
  const results = await api.get<Product[]>(
    `/products?page=${page}&per_page=20`,
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
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => fetchProducts({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (isLoading) {
    return <Loader display="screen" />;
  }

  return (
    <>
      <h3 className="mb-4 mt-6">Trending Products</h3>

      <ProductsContainer>
        {products?.pages
          .flatMap((product) => product.results)
          .map((product) => (
            <ProductCard key={product.p_id} product={product} />
          ))}
      </ProductsContainer>

      {isLoading && <Loader display="screen" />}
      {isFetching && <Loader display="bar" />}

      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={fetchNextPage}>Load More</Button>
      </div>
    </>
  );
}

export default HomePage;
