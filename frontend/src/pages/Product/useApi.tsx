import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/type";
import api from "@/utils/api";

interface ApiResponse {
  product: Product;
  similarProducts: Product[];
}

const fetchProduct = async (productId: string) => {
  return await api.get<ApiResponse>(`/product/${productId}`);
};

function useApi({ productId }: { productId: string }) {
  const { data, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    placeholderData: keepPreviousData,
  });

  return { data, isFetching };
}

export default useApi;
