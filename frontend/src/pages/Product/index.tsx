import { useEffect, useRef, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import Loader from "@/lib/core/Loader";
import api from "@/utils/api";
import type { Product } from "@/types/type";
import { AvatarIcon, StarIcon } from "@/lib/icons";
import styles from "./Product.module.css";

const fetchProduct = async (productId: string) => {
  return await api.get<Product>(`/product/${productId}`);
};

function ProductPage() {
  const { productId } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const { data: product, isFetching } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId as string),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = product?.description as string;
    }
  }, [product]);

  if (!productId) {
    return <p>Product Not Found</p>;
  }

  if (isFetching) {
    return (
      <div className="grid h-[calc(100vh-150px)] place-items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-[8%]">
      <div className="fixed left-0 z-[10] flex w-full items-center gap-4 border-b bg-white px-[8%] py-2">
        <h1 className="text-center text-orange-800">
          <Link to="/">Myntra</Link>
        </h1>

        <SearchBar className="mr-0 sm:w-[286px] md:w-[380px] lg:w-[566px]" />
        <AvatarIcon className="h-10 w-10 flex-shrink-0 text-orange-700" />
      </div>

      <div className="pt-[92px]">
        {product && (
          <div className="flex gap-4">
            <img
              src={product.img}
              alt="product_image"
              className="sticky top-[92px] h-[calc(100vh-132px)] rounded-md object-cover"
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
                  <span className="mt-6 inline-block font-bold">
                    DESCRIPTION
                  </span>
                  <p
                    ref={descriptionRef}
                    className={styles.productDescription}
                  ></p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="mb-2">Similar Products</h3>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
