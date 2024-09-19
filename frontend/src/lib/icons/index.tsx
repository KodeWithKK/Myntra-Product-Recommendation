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

export { StarIcon, AvatarIcon };
