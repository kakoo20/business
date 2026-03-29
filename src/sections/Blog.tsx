import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Wedding Decor Trends for 2024',
    excerpt:
      'Discover the latest trends in wedding decor, from sustainable florals to dramatic lighting installations that will make your celebration unforgettable.',
    image: '/blog-1.jpg',
    date: 'Dec 15, 2023',
    category: 'Trends',
    featured: true,
  },
  {
    id: 2,
    title: 'How to Choose the Perfect Color Palette',
    excerpt:
      'Learn the secrets to selecting a harmonious color scheme that reflects your personality and creates the perfect ambiance.',
    image: '/blog-2.jpg',
    date: 'Dec 10, 2023',
    category: 'Tips',
    featured: false,
  },
  {
    id: 3,
    title: 'DIY Wedding Decor Tips',
    excerpt:
      'Beautiful DIY ideas that add a personal touch to your wedding while staying within budget.',
    image: '/blog-3.jpg',
    date: 'Dec 5, 2023',
    category: 'DIY',
    featured: false,
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Cards animation
        const cards = cardsRef.current?.querySelectorAll('.blog-card');
        if (cards) {
          gsap.fromTo(
            cards,
            { y: 60, opacity: 0 },
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
      } catch (error) {
        console.error('Blog animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => !post.featured);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f8f3ec]"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="pre-title block mb-4">Our Blog</span>
          <h2 className="section-title mb-6">
            Wedding <span className="text-gold">Inspiration</span>
          </h2>
          <p className="font-body text-[#3c3c3c]/70 max-w-2xl mx-auto">
            Tips, trends, and ideas to help you plan the wedding of your dreams.
          </p>
        </div>

        {/* Blog Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {featuredPost && (
            <div className="blog-card group cursor-pointer">
              <div className="relative h-full bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-gold text-white px-4 py-1 font-body text-xs tracking-wider uppercase">
                    Featured
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body text-xs text-gold tracking-wider uppercase">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1 font-body text-xs text-[#3c3c3c]/50">
                      <Calendar size={12} />
                      {featuredPost.date}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-[#15151a] mb-4 group-hover:text-gold transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  <p className="font-body text-[#3c3c3c]/70 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-body text-sm text-gold tracking-wider uppercase group-hover:gap-3 transition-all duration-300">
                    Read More
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Other Posts */}
          <div className="space-y-6">
            {otherPosts.map((post) => (
              <div
                key={post.id}
                className="blog-card group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-4 bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 sm:py-4 sm:pr-4 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-body text-xs text-gold tracking-wider uppercase">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-body text-xs text-[#3c3c3c]/50">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="font-display text-xl text-[#15151a] mb-2 group-hover:text-gold transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-[#3c3c3c]/70 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-outline">View All Articles</button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
