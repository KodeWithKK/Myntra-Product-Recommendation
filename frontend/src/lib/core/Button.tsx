import { cn } from "@/utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  variant?: "solid";
  onClick?: () => void;
}

const buttonCmap = {
  solid: {
    color: "text-white",
    bgcolor: "bg-gray-950",
  },
};

function Button({
  children,
  type = "button",
  variant = "solid",
  className,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={cn(
        "rounded-md px-4 py-2",
        buttonCmap[variant].color,
        buttonCmap[variant].bgcolor,
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
