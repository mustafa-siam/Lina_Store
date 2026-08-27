interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({ label, title, subtitle, center = true }: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {label && (
        <p className="text-[#2a7d4f] font-body font-semibold text-sm uppercase tracking-widest mb-2">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl text-gray-900 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-500 font-body max-w-xl mx-auto text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
