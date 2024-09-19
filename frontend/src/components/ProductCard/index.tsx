import { Link } from "react-router-dom";
import { StarIcon } from "@/lib/icons";
import type { Product } from "@/types/type";
import { formatPrice } from "@/utils/formatters";
import { useState } from "react";

function ProductCard({ product }: Readonly<{ product: Product }>) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  return (
    <Link to={`/p/${product.p_id}`} className="text-[15px]">
      <div className="relative" title={product.name}>
        <img
          src={product.img}
          alt="product image"
          className="rounded-lg"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />

        {isImageLoaded && product.avg_rating > 0 && (
          <div className="absolute bottom-[3px] left-[3px] inline-flex items-center gap-0.5 rounded-md bg-white px-1 py-px text-[13px] text-[#14958F]">
            <span className="font-medium">{product.avg_rating.toFixed(1)}</span>
            <StarIcon className="w-[13px]" />
            <span className="mx-px">|</span>
            <span className="">{product.ratingCount}</span>
          </div>
        )}
      </div>

      <span className="mt-1 font-semibold">{product.brand.toUpperCase()}</span>
      <p className="overflow-x-hidden text-ellipsis text-nowrap text-sm">
        {product.name}
      </p>
      <p className="mt-0.5 text-sm font-semibold">
        Rs. {formatPrice(product.price)}
      </p>
    </Link>
  );
}

export default ProductCard;
