interface BadgeProps {
  label: string;
  variant?: "sale" | "new" | "bestseller" | "organic" | "default";
}

const variantStyles: Record<string, string> = {
  sale: "bg-red-500 text-white",
  new: "bg-blue-500 text-white",
  bestseller: "bg-amber-500 text-white",
  organic: "bg-emerald-600 text-white",
  default: "bg-gray-200 text-gray-700",
};

export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide font-body ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}
