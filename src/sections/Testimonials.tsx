import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & James',
    text: 'Absolutely magical! The decor transformed our venue into a fairytale. Every detail was perfect, from the floral arrangements to the lighting. Our guests are still talking about how beautiful everything looked!',
    image: '/testimonial-1.jpg',
    date: 'June 2024',
  },
  {
    id: 2,
    name: 'Emily & Michael',
    text: 'Professional, creative, and attentive to every detail. The team at Eternal Elegance truly understood our vision and brought it to life in ways we never imagined possible.',
    image: '/testimonial-2.jpg',
    date: 'August 2024',
  },
  {
    id: 3,
    name: 'Jessica & David',
    text: 'Working with Eternal Elegance was the best decision we made for our wedding. They took care of everything, allowing us to truly enjoy our special day without any stress.',
    image: '/testimonial-3.jpg',
    date: 'September 2024',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="pre-title block mb-4">Testimonials</span>
          <h2 className="section-title mb-6">
            What <span className="text-gold">Couples</span> Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Main Card */}
            <div className="bg-[#f8f3ec] p-8 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Quote Icon */}
              <Quote
                size={80}
                className="absolute top-8 left-8 text-gold/10"
                fill="currentColor"
              />

              {/* Content */}
              <div className="relative z-10 grid md:grid-cols-[200px_1fr] gap-8 items-center">
                {/* Image */}
                <div className="relative mx-auto md:mx-0">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gold shadow-xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="text-center md:text-left">
                  <p className="font-display text-xl md:text-2xl lg:text-3xl text-[#15151a] leading-relaxed mb-6 italic">
                    "{testimonials[currentIndex].text}"
                  </p>
                  <div>
                    <h4 className="font-display text-xl text-gold">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="font-body text-sm text-[#3c3c3c]/60">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={goToPrev}
                className="w-12 h-12 border-2 border-[#c0c0c0] flex items-center justify-center hover:border-gold hover:bg-gold hover:text-white transition-all duration-300"
                disabled={isAnimating}
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentIndex(index);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gold w-8'
                        : 'bg-[#c0c0c0] hover:bg-gold/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={goToNext}
                className="w-12 h-12 border-2 border-[#c0c0c0] flex items-center justify-center hover:border-gold hover:bg-gold hover:text-white transition-all duration-300"
                disabled={isAnimating}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
