import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Wedding Lane', 'Beverly Hills, CA 90210'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@eternalelegance.com', 'bookings@eternalelegance.com'],
  },
  {
    icon: Clock,
    title: 'Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat: 10AM - 4PM'],
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    weddingDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Info cards animation
        const infoCards = infoRef.current?.querySelectorAll('.info-card');
        if (infoCards) {
          gsap.fromTo(
            infoCards,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: infoRef.current,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      } catch (error) {
        console.error('Contact animation error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        weddingDate: '',
        message: '',
      });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="pre-title block mb-4">Get In Touch</span>
          <h2 className="section-title mb-6">
            Let's Plan Your <span className="text-gold">Dream Wedding</span>
          </h2>
          <p className="font-body text-[#3c3c3c]/70 max-w-2xl mx-auto">
            Ready to start planning? We'd love to hear from you. Fill out the
            form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-[#f8f3ec] p-8 md:p-12 text-center">
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={28} className="text-white" fill="white" />
                </div>
                <h3 className="font-display text-3xl text-[#15151a] mb-4">
                  Thank You!
                </h3>
                <p className="font-body text-[#3c3c3c]/70">
                  We've received your message and will get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#f8f3ec] p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-sm text-[#3c3c3c] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#c0c0c0] focus:border-gold focus:outline-none transition-colors duration-300 font-body"
                      placeholder="John & Jane"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-[#3c3c3c] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-[#c0c0c0] focus:border-gold focus:outline-none transition-colors duration-300 font-body"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-body text-sm text-[#3c3c3c] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#c0c0c0] focus:border-gold focus:outline-none transition-colors duration-300 font-body"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-[#3c3c3c] mb-2">
                      Wedding Date
                    </label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-[#c0c0c0] focus:border-gold focus:outline-none transition-colors duration-300 font-body"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-body text-sm text-[#3c3c3c] mb-2">
                    Tell Us About Your Dream Wedding *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-[#c0c0c0] focus:border-gold focus:outline-none transition-colors duration-300 font-body resize-none"
                    placeholder="Share your vision, style preferences, and any specific ideas you have in mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="info-card flex gap-4 p-6 bg-[#f8f3ec] hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={22} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-[#15151a] mb-1">
                      {info.title}
                    </h4>
                    {info.details.map((detail, index) => (
                      <p
                        key={index}
                        className="font-body text-sm text-[#3c3c3c]/70"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
