import { useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import Loader from "@/lib/core/Loader";
import api from "@/utils/api";
import type { Product } from "@/types/type";
import { StarIcon } from "@/lib/icons";
import styles from "./Product.module.css";

interface ApiResponse {
  product: Product;
  similarProducts: Product[];
}

const fetchProduct = async (productId: string) => {
  return await api.get<ApiResponse>(`/product/${productId}`);
};

function ProductPage() {
  const { productId } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId as string),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = data?.product?.description as string;
    }
  }, [data?.product?.description]);

  if (!productId) {
    return <p>Product Not Found</p>;
  }

  if (isLoading) {
    return <Loader display="screen" />;
  }

  const product = data?.product;
  const similarProducts = data?.similarProducts;

  return (
    <div className="pt-[15px]">
      {product && (
        <div className="flex gap-4">
          <img
            src={product.img}
            alt="product_image"
            className="sticky top-[92px] h-[calc(100vh-112px)] rounded-md object-cover"
          />

          <div>
            <div className="font-bold text-[#9d9fa8]">
              {product.brand.toUpperCase()}
            </div>
            <h3 className="my-2">{product.name}</h3>

            <div className="my-1 flex gap-2">
              <span className="flex font-semibold">
                {product.avg_rating.toFixed(1)}{" "}
                <StarIcon className="h-5 text-[#E3B100]" />
              </span>
              <span>|</span>
              <span className="text-[15px] text-[#468FCE]">
                {product.ratingCount} Ratings
              </span>
            </div>

            <hr />

            <span className="mt-6 inline-block font-bold">PRICE</span>

            <div className="flex items-center gap-4">
              <span className="text-[20px] font-semibold">
                ₹ {product.price}
              </span>
              <span className="inline-block rounded bg-[#9d9fa8]/[.4] px-1.5 text-sm">
                Inclusive of all taxes
              </span>
            </div>

            {Object.keys(product.p_attributes).length > 0 && (
              <div>
                <span className="mb-1 mt-6 inline-block font-bold">
                  PRODUCT ATTRIBUTES
                </span>

                <div className="grid grid-cols-2 text-[15px] text-[#494a50]">
                  {Object.entries(product.p_attributes)
                    .filter((entrie) => entrie[1] !== "NA")
                    .map(([key, value]) => (
                      <Fragment key={key}>
                        <span>{key}</span>
                        <span>{value}</span>
                      </Fragment>
                    ))}
                </div>
              </div>
            )}

            {Object.keys(product.p_attributes).length === 0 && (
              <div>
                <span className="mt-6 inline-block font-bold">DESCRIPTION</span>
                <p
                  ref={descriptionRef}
                  className={styles.productDescription}
                ></p>
              </div>
            )}
          </div>
        </div>
      )}

      {similarProducts && (
        <div className="mt-5">
          <h3 className="mb-5">Similar Products</h3>

          <div className="flex gap-2 overflow-hidden *:w-[200px]">
            {similarProducts.map((product) => (
              <ProductCard key={product?.p_id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
