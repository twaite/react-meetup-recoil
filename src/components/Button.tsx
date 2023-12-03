import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  className?: string;
  type: "submit" | "button";
};

export default function Button({
  variant = "primary",
  size = "lg",
  children,
  className,
  fullWidth,
  type = "button",
}: Props) {
  const buttonClasses = clsx(
    "rounded",
    variant === "primary" && "bg-indigo-600",
    variant === "secondary" && "bg-gray-600",
    size === "sm" && "px-2 py-1 text-xs",
    size === "md" && "px-2 py-1 text-sm",
    size === "lg" && "px-2.5 py-1.5 text-sm",
    size === "xl" && "px-3 py-2 text-sm",
    fullWidth && "w-full",
    "font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    className
  );

  return (
    <button type={type} className={buttonClasses}>
      {children}
    </button>
  );
}
