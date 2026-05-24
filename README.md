#  StartUp Club - Official Website

A modern, responsive, and full-stack website for **StartUp Club** — VIT Bhopal's premier entrepreneurship and innovation club.

Built with **React.js**, **Node.js**, and **Express.js**, this platform showcases events, team members, statistics, testimonials, and interactive contact/newsletter functionality with backend API integration.

---

#  Live Deployment

| | URL |
|---|---|
| **Frontend** | [https://startupclub-website.vercel.app](https://startupclub-website.vercel.app/) |

### Verify Backend is Running

Open these URLs directly in your browser to confirm the backend is live:

| Endpoint | URL | Expected Response |
|---|---|---|
| Health Check | [https://startupclub-backend.vercel.app/health](https://startupclub-website-backend.vercel.app/health) | `{"status":"OK","message":"StartUp Club API is running!"}` |
| Events API | [https://startupclub-backend.vercel.app/api/events](https://startupclub-website-backend.vercel.app/api/events) | JSON array of all events |

---

#  Features

##  Core Features

-  React.js frontend with component-based architecture
-  Fully responsive design (Mobile, Tablet, Laptop, Desktop)
-  Modern UI with gradients, glassmorphism, and smooth transitions
-  Sticky navigation bar with smooth scrolling
-  Hero section with animated elements
-  Multiple interactive sections
-  Professional footer with newsletter integration

---

##  Bonus Features

-  Node.js + Express backend
-  REST API integration using Axios
-  Framer Motion animations
-  Dark / Light theme toggle
-  Creative UI/UX
-  Animated counters and statistics
-  Testimonials carousel
-  Event filtering system
-  Contact form API integration
-  Newsletter subscription API
-  Smooth scrolling navigation
-  Accessibility support
-  Deployed on Vercel (frontend + backend separately)

---

#  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 |
| Backend | Node.js, Express.js |
| Styling | CSS3, Flexbox, Grid, CSS Variables |
| Animations | Framer Motion |
| Icons | React Icons |
| HTTP Requests | Axios |
| Deployment | Vercel |

---

#  Complete Project Structure

```plaintext
startupvit-website/
├── backend/
│   ├── data/
│   │   └── events.json                     ← Seed data for events
│   ├── routes/
│   │   └── api.js                          ← API routes for frontend communication
│   ├── utils/
│   │   └── fileStorage.js                  ← File/memory storage utility
│   ├── server.js                           ← Main backend server file
│   ├── vercel.json                         ← Backend Vercel deployment config
│   └── package.json                        ← Backend dependencies and scripts
│
├── frontend/
│   ├── public/
│   │   └── index.html                      ← Main HTML template
│   │
│   ├── src/
│   │   ├── index.js                        ← React entry point
│   │   ├── index.css                       ← Global styles and CSS variables
│   │   ├── App.js                          ← Main application component
│   │   │
│   │   ├── context/
│   │   │   └── ThemeContext.js             ← Dark/Light theme management
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.js / Navbar.css
│   │   │   ├── Hero.js / Hero.css
│   │   │   ├── About.js / About.css
│   │   │   ├── Stats.js / Stats.css
│   │   │   ├── Events.js / Events.css
│   │   │   ├── Team.js / Team.css
│   │   │   ├── Testimonials.js / Testimonials.css
│   │   │   ├── Contact.js / Contact.css
│   │   │   ├── ThemeToggle.js / ThemeToggle.css
│   │   │   └── Footer.js / Footer.css
│   │   │
│   │   └── assets/
│   │       └── images/
│   │
│   └── package.json                        ← Frontend dependencies and scripts
│
├── .gitignore
└── README.md
```

---

#  Getting Started (Local Development)

##  Prerequisites

- Node.js >= 16.x
- npm >= 8.x

```bash
node -v
npm -v
```

---

##  Installation

### 1. Clone Repository

```bash
git clone https://github.com/Bithika-Jain/startupclub-website.git
cd startupclub-website
```

### 2️. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

##  Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
```

---

##  Running Locally

### Start Backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### Start Frontend

```bash
cd frontend
npm start
```

Frontend runs on: `http://localhost:3000`

---

#  API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Backend health check |
| GET | /api/events | Fetch all events |
| GET | /api/events/:id | Fetch single event |
| GET | /api/stats | Fetch club statistics |
| POST | /api/contact | Submit contact form |
| POST | /api/newsletter | Newsletter subscription |
| GET | /api/messages | View all contact messages |
| GET | /api/newsletter/subscribers | View all subscribers |

---

#  Backend Integration

The frontend communicates with the backend using **Axios**:

```javascript
axios.get('/api/events')
axios.post('/api/contact', formData)
axios.post('/api/newsletter', emailData)
```

---

#  Deployment (Vercel)

This project is deployed as **two separate Vercel projects** for reliability.

### Backend Deployment

- Root Directory: `backend`
- Framework: Other
- The `backend/vercel.json` handles routing all requests to `server.js`

### Frontend Deployment

- Root Directory: `frontend`
- Framework: Create React App
- Environment Variables:
  - `CI=false`
  - `GENERATE_SOURCEMAP=false`
  - `REACT_APP_API_URL=https://startupclub-backend.vercel.app`

---

#  UI/UX Design Decisions

## Color Palette

- Primary Gradient: Purple → Pink
- Accent Colors: Neon Blue, Purple
- Dark Theme Support

## Typography

| Usage | Font |
|---|---|
| Headings | Space Grotesk |
| Body Text | Inter |

## Design Features

- Glassmorphism cards
- Animated floating elements
- Hover transitions
- Gradient buttons
- Responsive layouts
- Minimal modern aesthetic

---

#  Responsive Breakpoints

| Breakpoint | Device |
|---|---|
| > 992px | Desktop |
| 768px - 992px | Tablet |
| 576px - 768px | Large Mobile |
| < 576px | Small Mobile |

---

##  Note on Data Persistence

The backend uses JSON file storage which works perfectly in local development. On Vercel (serverless), file writes are ephemeral — contact form submissions and newsletter signups are stored in memory per instance. For persistent production storage, MongoDB Atlas integration is planned.

---

#  Future Improvements

- MongoDB database integration
- Authentication system
- Admin dashboard
- Event registration system
- Real-time notifications
- CMS integration
- Email service integration

---

#  License

This project is licensed under the MIT License.

---

#  Acknowledgements

- React.js
- Node.js
- Express.js
- Framer Motion
- React Icons
- StartUp Club @VIT Bhopal Community
- VIT Bhopal University
