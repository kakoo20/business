import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const ctx = gsap.context(() => {
          // Hero image zoom out and unblur
          gsap.fromTo(
            imageRef.current,
            { scale: 1.2, filter: 'blur(10px)' },
            { scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' }
          );

          // Parallax effect on scroll
          gsap.to(imageRef.current, {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });

          gsap.to(contentRef.current, {
            y: '-20%',
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '50% top',
              scrub: true,
            },
          });
        }, heroRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('Hero animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.jpg"
          alt="Romantic wedding couple"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex items-center section-padding"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="max-w-3xl">
          <span className="pre-title block mb-4">
            Welcome to Wedding Decor
          </span>

          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6"
            style={{ perspective: '1000px' }}
          >
            Romantic
            <br />
            <span className="text-gold">Elegance</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
            Transform your special day into a timeless celebration with our
            exquisite wedding decor collection. Let us bring your dream wedding
            to life.
          </p>

          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#services');
            }}
            className="inline-flex items-center gap-3 btn-primary group"
          >
            Explore Our Collection
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-xs text-white/60 tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
