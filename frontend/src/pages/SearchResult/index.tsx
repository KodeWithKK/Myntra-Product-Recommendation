import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductsContainer from "@/components/ProductsContainer";
import MyProduct from "@/components/Product";
import Loader from "@/lib/core/Loader";
import SearchBar from "@/components/SearchBar";
import Button from "@/lib/core/Button";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Product } from "@/types/type";
import api from "@/utils/api";

const fetchProducts = async ({
  searchQuery,
  page = 1,
  per_page = 10,
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

  return (
    <div className="px-[8%] py-8">
      <h1 className="mb-6 text-center text-orange-800">
        <Link to="/">Myntra</Link>
      </h1>

      <SearchBar />

      <p className="mt-4 text-[15px]">
        Showing search Result for:{" "}
        <span className="font-medium">{searchQuery}</span>
      </p>

      <ProductsContainer className="mb-6 mt-2">
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

export default SearchResultPage;
