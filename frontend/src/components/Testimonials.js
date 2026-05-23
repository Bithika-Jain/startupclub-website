import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Vikram Singh',
      role: 'Founder, EduTech Startup',
      avatar: '🧑‍🚀',
      quote: "StartUp Club @VIT Bhopal completely changed my perspective on entrepreneurship. The mentorship and resources provided helped me launch my EdTech startup which now serves over 10,000 students.",
      rating: 5,
    },
    {
      name: 'Meera Krishnan',
      role: 'Product Manager, Google',
      avatar: '👩‍💼',
      quote: "The skills I gained through StartUp Club's workshops and hackathons were instrumental in landing my dream job. The community here is incredibly supportive and inspiring.",
      rating: 5,
    },
    {
      name: 'Aditya Ranjan',
      role: 'CTO, FinTech Venture',
      avatar: '👨‍🔬',
      quote: "From a simple idea pitched at a StartUp CLub event to a funded fintech venture — this club provided the launchpad I needed. Forever grateful for the ecosystem they've built.",
      rating: 5,
    },
    {
      name: 'Kavya Iyer',
      role: 'UX Designer, Microsoft',
      avatar: '👩‍🎨',
      quote: "The design thinking workshops at StartUp Club taught me more than any course ever could. The hands-on experience and real-world projects were invaluable.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials section-padding" id="testimonials" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Alumni Say</h2>
          <p className="section-subtitle">
            Hear from the entrepreneurs and professionals who started their journey with StartupVIT.
          </p>
        </motion.div>

        <motion.div
          className="testimonial-carousel"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <div className="testimonial-stars">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="star" />
                ))}
              </div>
              <p className="testimonial-quote">{testimonials[currentIndex].quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>{testimonials[currentIndex].avatar}</span>
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                  <p className="author-role">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={prevTestimonial} aria-label="Previous">
              <FiChevronLeft />
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={nextTestimonial} aria-label="Next">
              <FiChevronRight />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;