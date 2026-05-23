import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import './Events.css';

const Events = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeFilter, setActiveFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackEvents = [
    {
      id: 1,
      title: 'Startup Weekend 2025',
      category: 'hackathon',
      date: '2026-08-15',
      location: 'VIT Main Auditorium',
      attendees: 200,
      description: '54-hour event where developers, designers, and business enthusiasts come together to build startups.',
      image: '🚀',
      status: 'upcoming',
      tags: ['Hackathon', 'Networking', 'Prizes'],
    },
    {
      id: 2,
      title: 'Pitch Perfect',
      category: 'competition',
      date: '2024-02-28',
      location: 'Lecture Hall',
      attendees: 150,
      description: 'Pitch your startup idea to a panel of investors and industry experts. Win funding for your venture.',
      image: '🎯',
      status: 'past',
      tags: ['Pitching', 'Investment', 'Mentoring'],
    },
    {
      id: 3,
      title: 'Entrepreneurship 101 Workshop',
      category: 'workshop',
      date: '2025-02-10',
      location: 'AB2 217',
      attendees: 80,
      description: 'Learn the fundamentals of starting a business, from ideation to market validation.',
      image: '📚',
      status: 'past',
      tags: ['Workshop', 'Beginners', 'Learning'],
    },
    {
      id: 4,
      title: 'VC Meet & Greet',
      category: 'networking',
      date: '2024-03-01',
      location: 'Open Auditorium',
      attendees: 120,
      description: 'Exclusive networking event with top venture capitalists and angel investors from across India.',
      image: '🤝',
      status: 'past',
      tags: ['Networking', 'Investors', 'Exclusive'],
    },
    {
      id: 5,
      title: 'Design Thinking Bootcamp',
      category: 'workshop',
      date: '2025-01-20',
      location: 'Open Auditorium',
      attendees: 100,
      description: 'Intensive 2-day bootcamp on design thinking methodology for product development.',
      image: '🎨',
      status: 'past',
      tags: ['Design', 'Product', 'UX'],
    },
    {
      id: 6,
      title: 'Startup Expo 2024',
      category: 'competition',
      date: '2024-04-05',
      location: 'VIT Main Auditorium',
      attendees: 300,
      description: 'Annual startup exhibition featuring the best student startups. Demo your product to thousands.',
      image: '🏆',
      status: 'past',
      tags: ['Exhibition', 'Demo Day', 'Awards'],
    },
  ];

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/events');
      // Backend returns { success, count, data: [...] }
      const eventsData = response.data?.data || response.data;
      
      // Ensure it's an array before setting
      if (Array.isArray(eventsData)) {
        setEvents(eventsData);
      } else {
        setEvents(fallbackEvents);
      }
    } catch (error) {
      console.log('Using fallback events data');
      setEvents(fallbackEvents);
    } finally {
      setLoading(false);
    }
  };
  fetchEvents();
}, []);

  const filters = [
    { key: 'all', label: 'All Events' },
    { key: 'hackathon', label: 'Hackathons' },
    { key: 'workshop', label: 'Workshops' },
    { key: 'competition', label: 'Competitions' },
    { key: 'networking', label: 'Networking' },
  ];

  const filteredEvents = !Array.isArray(events)
  ? []
  : activeFilter === 'all'
    ? events
    : events.filter(e => e.category === activeFilter);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section className="events section-padding" id="events" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Events</span>
          <h2 className="section-title">Upcoming & Past Events</h2>
          <p className="section-subtitle">
            From hackathons to workshops, we organize events that inspire innovation
            and foster entrepreneurial growth.
          </p>
        </motion.div>

        <motion.div
          className="events-filters"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filters.map(filter => (
            <button
              key={filter.key}
              className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="events-loading">
            <div className="loading-spinner" />
            <p>Loading events...</p>
          </div>
        ) : (
          <motion.div className="events-grid" layout>
            <AnimatePresence mode="wait">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="event-card"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className="event-image">
                    <span className="event-emoji">{event.image}</span>
                    <div className={`event-status ${event.status}`}>
                      {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                    </div>
                  </div>
                  <div className="event-content">
                    <div className="event-tags">
                      {event.tags.map((tag, i) => (
                        <span key={i} className="event-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    <div className="event-meta">
                      <div className="meta-item">
                        <FiCalendar />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="meta-item">
                        <FiMapPin />
                        <span>{event.location}</span>
                      </div>
                      <div className="meta-item">
                        <FiUsers />
                        <span>{event.attendees}+ attendees</span>
                      </div>
                    </div>
                    <button className="event-cta">
                      {event.status === 'upcoming' ? 'Register Now' : 'View Recap'}
                      <FiArrowRight />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Events;