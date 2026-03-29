import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 500, suffix: '+', label: 'Weddings Styled' },
  { value: 15, suffix: '', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Design Awards' },
  { value: 100, suffix: '%', label: 'Happy Couples' },
];

const Facts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Background parallax
        gsap.to('.facts-bg', {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Stats counter animation
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (!hasAnimated.current) {
              hasAnimated.current = true;
              stats.forEach((stat, index) => {
                gsap.to(
                  { value: 0 },
                  {
                    value: stat.value,
                    duration: 2,
                    ease: 'power2.out',
                    delay: index * 0.15,
                    onUpdate: function () {
                      setCounters((prev) => {
                        const newCounters = [...prev];
                        newCounters[index] = Math.round(this.targets()[0].value);
                        return newCounters;
                      });
                    },
                  }
                );
              });
            }
          },
        });
      } catch (error) {
        console.error('Facts animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="facts-bg absolute inset-0 w-full h-[130%] -top-[15%]">
        <img
          src="/facts-bg.jpg"
          alt="Wedding celebration"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#15151a]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding">
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative text-center">
              {/* Divider */}
              {index > 0 && (
                <div className="stat-divider hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px bg-gold/30 h-full" />
              )}

              <div className="px-4">
                <span className="font-display text-5xl md:text-6xl lg:text-7xl text-white">
                  {counters[index]}
                  <span className="text-gold">{stat.suffix}</span>
                </span>
                <p className="font-body text-sm md:text-base text-white/70 mt-3 tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facts;
