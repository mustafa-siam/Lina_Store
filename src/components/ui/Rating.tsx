import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  count?: number;
  size?: "sm" | "md";
}

export default function Rating({ value, count, size = "sm" }: RatingProps) {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5";
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`${starSize} ${
              s <= Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      {count !== undefined && (
        <span className="text-xs text-gray-500 font-body ml-0.5">({count})</span>
      )}
    </div>
  );
}
