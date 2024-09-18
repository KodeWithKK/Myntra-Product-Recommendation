import { cn } from "@/utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

function ProductsContainer({ children, className }: Readonly<Props>) {
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default ProductsContainer;
