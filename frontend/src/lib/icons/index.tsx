import { IconProps } from "@/types/type";

function StarIcon(props: Readonly<IconProps>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08z"
      />
    </svg>
  );
}

function AvatarIcon(props: Readonly<IconProps>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path fill="currentColor" d="M16 8a5 5 0 105 5 5 5 0 00-5-5" />
      <path
        fill="currentColor"
        d="M16 2a14 14 0 1014 14A14.016 14.016 0 0016 2m7.993 22.926A5 5 0 0019 20h-6a5 5 0 00-4.992 4.926 12 12 0 1115.985 0"
      />
    </svg>
  );
}

function SearchIcon(props: Readonly<IconProps>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 00-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
        <path
          fill="currentColor"
          d="M10.5 4a6.5 6.5 0 100 13 6.5 6.5 0 000-13M2 10.5a8.5 8.5 0 1115.176 5.262l3.652 3.652a1 1 0 01-1.414 1.414l-3.652-3.652A8.5 8.5 0 012 10.5M9.5 7a1 1 0 011-1 4.5 4.5 0 014.5 4.5 1 1 0 11-2 0A2.5 2.5 0 0010.5 8a1 1 0 01-1-1"
        />
      </g>
    </svg>
  );
}

function ArrowUpIcon(props: Readonly<IconProps>) {
  return (
    <svg viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M104.704 685.248a64 64 0 0090.496 0l316.8-316.8 316.8 316.8a64 64 0 0090.496-90.496L557.248 232.704a64 64 0 00-90.496 0L104.704 594.752a64 64 0 000 90.496"
      />
    </svg>
  );
}

export { StarIcon, AvatarIcon, SearchIcon, ArrowUpIcon };
