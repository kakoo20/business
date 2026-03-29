import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Facts from './sections/Facts';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Navigation from './sections/Navigation';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        const ctx = gsap.context(() => {
          // Refresh ScrollTrigger after all content loads
          ScrollTrigger.refresh();
        }, mainRef);

        return () => ctx.revert();
      } catch (error) {
        console.error('GSAP initialization error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Facts />
        <Gallery />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
