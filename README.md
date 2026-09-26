# NewsHub – Full-Stack News & Blog Management System

A full-stack news/blog publishing platform built with **Laravel** (REST API) and **React.js** (SPA), featuring role-based access control, a real-time analytics dashboard, comment moderation, and a rich content management workflow for publishing articles.


---

## 📸 Screenshots

> Add your screenshots below by placing image files in a `screenshots/` folder in the repo and updating the paths.

<h3 align="center">Admin Dashboard</h3>

| Dashboard | Post Management |
|:---:|:---:|
| ![Dashboard](https://raw.githubusercontent.com/ALI-RAZA816/vite_laravel_blog_website/6673e96e1892f39862758e2810275a36a2615961/Dashboard.png) | ![Post Management](https://raw.githubusercontent.com/ALI-RAZA816/vite_laravel_blog_website/6673e96e1892f39862758e2810275a36a2615961/Posts.png) | 
| Category Management | Comments Management |
|:---:|:---:|
| ![Category Management](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/9737042114c7538c38fea49436311ffa6f8f0bbb/Categories.png) | ![Comments Management](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/9737042114c7538c38fea49436311ffa6f8f0bbb/Comments.png) | 
| User | Setting Management |
|:---:|:---:|
| ![User Management](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/9737042114c7538c38fea49436311ffa6f8f0bbb/Users.png) | ![Setting Management](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/9737042114c7538c38fea49436311ffa6f8f0bbb/Setting.png) | 




---

## ✨ Features

### Public / Reader Side
- Browse published articles on the home page with category-based organization
- View full article detail pages with author, category, publish date, and tags
- Per-post **view tracking** — each article records and displays its own read count
- Comment on articles (authenticated users only)
- Contact and About pages
- Site branding (logo, name) pulled dynamically from admin-managed settings

### Authentication & Authorization
- Token-based authentication using **Laravel Sanctum**
- **Role-based access control** with three roles: `admin`, `editor`, and `author`, enforced via a custom `RoleMiddleware` on both API routes and protected React routes
- User status management (active/inactive)
- Protected admin routes on the frontend via a dedicated route guard (`RouteProtected`)

### Admin Panel (Role-Aware)
- **Dashboard** with real-time analytics: total post views, total users, total comments, and post breakdown by category/author, visualized with **Chart.js**
- **Monthly reports module** tracking content performance over time (`MonthlyReport`, `MonthlyViewsModel`)
- **Post management** — full CRUD, rich text editing (Jodit editor), category assignment, tags, draft/publish states, live post preview, search/filter, and bulk multi-select delete
- **Category management** — create, edit, delete content categories
- **Comment moderation** — view, filter/search, update, and delete comments across all posts (role-restricted to admin/editor/author)
- **User management** (admin-only) — create, edit, delete users, assign roles, manage active/inactive status, search users
- **Settings panel** — manage site-wide configuration and logo upload

---

## 🛠️ Tech Stack

**Backend**
- PHP 8.3, Laravel 13
- Laravel Sanctum (API token authentication)
- MySQL
- Eloquent ORM with relational models (Posts, Categories, Comments, Users, Settings, Post Views, Monthly Reports)

**Frontend**
- React 18 + Vite
- React Router DOM (routing + protected routes)
- Context API (state management across Auth, Posts, Categories, Comments, Users, Dashboard, and Settings domains)
- Bootstrap 5 (UI styling)
- Chart.js / react-chartjs-2 (dashboard analytics visualizations)
- Jodit React (rich text editor for post authoring)

**Tools**
- Git & GitHub
- Postman / Thunder Client (API testing)

---

## 🗂️ Project Structure

```
vite_laravel_blog_website/
├── backend/                 # Laravel REST API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   ├── Admin/       # Auth, Post, Category, Comment, User, Dashboard, Setting, MonthlyReport
│   │   │   └── Public*.php  # Public-facing post, category, comment, setting endpoints
│   │   ├── Models/          # Post, Category, Comment, User, Setting, PostView, MonthlyReport, MonthlyViewsModel
│   │   └── Http/Middleware/RoleMiddleware.php
│   ├── database/migrations/
│   └── routes/api.php
│
└── fronted/                 # React + Vite SPA
    └── src/
        ├── Pages/           # Home, BlogPost, About, Contact, Login, Register, Admin* pages
        ├── components/      # Header, Footer, Sidebar, AdminHeader, Analytics, RecentPost, RecentComments...
        ├── Context/         # AuthContext, PostContext, CategoryContext, CommentContext, UserContext,
        │                    # DashboardContext, SettingContext, MonthlyReportContext, Public*Context
        ├── Auth/            # RouteProtected, AuthDashboard
        └── services/        # apiClient.js
```

---

## 🔌 API Overview

All endpoints are served under `/api`. Key routes include:

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/login` | Public | User login |
| POST | `/account` | Public | Register account |
| GET | `/public-posts` | Public | List published posts |
| GET | `/public-category` | Public | List categories |
| GET | `/post-comments/{id}` | Public | Get comments for a post |
| GET | `/post-view/{id}` | Public | Register/view a single post (view counter) |
| GET | `/show-setting` | Public | Fetch site settings |
| POST | `/public-comments` | Auth | Add a comment |
| PUT/DELETE | `/public-comments/{id}` | Auth | Update/delete own comment |
| GET | `/dashboard` | admin, editor, author | Dashboard analytics |
| GET | `/month-report` | admin, editor, author | Monthly performance report |
| POST/GET/PUT/DELETE | `/posts` | admin, editor, author | Post CRUD |
| POST/GET/PUT/DELETE | `/categories` | admin, editor, author | Category CRUD |
| POST/GET/PUT/DELETE | `/comments` | admin, editor, author | Comment CRUD/moderation |
| POST | `/multi-delete-post` | admin, editor, author | Bulk delete posts |
| POST/GET/PUT/DELETE | `/users` | admin (index/show also editor) | User management |
| POST/GET/PUT/DELETE | `/settings` | admin | Site settings management |

Authorization is enforced with Sanctum tokens plus a custom `role:` middleware (e.g. `role:admin`, `role:admin,editor,author`).

---

## ⚙️ Installation & Setup

### Prerequisites
- PHP >= 8.3, Composer
- Node.js >= 18, npm
- MySQL

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# configure DB_* variables in .env
php artisan migrate --seed
php artisan serve
```

### Frontend (React + Vite)
```bash
cd fronted
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default and communicates with the Laravel API at `http://localhost:8000/api`.

---

## 👤 Roles & Permissions

| Role | Permissions |
|---|---|
| **Admin** | Full access — manage users, settings, posts, categories, comments, view analytics |
| **Editor** | Manage posts, categories, comments, view analytics and user list |
| **Author** | Manage own posts, categories, comments, view analytics |
| **User (public)** | Browse posts, comment on articles when logged in |

---

## 📄 License

This project is open-sourced for portfolio and educational purposes.

---

## 🙋 Author

**Ali Raza Mujahid**
Full-Stack Developer (Laravel · React.js · MySQL)
📧 alirazamujahid102@gmail.com