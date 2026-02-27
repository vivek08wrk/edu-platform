# 📚 EduPlatform

A full-stack educational platform for sharing and accessing PDF resources across multiple schools and classes. Built with modern web technologies and deployed on cloud infrastructure.

## 🌐 Live Demo

- **Frontend**: [https://edu-platform-seven-chi.vercel.app](https://edu-platform-seven-chi.vercel.app)
- **Backend API**: [https://edu-platform-dqrr.onrender.com](https://edu-platform-dqrr.onrender.com)

## ✨ Features

### For Students
- 🔍 **Smart Search** - Search PDFs by subject, class, or school name
- 📄 **PDF Preview** - View PDFs directly in the browser
- ⬇️ **Download** - Download PDFs for offline access
- 🔐 **Secure Access** - JWT-based authentication
- 🎯 **Pagination** - Browse through resources efficiently

### For Academy Users
- 📤 **Upload PDFs** - Share educational resources with students
- 🏫 **Multi-School Support** - Manage content for multiple institutions
- 📊 **Organize Content** - Tag PDFs by subject and class
- ☁️ **Cloud Storage** - Automatic upload to Cloudinary

### Technical Features
- ⚡ **Redis Caching** - Lightning-fast search results
- 🔄 **CORS Enabled** - Secure cross-origin requests
- 🎨 **Modern UI** - Beautiful gradient design with Tailwind CSS
- 🔔 **Toast Notifications** - Real-time feedback with react-toastify
- 🚀 **Production Ready** - Deployed on Render and Vercel

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **Vite** 6.0.11 - Build tool and dev server
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework
- **Axios** 1.7.9 - HTTP client
- **React Router DOM** 7.1.3 - Client-side routing
- **React Toastify** 11.0.2 - Toast notifications
- **Lucide React** 0.469.0 - Icon library

### Backend
- **Node.js** & **Express** 5.1.0 - Server framework
- **MongoDB** with **Mongoose** 8.9.4 - Database
- **Redis** with **ioredis** 5.4.2 - Caching layer
- **JWT** (jsonwebtoken) 9.0.2 - Authentication
- **Cloudinary** 2.6.1 - File storage
- **Multer** 1.4.5-lts.1 - File upload handling
- **bcryptjs** 2.4.3 - Password hashing

## 📁 Project Structure

```
edu-platform/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and Redis configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, upload, CORS middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions (Cloudinary, Cache)
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios configuration
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Auth)
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # App router
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Redis Cloud account
- Cloudinary account

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivek08wrk/edu-platform.git
   cd edu-platform/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update API URL** (for local development)
   
   Edit `src/api/axios.js`:
   ```javascript
   const instance = axios.create({
     baseURL: "http://localhost:5000/api", // Local backend
     timeout: 10000,
   });
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 🔑 Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `REDIS_URL` | Redis connection string | `redis://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `supersecretkey123` |
| `CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUD_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUD_API_SECRET` | Cloudinary API secret | `your_secret` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### PDF Management
- `POST /api/pdf/upload` - Upload PDF (Academy only) 🔒
- `GET /api/pdf/search` - Search PDFs 🔒
- `GET /api/pdf/preview/:id` - Preview PDF 🔒
- `GET /api/pdf/download/:id` - Download PDF 🔒

🔒 = Requires JWT authentication

### Example Request
```javascript
// Search PDFs
const response = await axios.get('/api/pdf/search', {
  params: { subject: 'Mathematics', limit: 6 },
  headers: { Authorization: `Bearer ${token}` }
});
```

## 🎨 UI Features

- **Gradient Branding** - Beautiful blue gradient for "Edu" text with white "Platform"
- **Book Icon** - Gradient container with book icon across all pages
- **Toast Notifications** - Dark theme notifications for user feedback
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modal Dialogs** - PDF preview in elegant modal windows
- **Loading States** - User-friendly loading indicators

## 🌍 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add all environment variables in Render dashboard
6. Deploy!

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory: `frontend`
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy!

### Keep Backend Warm (Optional)
To prevent cold starts on Render's free tier:
1. Visit [cron-job.org](https://cron-job.org)
2. Create a new cron job
3. Set URL: `https://edu-platform-dqrr.onrender.com/`
4. Schedule: Every 10 minutes
5. Enable the job

## 🧪 Testing

The application has been thoroughly tested in production:

✅ Backend Health Check  
✅ User Registration  
✅ User Login & Authentication  
✅ PDF Search (Protected Route)  
✅ Frontend Deployment  
✅ Database Connection (MongoDB Atlas)  
✅ CORS Configuration  

## 🐛 Known Issues & Solutions

### Render Cold Starts
- **Issue**: First request after 15 minutes of inactivity takes 50+ seconds
- **Solution**: Use cron-job.org to ping the API every 10 minutes

### File Uploads
- **Note**: Render uses ephemeral filesystem. The `uploads/` directory is auto-created on each deployment but temporary files are cleaned up after processing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Vivek Singh**
- GitHub: [@vivek08wrk](https://github.com/vivek08wrk)

## 🙏 Acknowledgments

- Thanks to all the open-source libraries that made this project possible
- Render for backend hosting
- Vercel for frontend hosting
- MongoDB Atlas for database hosting
- Redis Cloud for caching
- Cloudinary for file storage

---

<div align="center">
  Made with ❤️ for education
</div>
