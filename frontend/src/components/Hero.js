import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIcons = [
    { Icon: FaRocket, delay: 0, x: '10%', y: '20%' },
    { Icon: FaLightbulb, delay: 0.5, x: '80%', y: '15%' },
    { Icon: FaUsers, delay: 1, x: '85%', y: '70%' },
  ];

  return (
    <section className="hero" id="hero">
      {/* Animated Background Elements */}
      <div className="hero-bg-effects">
        <div
          className="hero-gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="hero-gradient-orb orb-2"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
        <div className="hero-grid-pattern" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="floating-icon"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: delay,
            ease: 'easeInOut',
          }}
        >
          <Icon />
        </motion.div>
      ))}

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-dot" />
            <span>VIT Bhopal's Premier Entrepreneurship Club</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Where Ideas
            <span className="gradient-text"> Transform </span>
            Into
            <span className="gradient-text"> Startups</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Empowering the next generation of innovators, entrepreneurs, and
            change-makers at VIT Bhopal. Join us to build, learn, and launch your
            entrepreneurial journey.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link to="events" smooth={true} duration={500} offset={-70}>
              <button className="btn btn-primary btn-lg">
                Explore Events <FiArrowRight />
              </button>
            </Link>
            <Link to="about" smooth={true} duration={500} offset={-70}>
              <button className="btn btn-secondary btn-lg">
                Learn More
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats-mini"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="stat-mini">
              <span className="stat-mini-number">500+</span>
              <span className="stat-mini-label">Members</span>
            </div>
            <div className="stat-mini-divider" />
            <div className="stat-mini">
              <span className="stat-mini-number">50+</span>
              <span className="stat-mini-label">Events</span>
            </div>
            <div className="stat-mini-divider" />
            <div className="stat-mini">
              <span className="stat-mini-number">20+</span>
              <span className="stat-mini-label">Startups</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
        >
          <div className="hero-illustration">
            <div className="illustration-circle circle-outer">
              <div className="illustration-circle circle-middle">
                <div className="illustration-circle circle-inner">
                  <FaRocket className="illustration-rocket" />
                </div>
              </div>
            </div>
            <div className="orbit-dot dot-1" />
            <div className="orbit-dot dot-2" />
            <div className="orbit-dot dot-3" />
          </div>
        </motion.div>
      </div>

      <Link to="about" smooth={true} duration={500} offset={-70}>
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiChevronDown size={24} />
        </motion.div>
      </Link>
    </section>
  );
};

export default Hero;