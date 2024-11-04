export default function cn(...classNames: (string | boolean | undefined)[]) {
  return classNames.filter(Boolean).join(" ");
}
