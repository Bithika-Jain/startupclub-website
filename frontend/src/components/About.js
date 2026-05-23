import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaRocket, FaLightbulb, FaHandshake, FaChartLine } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: <FaLightbulb />,
      title: 'Ideation & Innovation',
      description: 'Transform raw ideas into viable business concepts through structured brainstorming sessions and mentorship.',
      color: '#6C63FF',
    },
    {
      icon: <FaRocket />,
      title: 'Launch & Scale',
      description: 'Get hands-on support to launch your startup with resources, networking, and expert guidance.',
      color: '#FF6584',
    },
    {
      icon: <FaHandshake />,
      title: 'Network & Connect',
      description: 'Build meaningful connections with industry leaders, investors, and fellow entrepreneurs.',
      color: '#10b981',
    },
    {
      icon: <FaChartLine />,
      title: 'Learn & Grow',
      description: 'Access workshops, bootcamps, and masterclasses designed to sharpen your entrepreneurial skills.',
      color: '#f59e0b',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="about section-padding" id="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Us</span>
          <h2 className="section-title">Fueling Entrepreneurial Spirit</h2>
          <p className="section-subtitle">
            StartUp Club is VIT Bhopal's leading entrepreneurship club dedicated to fostering innovation,
            building startups, and creating a thriving ecosystem for aspiring entrepreneurs.
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text-block"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="about-heading">Our Mission</h3>
            <p className="about-text">
              We believe every student has the potential to be an entrepreneur. Our mission is to
              provide the platform, resources, and community needed to turn innovative ideas into
              successful ventures. From ideation workshops to pitch competitions, we cover every
              aspect of the startup journey.
            </p>
            <p className="about-text">
              Whether you're a budding entrepreneur with a groundbreaking idea or someone who wants
              to learn about the startup ecosystem, StartUp Club is your launchpad to success.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-check">✓</div>
                <span>Weekly mentorship sessions</span>
              </div>
              <div className="highlight-item">
                <div className="highlight-check">✓</div>
                <span>Pitch competitions & hackathons</span>
              </div>
              <div className="highlight-item">
                <div className="highlight-check">✓</div>
                <span>Industry expert talks</span>
              </div>
              <div className="highlight-item">
                <div className="highlight-check">✓</div>
                <span>Startup incubation support</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-features"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div
                  className="feature-icon"
                  style={{ background: `${feature.color}15`, color: feature.color }}
                >
                  {feature.icon}
                </div>
                <div className="feature-info">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;