# 🚀 StartUp Club - Official Website

A modern, responsive, and full-stack website for **StartUp Club** — VIT Bhopal's premier entrepreneurship and innovation club.

Built with **React.js**, **Node.js**, and **Express.js**, this platform showcases events, team members, statistics, testimonials, and interactive contact/newsletter functionality with backend API integration.

---

# 📸 Features

## ✅ Core Features

- ⚛️ React.js frontend with component-based architecture
- 📱 Fully responsive design (Mobile, Tablet, Laptop, Desktop)
- 🎨 Modern UI with gradients, glassmorphism, and smooth transitions
- 🧭 Sticky navigation bar with smooth scrolling
- 🦸 Hero section with animated elements
- 📊 Multiple interactive sections
- 🦶 Professional footer with newsletter integration

---

## 🌟 Bonus Features

- 🖥️ Node.js + Express backend
- 🔗 REST API integration using Axios
- 🎬 Framer Motion animations
- 🌓 Dark / Light theme toggle
- 🎯 Creative UI/UX
- 🔢 Animated counters and statistics
- 🎠 Testimonials carousel
- 🏷️ Event filtering system
- 📨 Contact form API integration
- 📧 Newsletter subscription API
- ⚡ Smooth scrolling navigation
- ♿ Accessibility support
- 🌐 Vercel deployment ready

---

# 🛠️ Tech Stack

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

# 📂 Complete Project Structure

```plaintext
startupvit-website/
├── backend/
│   ├── .env                                ← Environment variables
│   ├── server.js                           ← Main backend server file
│   ├── package.json                        ← Backend dependencies and scripts
│   │
│   └── routes/
│       └── api.js                          ← API routes for frontend communication
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
│   │   │   ├── Navbar.js                   ← Navigation bar component
│   │   │   ├── Navbar.css                  ← Navbar styling
│   │   │   │
│   │   │   ├── Hero.js                     ← Hero section component
│   │   │   ├── Hero.css                    ← Hero section styling
│   │   │   │
│   │   │   ├── About.js                    ← About section
│   │   │   ├── About.css                   ← About section styling
│   │   │   │
│   │   │   ├── Stats.js                    ← Statistics section
│   │   │   ├── Stats.css                   ← Statistics styling
│   │   │   │
│   │   │   ├── Events.js                   ← Events section with API integration
│   │   │   ├── Events.css                  ← Events styling
│   │   │   │
│   │   │   ├── Team.js                     ← Team members section
│   │   │   ├── Team.css                    ← Team section styling
│   │   │   │
│   │   │   ├── Testimonials.js             ← Testimonials carousel
│   │   │   ├── Testimonials.css            ← Testimonials styling
│   │   │   │
│   │   │   ├── Contact.js                  ← Contact form with backend integration
│   │   │   ├── Contact.css                 ← Contact section styling
│   │   │   │
│   │   │   ├── ThemeToggle.js              ← Dark/Light mode toggle
│   │   │   ├── ThemeToggle.css             ← Theme toggle styling
│   │   │   │
│   │   │   ├── Footer.js                   ← Footer with newsletter API
│   │   │   └── Footer.css                  ← Footer styling
│   │   │
│   │   └── assets/
│   │       └── images/                     ← Images and media assets
│   │
│   ├── package.json                        ← Frontend dependencies and scripts
│   └── README.md                           ← Frontend-specific instructions
│
├── .gitignore                              ← Git ignored files
├── vercel.json                             ← Vercel deployment configuration
└── README.md                               ← Main project documentation
```

---

# 🚀 Getting Started

## 📋 Prerequisites

Make sure you have installed:

- Node.js >= 16.x
- npm >= 8.x

Check versions:

```bash
node -v
npm -v
```

---

# 📥 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/startupvit-website.git
cd startupvit-website
```

---

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
```

---

# ▶️ Running the Project

## Start Backend Server

Open terminal inside backend folder:

```bash
cd backend
npm run dev
```

Backend runs on:

```plaintext
http://localhost:5000
```

---

## Start Frontend Server

Open another terminal:

```bash
cd frontend
npm start
```

Frontend runs on:

```plaintext
http://localhost:3000
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/events | Fetch all events |
| GET | /api/team | Fetch team members |
| GET | /api/stats | Fetch club statistics |
| POST | /api/contact | Submit contact form |
| POST | /api/newsletter | Newsletter subscription |
| GET | /health | Backend health check |

---

# 🔗 Backend Integration

The frontend communicates with the backend using **Axios**.

Example:

```javascript
axios.get('/api/events')
axios.post('/api/contact', formData)
axios.post('/api/newsletter', emailData)
```

---

# 🎨 UI/UX Design Decisions

## Color Palette

- Primary Gradient: Purple → Pink
- Accent Colors: Neon Blue, Purple
- Dark Theme Support

---

## Typography

| Usage | Font |
|---|---|
| Headings | Space Grotesk |
| Body Text | Inter |

---

## Design Features

- Glassmorphism cards
- Animated floating elements
- Hover transitions
- Gradient buttons
- Responsive layouts
- Minimal modern aesthetic

---

# 📱 Responsive Breakpoints

| Breakpoint | Device |
|---|---|
| > 992px | Desktop |
| 768px - 992px | Tablet |
| 576px - 768px | Large Mobile |
| < 576px | Small Mobile |

---

# 🌐 Deployment

## Deploy on Vercel

### Step 1

Push project to GitHub.

### Step 2

Go to:

```plaintext
https://vercel.com
```

### Step 3

Import GitHub repository.

### Step 4

Click Deploy.

---

# 📦 Build Commands

## Frontend Build

```bash
npm run build
```

## Backend Start

```bash
npm run dev
```

---

## 📝 Note on Data Persistence

The backend uses JSON file storage which works perfectly in local development.
On Vercel (serverless), file writes are ephemeral. For production with persistent
data, integrate MongoDB Atlas or similar (planned enhancement).

---

# 🧪 Future Improvements

- MongoDB database integration
- Authentication system
- Admin dashboard
- Event registration system
- Real-time notifications
- CMS integration
- Email service integration

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- React.js
- Node.js
- Express.js
- Framer Motion
- React Icons
- StartUp Club @VIT Bhopal Community
- VIT Bhopal University

---

