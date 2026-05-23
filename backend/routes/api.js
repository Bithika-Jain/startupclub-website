const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const {
  readData,
  writeData,
  appendData,
  deleteById,
  updateById,
} = require('../utils/fileStorage');

// ─────────────────────────────────────────
// FILE NAMES (stored inside /data/)
// ─────────────────────────────────────────
const FILES = {
  EVENTS: 'events.json',
  MESSAGES: 'messages.json',
  SUBSCRIBERS: 'subscribers.json',
};

// ─────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const sanitize = (str) =>
  String(str).trim().replace(/<[^>]*>/g, ''); // strip HTML tags

// ─────────────────────────────────────────
// EVENTS ROUTES
// ─────────────────────────────────────────

// GET /api/events — list all or filtered
router.get('/events', (req, res) => {
  try {
    let events = readData(FILES.EVENTS);
    const { category, status } = req.query;

    if (category && category !== 'all') {
      events = events.filter((e) => e.category === category);
    }
    if (status) {
      events = events.filter((e) => e.status === status);
    }

    res.json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id — single event
router.get('/events/:id', (req, res) => {
  try {
    const events = readData(FILES.EVENTS);
    const event = events.find((e) => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch event' });
  }
});

// ─────────────────────────────────────────
// CONTACT / MESSAGES ROUTES
// ─────────────────────────────────────────

// POST /api/contact — submit contact form (PERSISTED)
router.post('/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // ── Validation ──
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    if (sanitize(name).length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Name must be at least 2 characters',
      });
    }

    if (sanitize(message).length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Message must be at least 10 characters',
      });
    }

    // ── Build entry ──
    const newMessage = {
      id: uuidv4(),
      name: sanitize(name),
      email: sanitize(email).toLowerCase(),
      subject: sanitize(subject),
      message: sanitize(message),
      status: 'unread',          // unread | read | replied
      submittedAt: new Date().toISOString(),
    };

    // ── Persist to file ──
    const saved = appendData(FILES.MESSAGES, newMessage);
    if (!saved) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save message. Please try again.',
      });
    }

    console.log(`📩 New message from ${newMessage.name} <${newMessage.email}>`);

    res.status(201).json({
      success: true,
      message: 'Your message has been received! We will get back to you within 24 hours.',
      data: {
        id: newMessage.id,
        name: newMessage.name,
        submittedAt: newMessage.submittedAt,
      },
    });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/messages — view all messages (admin)
router.get('/messages', (req, res) => {
  try {
    const messages = readData(FILES.MESSAGES);
    const { status } = req.query;

    const filtered = status
      ? messages.filter((m) => m.status === status)
      : messages;

    // Sort newest first
    const sorted = filtered.sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    );

    res.json({
      success: true,
      count: sorted.length,
      unread: messages.filter((m) => m.status === 'unread').length,
      data: sorted,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch messages' });
  }
});

// GET /api/messages/:id — view single message & mark as read
router.get('/messages/:id', (req, res) => {
  try {
    const messages = readData(FILES.MESSAGES);
    const message = messages.find((m) => m.id === req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    // Auto-mark as read when viewed
    if (message.status === 'unread') {
      updateById(FILES.MESSAGES, req.params.id, {
        status: 'read',
        readAt: new Date().toISOString(),
      });
    }

    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch message' });
  }
});

// PATCH /api/messages/:id — update message status
router.patch('/messages/:id', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['unread', 'read', 'replied'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = updateById(FILES.MESSAGES, req.params.id, {
      status,
      updatedAt: new Date().toISOString(),
    });

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update message' });
  }
});

// DELETE /api/messages/:id — delete a message
router.delete('/messages/:id', (req, res) => {
  try {
    const deleted = deleteById(FILES.MESSAGES, req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});

// ─────────────────────────────────────────
// NEWSLETTER ROUTES
// ─────────────────────────────────────────

// POST /api/newsletter — subscribe (PERSISTED)
router.post('/newsletter', (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    const cleanEmail = sanitize(email).toLowerCase();
    const subscribers = readData(FILES.SUBSCRIBERS);

    // Check for duplicate
    const alreadySubscribed = subscribers.some(
      (s) => s.email === cleanEmail
    );

    if (alreadySubscribed) {
      return res.status(409).json({
        success: false,
        error: 'This email is already subscribed!',
      });
    }

    // Build subscriber entry
    const newSubscriber = {
      id: uuidv4(),
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      active: true,
    };

    const saved = appendData(FILES.SUBSCRIBERS, newSubscriber);
    if (!saved) {
      return res.status(500).json({
        success: false,
        error: 'Failed to save subscription. Please try again.',
      });
    }

    console.log(`📧 New subscriber: ${cleanEmail}`);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to the StartUp Club @VIT Bhopal newsletter!',
      data: { id: newSubscriber.id, email: newSubscriber.email },
    });
  } catch (err) {
    console.error('Newsletter error:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// GET /api/newsletter/subscribers — view all subscribers (admin)
router.get('/newsletter/subscribers', (req, res) => {
  try {
    const subscribers = readData(FILES.SUBSCRIBERS);
    const sorted = subscribers.sort(
      (a, b) => new Date(b.subscribedAt) - new Date(a.subscribedAt)
    );
    res.json({
      success: true,
      count: sorted.length,
      data: sorted,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch subscribers' });
  }
});

// DELETE /api/newsletter/unsubscribe — remove subscriber by email
router.delete('/newsletter/unsubscribe', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const subscribers = readData(FILES.SUBSCRIBERS);
    const cleanEmail = sanitize(email).toLowerCase();
    const filtered = subscribers.filter((s) => s.email !== cleanEmail);

    if (filtered.length === subscribers.length) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }

    writeData(FILES.SUBSCRIBERS, filtered);
    console.log(`🚫 Unsubscribed: ${cleanEmail}`);

    res.json({ success: true, message: 'Successfully unsubscribed' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ─────────────────────────────────────────
// STATS ROUTE
// ─────────────────────────────────────────

// GET /api/stats — live stats from actual data
router.get('/stats', (req, res) => {
  try {
    const messages = readData(FILES.MESSAGES);
    const subscribers = readData(FILES.SUBSCRIBERS);
    const events = readData(FILES.EVENTS);

    res.json({
      success: true,
      data: {
        members: 500,
        events: events.length + 44,  // base + stored
        startups: 20,
        awards: 30,
        totalMessages: messages.length,
        unreadMessages: messages.filter((m) => m.status === 'unread').length,
        totalSubscribers: subscribers.length,
        upcomingEvents: events.filter((e) => e.status === 'upcoming').length,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

module.exports = router;