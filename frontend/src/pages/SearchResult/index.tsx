import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductsContainer from "@/components/ProductsContainer";
import ProductCard from "@/components/ProductCard";
import Loader from "@/lib/core/Loader";
import Button from "@/lib/core/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Product } from "@/types/type";
import api from "@/utils/api";

const fetchProducts = async ({
  searchQuery,
  page = 1,
  per_page = 20,
}: {
  searchQuery: string;
  page: number;
  per_page?: number;
}) => {
  const results = await api.get<Product[]>(
    `/search?q=${searchQuery}&per_page=${per_page}&page=${page}`,
  );

  return {
    results,
    nextPage: page + 1,
  };
};

function SearchResultPage() {
  const { searchQuery } = useParams();

  const {
    data: products,
    fetchNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["search-products", searchQuery],
    queryFn: ({ pageParam }) =>
      fetchProducts({
        page: pageParam.page,
        searchQuery: searchQuery as string,
      }),
    initialPageParam: { page: 1, searchQuery },
    getNextPageParam: (lastPage) => ({
      page: lastPage.nextPage,
      searchQuery: searchQuery as string,
    }),
    enabled: !!searchQuery,
  });

  useEffect(() => {
    if (searchQuery) {
      refetch();
    }
  }, [searchQuery, refetch]);

  if (isLoading) {
    return <Loader display="screen" />;
  }

  return (
    <div className="">
      <p className="mt-4 text-[15px]">
        Showing search Result for:{" "}
        <span className="font-medium">{searchQuery}</span>
      </p>

      <ProductsContainer className="mb-6 mt-2">
        {products?.pages
          .flatMap((product) => product.results)
          .map((product) => (
            <ProductCard key={product.p_id} product={product} />
          ))}
      </ProductsContainer>

      {isFetching && <Loader display="bar" />}

      <div className="mt-8 flex justify-center">
        <Button onClick={fetchNextPage}>Load More</Button>
      </div>
    </div>
  );
}

export default SearchResultPage;
