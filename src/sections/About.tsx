import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const ctx = gsap.context(() => {
          // Parallax on scroll
          gsap.to(image1Ref.current, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to(image2Ref.current, {
            y: 50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }, sectionRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('About animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-[#f8f3ec] overflow-hidden"
    >
      <div className="section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Images Column */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {/* Image 1 */}
            <div
              ref={image1Ref}
              className="absolute top-0 left-0 w-[60%] md:w-[55%] z-10"
              style={{ willChange: 'transform' }}
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="/about-1.jpg"
                  alt="Wedding couple walking"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Image 2 */}
            <div
              ref={image2Ref}
              className="absolute bottom-0 right-0 w-[60%] md:w-[55%] z-20"
              style={{ willChange: 'transform' }}
            >
              <div className="relative overflow-hidden shadow-2xl">
                <img
                  src="/about-2.jpg"
                  alt="Wedding couple embracing"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            {/* Video Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <button className="group relative w-20 h-20 md:w-24 md:h-24 bg-gold rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110">
                <Play
                  size={28}
                  className="text-white ml-1 transition-transform duration-300 group-hover:rotate-90"
                  fill="white"
                />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-body text-xs text-[#3c3c3c] tracking-widest uppercase whitespace-nowrap">
                  Watch Story
                </span>
              </button>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-gold/30 rounded-full opacity-50" />
          </div>

          {/* Content Column */}
          <div className="lg:pl-8">
            <span className="pre-title block mb-4">About Us</span>

            <h2 className="section-title mb-8">
              Crafting Timeless
              <br />
              <span className="text-gold">Wedding Memories</span>
            </h2>

            <div className="space-y-6">
              <p className="font-body text-[#3c3c3c]/80 leading-relaxed">
                We believe every love story deserves a breathtaking setting. Our
                curated collection of wedding decor combines classic elegance
                with contemporary design, ensuring your celebration reflects your
                unique style.
              </p>

              <p className="font-body text-[#3c3c3c]/80 leading-relaxed">
                From intimate gatherings to grand affairs, we transform venues
                into dreamlike spaces. With over 15 years of experience, our team
                of passionate designers works closely with each couple to bring
                their vision to life.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="border-l-2 border-gold pl-4">
                  <span className="font-display text-4xl text-gold">500+</span>
                  <p className="font-body text-sm text-[#3c3c3c]/60 mt-1">
                    Weddings Styled
                  </p>
                </div>
                <div className="border-l-2 border-gold pl-4">
                  <span className="font-display text-4xl text-gold">15</span>
                  <p className="font-body text-sm text-[#3c3c3c]/60 mt-1">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
