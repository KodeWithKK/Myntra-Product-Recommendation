import { IconProps } from "@/types/type";
import { cn } from "@/utils/cn";

interface LoaderProps {
  display?: "bar" | "screen" | "inline";
}

export default function Loader({ display = "screen" }: Readonly<LoaderProps>) {
  return (
    <div
      className={cn(
        "flex justify-center",
        display === "screen" && "h-[calc(100vh-150px)] items-center",
        display === "inline" && "inline-block",
      )}
    >
      <LoaderIcon className="h-12 w-12 origin-center animate-spin text-orange-800" />
    </div>
  );
}

function LoaderIcon(props: Readonly<IconProps>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="5.271%" y2="91.793%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
        </linearGradient>
        <linearGradient id="b" x1="50%" x2="50%" y1="15.24%" y2="87.15%">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="M12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 00-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
        <path
          fill="url(#a)"
          d="M8.749.021a1.5 1.5 0 01.497 2.958A7.5 7.5 0 003 10.375a7.5 7.5 0 007.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          transform="translate(1.5 1.625)"
        />
        <path
          fill="url(#b)"
          d="M15.392 2.673a1.5 1.5 0 012.119-.115A10.48 10.48 0 0121 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 005.007-13.084 1.5 1.5 0 01-.115-2.118"
          transform="translate(1.5 1.625)"
        />
      </g>
    </svg>
  );
}
