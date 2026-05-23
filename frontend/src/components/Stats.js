import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaRocket, FaTrophy } from 'react-icons/fa';
import './Stats.css';

const AnimatedCounter = ({ end, duration = 2000, inView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return <span>{count}</span>;
};

const Stats = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const stats = [
    { icon: <FaUsers />, number: 500, suffix: '+', label: 'Active Members', color: '#6C63FF' },
    { icon: <FaCalendarAlt />, number: 50, suffix: '+', label: 'Events Hosted', color: '#FF6584' },
    { icon: <FaRocket />, number: 20, suffix: '+', label: 'Startups Launched', color: '#10b981' },
    { icon: <FaTrophy />, number: 30, suffix: '+', label: 'Awards Won', color: '#f59e0b' },
  ];

  return (
    <section className="stats" ref={ref}>
      <div className="stats-bg-gradient" />
      <div className="container">
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>
                {stat.icon}
              </div>
              <div className="stat-number" style={{ color: stat.color }}>
                <AnimatedCounter end={stat.number} inView={inView} />
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;