# My Blog Platform

A modern, full-stack blog platform built with Node.js, Express, MongoDB, React, and Tailwind CSS. Features user authentication, post management, and a beautiful responsive design.

## 🚀 Features

### Backend Features
- **User Authentication** - JWT-based login/registration system
- **Blog Post CRUD** - Create, read, update, delete posts
- **Author Management** - Posts linked to authors
- **Tag System** - Organize posts with tags
- **Image Support** - Cover images for posts
- **RESTful API** - Clean API endpoints
- **MongoDB Integration** - Robust database storage

### Frontend Features
- **Modern UI** - Built with React + Tailwind CSS
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Hero Section** - Beautiful landing page with search
- **Post Cards** - Professional blog post previews
- **Real-time Search** - Filter posts by title, excerpt, or tags
- **Admin Dashboard** - Create and manage posts
- **Dark Mode Ready** - Components support dark theme
- **Loading States** - Smooth user experience

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Flowbite React** - UI component library
- **Axios-like API** - Custom API utilities

## 📁 Project Structure

```
nginx/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middlewares/    # Custom middleware
│   │   └── utils/          # Utility functions
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
└── frontend/               # React + Vite frontend
    ├── src/
    │   ├── components/     # Reusable components
    │   ├── pages/          # Page components
    │   ├── utils/          # API utilities
    │   └── main.jsx        # Entry point
    ├── package.json        # Frontend dependencies
    └── index.html          # HTML template
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure your .env file:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/blogplatform
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   ```

5. **Start the backend server:**
   ```bash
   npm run dev
   ```

   Backend will be running on `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend will be running on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)

### Health Check
- `GET /api/health` - Server status

## 🎨 Screenshots

### Homepage
- Modern hero section with search functionality
- Responsive grid layout for blog posts
- Professional post cards with images and metadata

### Admin Dashboard
- Post creation form with rich features
- User authentication and authorization
- Clean, intuitive interface

## 🔒 Environment Variables

### Backend (.env)
```env
PORT=3000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/blog   # Database connection
JWT_SECRET=your-secret-key                   # JWT signing secret
JWT_EXPIRES_IN=7d                           # Token expiration
```

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud database
2. Update MONGODB_URI in production environment
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify, Vercel, or similar platform
3. Update API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by **Azamat** 

## 🙏 Acknowledgments

- **Flowbite** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React** - Frontend library
- **Express.js** - Backend framework
- **MongoDB** - Database solution

---

**Happy Blogging! 📝✨**
