import { RiDoubleQuotesL } from "react-icons/ri";

const testimonials = [
  {
    id: "t1",
    quote:
      "SmartFarm has completely changed the way I manage my farm. Everything is now organized and easy to track.",
    name: "Ahmed R.",
    role: "Farm Owner",
    avatar: "https://i.pravatar.cc/48?img=3",
    rating: 5,
  },
  {
    id: "t2",
    quote:
      "The task management and financial tracking features help me save time and increase my profit.",
    name: "Sarah K.",
    role: "Agriculturist",
    avatar: "https://i.pravatar.cc/48?img=5",
    rating: 5,
  },
  {
    id: "t3",
    quote: "A must-have tool for every modern farmer. Highly recommended!",
    name: "John D.",
    role: "Farm Manager",
    avatar: "https://i.pravatar.cc/48?img=12",
    rating: 5,
  },
];
export default function TestimonialsSection() {
  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="flex flex-col gap-2"
    >
      <div>
        <p className="text-primary-green text-[13px] pb-2 font-semibold">
          Testimonials
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-4">
          What Our Farmers Say
        </h2>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-3 gap-4">
        {testimonials.map((t) => (
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col gap-2 group  hover:bg-primary-green bg-white rounded-lg border border-border/80  p-5 shadow hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            key={t.id}
          >
            {/* Quote mark */}
            <span className="text-xl  text-primary-green group-hover:text-white">
              <RiDoubleQuotesL />
            </span>

            {/* Quote text */}
            <p className="text-sm text-gray-600 group-hover:text-gray-100 leading-relaxed flex-1">
              {t.quote}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 ">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold group-hover:text-white text-gray-900">
                  — {t.name}
                </p>
                <p className="text-[11px] group-hover:text-gray-100 text-gray-500">
                  {t.role}
                </p>
              </div>
            </div>

            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < t.rating ? "text-yellow-400" : "text-gray-200"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
