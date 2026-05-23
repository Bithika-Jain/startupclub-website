import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import {
  FiSend, FiMail, FiMapPin, FiPhone,
  FiCheck, FiAlertCircle, FiLoader,
} from 'react-icons/fi';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState(null);   // 'success' | 'error' | null
  const [statusMsg, setStatusMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // ── Client-side validation ──
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address';
    if (!formData.subject.trim())
      newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await axios.post('/api/contact', formData);

      if (response.data.success) {
        setStatus('success');
        setStatusMsg(response.data.message);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      }
    } catch (error) {
      const serverMsg = error.response?.data?.error;
      setStatus('error');
      setStatusMsg(serverMsg || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(null), 6000);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      detail: 'startup.club@gmail.com',
      link: 'mailto:startup.club@gmail.com',
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      detail: 'VIT Bhopal University, India',
      link: '#',
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      detail: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      url: 'https://www.instagram.com/startup.vit',
      label: 'Instagram',
    },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' },
    { icon: <FaTwitter />,  url: '#', label: 'Twitter'  },
  ];

  return (
    <section className="contact section-padding" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a question, idea, or want to join us? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* ── Left: Info ── */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-text">
              Whether you want to collaborate, sponsor, or simply learn more about
              StartUp Club @VIT Bhopal, reach out and we'll get back to you within 24 hours.
            </p>

            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <a key={index} href={info.link} className="contact-info-card">
                  <div className="contact-info-icon">{info.icon}</div>
                  <div>
                    <h4>{info.title}</h4>
                    <p>{info.detail}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-socials">
              <p className="contact-social-label">Follow us:</p>
              <div className="contact-social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={submitting}
                  />
                  {errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </div>

                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={submitting}
                  />
                  {errors.email && (
                    <span className="field-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  disabled={submitting}
                />
                {errors.subject && (
                  <span className="field-error">{errors.subject}</span>
                )}
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">
                  Message
                  <span className="char-count">
                    {formData.message.length}/500
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows="5"
                  maxLength="500"
                  disabled={submitting}
                />
                {errors.message && (
                  <span className="field-error">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-submit ${submitting ? 'loading' : ''}`}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FiLoader className="spin-icon" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend />
                  </>
                )}
              </button>

              {/* Status Banner */}
              {status === 'success' && (
                <motion.div
                  className="form-status success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheck />
                  <span>{statusMsg}</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="form-status error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle />
                  <span>{statusMsg}</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;