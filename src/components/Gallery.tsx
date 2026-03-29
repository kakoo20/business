import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  {
    id: 1,
    src: '/gallery-1.jpg',
    alt: 'Bride with bouquet',
    span: 'row-span-2',
  },
  {
    id: 2,
    src: '/gallery-2.jpg',
    alt: 'Wedding rings',
    span: '',
  },
  {
    id: 3,
    src: '/gallery-3.jpg',
    alt: 'Happy couple',
    span: '',
  },
  {
    id: 4,
    src: '/gallery-4.jpg',
    alt: 'Wedding arch',
    span: 'row-span-2',
  },
  {
    id: 5,
    src: '/service-1.jpg',
    alt: 'Floral arrangement',
    span: '',
  },
  {
    id: 6,
    src: '/service-2.jpg',
    alt: 'Venue styling',
    span: 'col-span-2',
  },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Grid items animation
        const items = gridRef.current?.querySelectorAll('.gallery-item');
        if (items) {
          gsap.fromTo(
            items,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      } catch (error) {
        console.error('Gallery animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f8f3ec]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="pre-title block mb-4">Our Portfolio</span>
          <h2 className="section-title mb-6">
            Wedding <span className="text-gold">Gallery</span>
          </h2>
          <p className="font-body text-[#3c3c3c]/70 max-w-2xl mx-auto">
            A glimpse into the magical moments we've helped create. Each wedding
            tells a unique love story.
          </p>
        </div>

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]"
        >
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`gallery-item relative overflow-hidden group cursor-pointer ${image.span}`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#15151a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ZoomIn size={24} className="text-white" />
                </div>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 border-4 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-outline">
            View All Photos
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#15151a]/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} className="text-white" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
