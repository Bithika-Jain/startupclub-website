import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi';
import './Team.css';

const Team = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const teamMembers = [
    {
      name: 'Arjun',
      role: 'President',
      avatar: '👨‍💼',
      bio: 'Leading the vision of StartUp Club @VIT Bhopal with passion for innovation.',
      socials: { linkedin: '#', twitter: '#' },
      gradient: 'linear-gradient(135deg, #6C63FF, #5b52ff)',
    },
    {
      name: 'Aarya Jadhav',
      role: 'Vice President',
      avatar: '👩‍💻',
      bio: 'Driving operations and ensuring smooth execution of all initiatives.',
      socials: { linkedin: '#', twitter: '#' },
      gradient: 'linear-gradient(135deg, #FF6584, #ff4d73)',
    },
    {
      name: 'Saksham Jaiswal',
      role: 'Product & Tech Lead',
      avatar: '👨‍💻',
      bio: 'Building the technical backbone for club projects and products.',
      socials: { linkedin: '#', github: '#' },
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      name: 'Sneha',
      role: 'Events Head',
      avatar: '👩‍🎨',
      bio: 'Curating impactful events that inspire and educate members.',
      socials: { linkedin: '#', twitter: '#' },
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
    {
      name: 'Karthik',
      role: 'Marketing Lead',
      avatar: '📢',
      bio: 'Spreading the word and growing our community across campus.',
      socials: { linkedin: '#', twitter: '#' },
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    },
    {
      name: 'Ananya',
      role: 'Design Lead',
      avatar: '🎨',
      bio: 'Crafting beautiful experiences and visual identities for the club.',
      socials: { linkedin: '#', github: '#' },
      gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    },
  ];

  return (
    <section className="team section-padding" id="team" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Team</span>
          <h2 className="section-title">Meet the Visionaries</h2>
          <p className="section-subtitle">
            The passionate individuals behind StartUp Club @VIT Bhopal who work tirelessly to build
            a thriving entrepreneurial ecosystem.
          </p>
        </motion.div>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="team-card-header" style={{ background: member.gradient }}>
                <div className="team-avatar">
                  <span className="avatar-emoji">{member.avatar}</span>
                </div>
              </div>
              <div className="team-card-body">
                <h4 className="team-name">{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p className="team-bio">{member.bio}</p>
                <div className="team-socials">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="social-link" aria-label="LinkedIn">
                      <FiLinkedin />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="social-link" aria-label="Twitter">
                      <FiTwitter />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} className="social-link" aria-label="GitHub">
                      <FiGithub />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;