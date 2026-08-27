import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { testimonials } from "@/data/testimonials";
import Rating from "@/components/ui/Rating";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="Customer Stories"
            title="People Love Lina Store"
            subtitle="Don't just take our word for it — here's what our customers say."
          />
        </motion.div>

        {/* --- Mobile Carousel (Shown only on small screens) --- */}
        <div className="block sm:hidden relative px-2">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation={{
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-[#f8f8f4] rounded-2xl p-6 border border-gray-100 relative h-full flex flex-col justify-between">
                  <div>
                    <Quote className="w-8 h-8 text-[#2a7d4f]/20 absolute top-6 right-6" />
                    <Rating value={t.rating} />
                    <p className="text-gray-700 font-body text-sm leading-relaxed mt-4 mb-6 line-clamp-4">
                      "{t.review}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover bg-gray-200"
                    />
                    <div>
                      <p className="font-body font-semibold text-gray-900 text-sm">
                        {t.name}
                      </p>
                      <p className="text-gray-400 text-xs font-body">
                        {t.location} · {t.date}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              aria-label="Previous testimonial"
              className="testimonial-prev w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-[#2a7d4f] hover:text-white hover:border-[#2a7d4f] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next testimonial"
              className="testimonial-next w-10 h-10 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-[#2a7d4f] hover:text-white hover:border-[#2a7d4f] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* --- Desktop Grid Layout (Hidden on Mobile) --- */}
        <div className="hidden sm:block">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#f8f8f4] rounded-2xl p-7 border border-gray-100 relative"
              >
                <Quote className="w-8 h-8 text-[#2a7d4f]/20 absolute top-6 right-6" />
                <Rating value={t.rating} />
                <p className="text-gray-700 font-body text-sm leading-relaxed mt-4 mb-6 line-clamp-3">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-body font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs font-body">
                      {t.location} · {t.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            {testimonials.slice(3).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#f8f8f4] rounded-2xl p-7 border border-gray-100 relative"
              >
                <Quote className="w-8 h-8 text-[#2a7d4f]/20 absolute top-6 right-6" />
                <Rating value={t.rating} />
                <p className="text-gray-700 font-body text-sm leading-relaxed mt-4 mb-6 line-clamp-3">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover bg-gray-200"
                  />
                  <div>
                    <p className="font-body font-semibold text-gray-900 text-sm">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs font-body">
                      {t.location} · {t.date}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}