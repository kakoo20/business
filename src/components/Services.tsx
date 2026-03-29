import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flower2, Home, Lightbulb, UtensilsCrossed } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Floral Arrangements',
    description:
      'Bespoke bouquets and centerpieces crafted with the finest seasonal blooms. From romantic garden styles to modern minimalist designs.',
    image: '/service-1.jpg',
    icon: Flower2,
  },
  {
    id: 2,
    title: 'Venue Styling',
    description:
      'Complete transformation of your space. We handle everything from ceremony arches to reception tablescapes.',
    image: '/service-2.jpg',
    icon: Home,
  },
  {
    id: 3,
    title: 'Lighting Design',
    description:
      'Ambient and dramatic lighting solutions that create the perfect atmosphere for your celebration.',
    image: '/service-3.jpg',
    icon: Lightbulb,
  },
  {
    id: 4,
    title: 'Table Settings',
    description:
      'Elegant china, linens, and accessories. Every detail curated to perfection for an unforgettable dining experience.',
    image: '/service-4.jpg',
    icon: UtensilsCrossed,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const ctx = gsap.context(() => {
          // Cards stagger animation
          const cards = cardsRef.current?.querySelectorAll('.service-card');
          if (cards) {
            gsap.fromTo(
              cards,
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: cardsRef.current,
                  start: 'top 75%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        }, sectionRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('Services animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f8f3ec]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="pre-title block mb-4">Our Services</span>
          <h2 className="section-title mb-6">
            What We <span className="text-gold">Offer</span>
          </h2>
          <p className="font-body text-[#3c3c3c]/70 max-w-2xl mx-auto">
            Comprehensive decor solutions tailored to your vision. Every detail
            designed to create an unforgettable celebration.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="service-card group relative bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
                style={{ perspective: '1000px' }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15151a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold">
                    <Icon size={22} className="text-gold group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl text-[#15151a] mb-3 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-[#3c3c3c]/70 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="mt-4 pt-4 border-t border-[#c0c0c0]/30">
                    <span className="font-body text-sm text-gold tracking-wider uppercase flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      Learn More
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
