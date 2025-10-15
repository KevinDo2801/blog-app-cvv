# Blog Application

A full-stack blog application built with React and Express.js, featuring user authentication, rich text editing, and image uploads.

![Blog App](https://img.shields.io/badge/React-18.2.0-blue) ![Express](https://img.shields.io/badge/Express-4.18.2-green) ![MySQL](https://img.shields.io/badge/MySQL-2.3.3-orange)

## 🌟 Features

- **User Authentication** - Secure JWT-based authentication with httpOnly cookies
- **Create & Edit Posts** - Rich text editor (Quill) for creating beautiful blog posts
- **Image Uploads** - Upload and display images in blog posts
- **Category Filtering** - Organize and filter posts by categories (art, science, technology, cinema, design, food)
- **Responsive Design** - Modern, mobile-friendly UI
- **User Profiles** - User registration and profile management
- **CRUD Operations** - Full create, read, update, and delete functionality for posts
- **Related Posts** - View related posts in the same category

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **SCSS** - Styled with Sass
- **React Quill** - Rich text editor
- **DOMPurify** - HTML sanitization
- **Context API** - Global state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **cookie-parser** - Cookie parsing middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd blogappcv
```

### 2. Install Dependencies

#### Install root dependencies
```bash
npm install
```

#### Install backend dependencies
```bash
cd api
npm install
```

#### Install frontend dependencies
```bash
cd ../client
npm install
```

### 3. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE blog;
USE blog;

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  desc TEXT NOT NULL,
  img VARCHAR(255),
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  uid INT NOT NULL,
  cat VARCHAR(45),
  FOREIGN KEY (uid) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. Environment Variables

#### Backend Environment Variables

Create a `.env` file in the `api` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=blog

# JWT Secret
JWT_SECRET=your_secret_key_here

# Server Port
PORT=8800
```

**Important:** Replace the placeholder values with your actual database credentials and generate a secure JWT secret.

#### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# API URL
REACT_APP_API_URL=http://localhost:8800/api
```

**Note:** For production deployment, update `REACT_APP_API_URL` to point to your production API server.

## 🏃‍♂️ Running the Application

### Development Mode

#### Start the backend server (from the `api` directory):
```bash
cd api
npm start
# or
yarn start
```
The API server will run on `http://localhost:8800`

#### Start the frontend development server (from the `client` directory):
```bash
cd client
npm start
# or
yarn start
```
The React app will run on `http://localhost:3000`

### Production Mode

#### Build the frontend:
```bash
cd client
npm run build
```

## 📁 Project Structure

```
blogappcv/
├── api/                          # Backend Express.js application
│   ├── controllers/              # Route controllers
│   │   ├── auth.js              # Authentication logic
│   │   ├── post.js              # Post CRUD operations
│   │   └── user.js              # User management
│   ├── routes/                   # API routes
│   │   ├── auth.js              # Auth endpoints
│   │   ├── posts.js             # Post endpoints
│   │   └── users.js             # User endpoints
│   ├── db.js                     # Database connection
│   ├── index.js                  # Server entry point
│   └── package.json              # Backend dependencies
│
├── client/                       # Frontend React application
│   ├── public/                   # Static files
│   │   ├── upload/              # User uploaded images
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Footer.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/             # React Context
│   │   │   ├── authContext.js   # Authentication state
│   │   │   └── themeContext.js  # Theme state
│   │   ├── img/                 # Static images
│   │   ├── pages/               # Page components
│   │   │   ├── Home.jsx         # Home page
│   │   │   ├── Login.jsx        # Login page
│   │   │   ├── Register.jsx     # Registration page
│   │   │   ├── Single.jsx       # Single post view
│   │   │   └── Write.jsx        # Create/Edit post
│   │   ├── utils/               # Utility functions
│   │   │   └── imageHelper.js   # Image URL helper
│   │   ├── App.js               # Main app component
│   │   ├── axios.js             # Axios configuration
│   │   ├── index.js             # React entry point
│   │   └── style.scss           # Global styles
│   └── package.json             # Frontend dependencies
│
├── .gitignore                    # Git ignore file
└── README.md                     # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Posts
- `GET /api/posts` - Get all posts (optional `?cat=category` query parameter)
- `GET /api/posts/:id` - Get a single post
- `POST /api/posts` - Create a new post (requires authentication)
- `PUT /api/posts/:id` - Update a post (requires authentication)
- `DELETE /api/posts/:id` - Delete a post (requires authentication)

### Upload
- `POST /api/upload` - Upload an image file

## 🎨 Features in Detail

### User Authentication
- Secure password hashing with bcryptjs
- JWT tokens stored in httpOnly cookies
- Protected routes requiring authentication

### Rich Text Editor
- React Quill integration for formatted content
- Support for headings, lists, links, and more
- HTML sanitization with DOMPurify

### Image Management
- File upload with Multer
- Image preview before upload
- Images stored in `/client/public/upload/`

### Category System
- Art
- Science
- Technology
- Cinema
- Design
- Food

## 🔒 Security

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- httpOnly cookies to prevent XSS attacks
- HTML content sanitized with DOMPurify
- SQL injection prevention with parameterized queries

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👤 Author

Kevin Do - [My Profile](https://github.com/KevinDo2801)

## 🙏 Acknowledgments

- React documentation
- Express.js documentation
- MySQL documentation
- React Quill
- All contributors who helped with this project

---

**Note:** Make sure to update the `.env` file with your actual database credentials and never commit sensitive information to version control.

