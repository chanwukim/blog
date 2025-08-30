import type { IconProps } from "@/libs/types";

export function ChevronDownIcon({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      height={size}
      width={size}
      viewBox="0 0 256 256"
      fill="currentColor"
      {...rest}
    >
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  );
}
