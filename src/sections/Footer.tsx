import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Twitter, Youtube, Send, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Reveal animation
        gsap.fromTo(
          '.footer-content',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      } catch (error) {
        console.error('Footer animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative">
      {/* Newsletter Section */}
      <div className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/footer-bg.jpg"
            alt="Wedding sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15151a] via-[#15151a]/80 to-[#15151a]/60" />
        </div>

        {/* Content */}
        <div className="footer-content relative z-10 section-padding text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Begin Your Love Story
            <br />
            <span className="text-gold">With Us</span>
          </h2>
          <p className="font-body text-white/70 max-w-xl mx-auto mb-10">
            Subscribe to our newsletter for wedding inspiration, tips, and
            exclusive offers.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-gold font-body">
              <Heart size={18} fill="currentColor" />
              Thank you for subscribing!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors duration-300 font-body"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold text-white font-body text-sm tracking-widest uppercase hover:bg-[#c9a060] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-[#15151a] py-16">
        <div className="section-padding">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="inline-block mb-6">
                <span className="font-script text-3xl text-gold">Eternal</span>
                <span className="font-display text-xl text-white tracking-wider ml-2">
                  ELEGANCE
                </span>
              </a>
              <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
                Creating timeless wedding experiences with exquisite decor and
                unparalleled attention to detail.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                  >
                    <Icon size={18} className="text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg text-white mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#hero' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Services', href: '#services' },
                  { name: 'Gallery', href: '#gallery' },
                  { name: 'Contact', href: '#contact' },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="font-body text-sm text-white/60 hover:text-gold transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display text-lg text-white mb-6">
                Our Services
              </h4>
              <ul className="space-y-3">
                {[
                  'Floral Arrangements',
                  'Venue Styling',
                  'Lighting Design',
                  'Table Settings',
                  'Custom Decor',
                ].map((service) => (
                  <li key={service}>
                    <span className="font-body text-sm text-white/60">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg text-white mb-6">
                Contact Us
              </h4>
              <ul className="space-y-3">
                <li className="font-body text-sm text-white/60">
                  123 Wedding Lane
                  <br />
                  Beverly Hills, CA 90210
                </li>
                <li className="font-body text-sm text-white/60">
                  +1 (555) 123-4567
                </li>
                <li className="font-body text-sm text-white/60">
                  hello@eternalelegance.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-body text-xs text-white/40">
                © 2024 Eternal Elegance. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="font-body text-xs text-white/40 hover:text-gold transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="font-body text-xs text-white/40 hover:text-gold transition-colors duration-300"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
