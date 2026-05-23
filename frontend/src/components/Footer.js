import React, { useState } from 'react';
import { Link } from 'react-scroll';
import {
  FaRocket,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaHeart
} from 'react-icons/fa';
import {
  FiArrowUp,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // success | error | null
  const [newsletterMsg, setNewsletterMsg] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) return;

    setSubscribing(true);
    setNewsletterStatus(null);

    try {
      const res = await axios.post('/api/newsletter', {
        email: newsletterEmail,
      });

      if (res.data.success) {
        setNewsletterStatus('success');
        setNewsletterMsg(res.data.message);
        setNewsletterEmail('');
      }
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterMsg(
        err.response?.data?.error ||
          'Subscription failed. Please try again.'
      );
    } finally {
      setSubscribing(false);

      setTimeout(() => {
        setNewsletterStatus(null);
      }, 5000);
    }
  };

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Events', to: 'events' },
    { name: 'Team', to: 'team' },
    { name: 'Contact', to: 'contact' },
  ];

  const resources = [
    { name: 'Startup Guide', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Partnerships', href: '#' },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/startup.vit',
      label: 'Instagram',
    },
    {
      icon: <FaLinkedin />,
      url: '#',
      label: 'LinkedIn',
    },
    {
      icon: <FaTwitter />,
      url: '#',
      label: 'Twitter',
    },
    {
      icon: <FaYoutube />,
      url: '#',
      label: 'YouTube',
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <FaRocket />
              </div>

              <span className="footer-logo-text">
                StartUp Club<span className="logo-accent"></span>
              </span>
            </div>

            <p className="footer-brand-text">
              VIT Bhopal's premier entrepreneurship club fostering innovation,
              building startups, and empowering the next generation
              of entrepreneurs.
            </p>

            <div className="footer-socials">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Quick Links</h4>

            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="footer-link"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Resources</h4>

            <ul className="footer-links">
              {resources.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="footer-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4 className="footer-links-title">Stay Updated</h4>

            <p className="footer-newsletter-text">
              Subscribe to our newsletter for the latest updates,
              events, and opportunities.
            </p>

            <form
              className="newsletter-form"
              onSubmit={handleNewsletter}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="newsletter-input"
                value={newsletterEmail}
                onChange={(e) =>
                  setNewsletterEmail(e.target.value)
                }
                disabled={subscribing}
                required
              />

              <button
                type="submit"
                className="newsletter-btn"
                disabled={subscribing}
              >
                {subscribing ? '...' : 'Subscribe'}
              </button>
            </form>

            {/* Success Message */}
            {newsletterStatus === 'success' && (
              <div className="newsletter-status success">
                <FiCheck />
                <span>{newsletterMsg}</span>
              </div>
            )}

            {/* Error Message */}
            {newsletterStatus === 'error' && (
              <div className="newsletter-status error">
                <FiAlertCircle />
                <span>{newsletterMsg}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} StartUp Club @VIT Bhopal.
          </p>

          <Link
            to="hero"
            smooth={true}
            duration={800}
            className="back-to-top"
          >
            <FiArrowUp />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;