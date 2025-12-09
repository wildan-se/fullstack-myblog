# MyBlog - Fullstack Blog Application

## 🚀 Deskripsi Proyek

MyBlog adalah aplikasi blog fullstack yang dibangun dengan Vue.js (frontend) dan Express.js (backend) dengan MongoDB sebagai database.

## 📂 Struktur Proyek

```
myblog/
├── backend/          # Express.js API Server
│   ├── src/
│   │   ├── config/   # Konfigurasi database
│   │   ├── controllers/  # Controller logic
│   │   ├── middlewares/  # Custom middleware
│   │   ├── models/   # MongoDB models
│   │   ├── routes/   # API routes
│   │   ├── utils/    # Helper functions
│   │   ├── app.js    # Express app setup
│   │   └── server.js # Server entry point
│   ├── uploads/      # Uploaded images (auto-created)
│   └── .env          # Environment variables
├── frontend/         # Vue.js SPA
│   ├── src/
│   │   ├── assets/   # Static assets
│   │   ├── components/  # Vue components
│   │   ├── router/   # Vue Router setup
│   │   ├── store/    # Vuex state management
│   │   ├── views/    # Page components
│   │   ├── App.vue   # Root component
│   │   └── main.js   # Entry point
│   └── public/       # Public static files
└── index.html        # Project landing page

```

## ✨ Fitur

- ✅ Autentikasi user (Register, Login, Logout)
- ✅ Reset password via email
- ✅ CRUD Postingan blog dengan rich text editor (Quill)
- ✅ CRUD Kategori
- ✅ Komentar pada postingan
- ✅ Upload gambar
- ✅ Admin panel untuk manajemen konten
- ✅ Responsive design dengan Tailwind CSS
- ✅ Protected routes & authorization

## 🛠️ Teknologi yang Digunakan

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT untuk autentikasi
- Bcrypt untuk password hashing
- Multer untuk upload file
- Nodemailer untuk email
- Express Validator
- CORS

### Frontend

- Vue 3 (Composition & Options API)
- Vue Router
- Vuex (State Management)
- Tailwind CSS
- Quill Editor (@vueup/vue-quill)
- Axios
- Vue Toastification

## 📋 Prasyarat

- Node.js (v16 atau lebih baru)
- MongoDB (lokal atau cloud)
- NPM atau Yarn

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone <repository-url>
cd myblog
```

### 2. Setup Backend

```bash
cd backend
npm install

# Copy .env.example ke .env dan sesuaikan konfigurasi
cp .env.example .env

# Edit .env dengan konfigurasi Anda
# PENTING: Ubah MONGO_URI, JWT_SECRET, dll.

# Jalankan server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## 🔐 Konfigurasi Environment Variables (Backend)

Buat file `.env` di folder `backend/` dengan isi:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/myblog
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=http://localhost:5173
ADMIN_REGISTRATION_SECRET=your-admin-secret-key

# Email (Opsional - untuk fitur reset password)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM_NAME=MyBlog
```

## 👤 Membuat User Admin

Gunakan endpoint berikut untuk membuat user admin pertama:

```bash
POST http://localhost:5000/api/auth/register-admin
Content-Type: application/json

{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "password123",
  "adminSecretKey": "your-admin-secret-key"
}
```

Atau gunakan file yang tersedia (jika ada) untuk seeding data.

## 📝 API Endpoints

### Auth

- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `POST /api/auth/register-admin` - Register admin
- `POST /api/auth/forgot-password` - Request reset password
- `PUT /api/auth/reset-password/:token` - Reset password

### Posts

- `GET /api/posts` - Get all posts (with pagination & search)
- `GET /api/posts/:slug` - Get single post by slug
- `POST /api/posts` - Create post (admin only)
- `PUT /api/posts/:id` - Update post (admin only)
- `DELETE /api/posts/:id` - Delete post (admin only)

### Categories

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Upload

- `POST /api/upload` - Upload image (admin only)

## 🐛 Bug Fixes & Improvements

### Perbaikan yang Telah Dilakukan:

1. ✅ Fixed HTML `lang` attribute dari kosong menjadi "id"
2. ✅ Extended JWT expiration dari 1 jam menjadi 7 hari
3. ✅ Improved CORS configuration dengan origin spesifik
4. ✅ Added auto-creation untuk uploads directory
5. ✅ Fixed logo favicon path di index.html
6. ✅ Fixed config/index.js yang kosong
7. ✅ Created proper landing page untuk root index.html
8. ✅ Added .env.example untuk dokumentasi yang lebih baik

## 📦 Build untuk Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

File build akan ada di folder `frontend/dist/`

## 🤝 Contributing

Contributions, issues, dan feature requests sangat diterima!

## 📄 License

[MIT](LICENSE)

## 👨‍💻 Author

Muhammad Wildan

---

**Happy Coding! 🚀**
