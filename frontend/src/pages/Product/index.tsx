import { useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Loader from "@/lib/core/Loader";
import useCarousel from "@/hooks/useCarousel";
import useApi from "./useApi";
import { StarIcon, ArrowUpIcon } from "@/lib/icons";
import styles from "./Product.module.css";

function ProductPage() {
  const { productId } = useParams();
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const {
    carouselXTranslate,
    setCarouselXTranslate,
    handleLeftButton,
    handleRightButton,
  } = useCarousel({ carouselRef });

  const { data, isFetching } = useApi({ productId: productId as string });

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.innerHTML = data?.product?.description as string;
    }
  }, [data?.product?.description]);

  useEffect(() => {
    setCarouselXTranslate(0);
  }, [setCarouselXTranslate, productId]);

  if (isFetching) {
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

          <div className="relative">
            <button
              className="absolute left-[-20px] top-[50%] z-[10] grid h-10 w-10 translate-y-[calc(-50%-30px)] place-items-center rounded-full bg-white shadow-md"
              onClick={handleLeftButton}
            >
              <ArrowUpIcon className="w-6 -rotate-90" />
            </button>

            <div className="overflow-hidden">
              <div
                ref={carouselRef}
                style={{ transform: `translateX(${carouselXTranslate}px)` }}
                className="flex gap-2 transition-all duration-500 ease-in-out *:min-w-[200px]"
              >
                {similarProducts.map((product) => (
                  <ProductCard key={product?.p_id} product={product} />
                ))}
              </div>
            </div>

            <button
              className="absolute right-[-20px] top-[50%] z-[10] grid h-10 w-10 translate-y-[calc(-50%-30px)] place-items-center rounded-full bg-white shadow-md"
              onClick={handleRightButton}
            >
              <ArrowUpIcon className="w-6 rotate-90" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
