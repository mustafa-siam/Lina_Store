import { ReactNode } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
}

export default function EmptyState({ icon, title, description, ctaLabel, ctaTo }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[#e8f5ee] flex items-center justify-center mb-6 text-[#2a7d4f]">
        {icon}
      </div>
      <h2 className="font-display text-2xl text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-500 font-body max-w-sm mb-8">{description}</p>
      <Link to={ctaTo}>
        <Button size="lg">{ctaLabel}</Button>
      </Link>
    </motion.div>
  );
}
