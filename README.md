# NewsHub – Full-Stack News & Blog Management System

A full-stack news/blog publishing platform built with **Laravel 13** (REST API) and **React 18 + Vite** (SPA). It features token-based authentication with **role-based access control**, an analytics dashboard with monthly reports, per-user post view tracking, comment moderation, a contact-message inbox with email replies, newsletter subscriptions, and queued, event-driven email workflows.


---

## 📸 Screenshots

> Add your screenshots below by placing image files in a `screenshots/` folder in the repo and updating the paths.

<h3 align="center">Admin Dashboard</h3>

| Dashboard | Post Management |
|:---:|:---:|
| ![Dashboard](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/dashboard_screenshot.png) | ![Post](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/posts_screenshot.png) | 
| Category Management | Comments Management |
|:---:|:---:|
| ![Category](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/category_screenshot.png) | ![Comments](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/comments_screenshot.png) | 
| User | Setting Management |
|:---:|:---:|
| ![User](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/users_screenshot.png) | ![Message](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/messages_screenshot.png) | 
| User | Setting Management |
|:---:|:---:|
| ![User](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/users_screenshot.png) | ![Setting](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/setting_screenshot.png) | 

<h3 align="center">Pulic Pages</h3>

| Register Page | Login Page |
|:---:|:---:|
| ![Register Page](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/register_screenshot.png) | ![Login Page](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/login_screenshot.png) | 
| Home Page | Contact Page |
|:---:|:---:|
| ![Home Page](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/home_page_screenshot.png) | ![Contact Page](https://github.com/ALI-RAZA816/vite_laravel_blog_website/blob/5f9a9a62b0a94836e7c812c922d6ab3ac1c3c6cd/contact_page_screenshot.png) | 



---

## ✨ Features

### Public / Reader Side
- Browse published articles on the home page with search, pagination, and category-based organization
- View full article detail pages with author, category, publish date, and tags
- **Popular posts** section ranked by view count
- Per-post **view tracking**: each logged-in reader is counted once per article, and the article displays its own read count
- Comment on articles, with edit and delete restricted to the comment owner (authenticated users only)
- Newsletter subscription: subscribers receive an email when a new article is published
- Contact form (rate limited) and About page
- Register, login, and **OTP-based password reset** (forgot password → verify OTP → reset password)
- Site branding (logo, name) pulled dynamically from admin-managed settings

### Authentication & Authorization
- Token-based authentication using **Laravel Sanctum**
- **Role-based access control** with three roles: `admin`, `editor`, and `author`, enforced via a custom `RoleMiddleware` on API routes and by the `RouteProtected` guard on admin pages in React
- User status management (active/inactive)
- Separate admin login page and protected admin panel routes
- Secure password reset: 6-digit OTP generated with `random_int`, stored **hashed**, and valid for 2 minutes
- Optional "instruction" email sent to newly registered or admin-created users

### Admin Panel (Role-Aware)
- **Dashboard** with analytics: total post views, total users, total comments, and post breakdown by category/author, visualized with **Chart.js**
- **Monthly reports module** tracking content performance over time (`MonthlyReport`, `MonthlyViewsModel`) with month-over-month view snapshots
- **Post management**: full CRUD, rich text editing (Jodit editor), image upload, category assignment, tags, draft/publish states, live post preview, search/filter by title, category, and status, pagination, and bulk multi-select delete. Authors see and manage only their own posts, while admins and editors manage all posts
- **Category management**: create, edit, and delete content categories
- **Comment moderation**: view, filter/search, update, and delete comments across all posts (role-restricted to admin/editor/author)
- **User management** (admin-only for create/update/delete; editors can view the user list): assign roles, manage active/inactive status, and search users
- **Messages inbox** (admin-only): read contact messages, mark as read/unread, send email replies, and view the average response time
- **Settings panel** (admin-only): manage site-wide configuration and logo upload

### Backend Engineering
- **Event-driven, queued emails** using Laravel Events, Listeners, and the database queue driver: registration instructions, newsletter alerts on publish, contact-message notifications, and admin replies
- HTML email templates (Blade) for OTP, instructions, newsletters, and message replies
- **Rate limiting**: 14 named limiters (login, register, OTP, contact, public endpoints, authenticated routes, and more)
- Validation through dedicated **Form Request** classes
- Eloquent relationships, model events (deleting a post also deletes its comments), migrations, JSON-driven seeders, and factories
- Automated **PHPUnit feature tests** for login, user registration, and post creation

---

## 🛠️ Tech Stack

**Backend**
- PHP 8.3, Laravel 13
- Laravel Sanctum (API token authentication)
- MySQL
- Eloquent ORM with relational models (Posts, Categories, Comments, Users, Settings, Post Views, Monthly Reports, Messages, Newsletters, Reset Passwords)
- Laravel Events, Listeners, Queues (database driver), and Mail (SMTP)
- PHPUnit (feature testing)

**Frontend**
- React 18 + Vite
- React Router DOM 6 (routing + protected routes)
- Context API (state management across Auth, Posts, Categories, Comments, Users, Dashboard, Settings, Messages, Newsletter, and Password Reset domains)
- Bootstrap 5 + CSS Modules (UI styling)
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
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── Admin/       # Auth, Post, Category, Comment, User, Dashboard, Setting, MonthlyReport, AdminMessage
│   │   │   │   └── Public*.php  # Public-facing post, category, comment, setting endpoints
│   │   │   ├── Middleware/RoleMiddleware.php
│   │   │   └── Requests/        # Form Request validation classes
│   │   ├── Models/              # Post, Category, Comment, User, Setting, PostView, MonthlyReport,
│   │   │                        # MonthlyViewsModel, Message, NewsLetter, ResetPassword
│   │   ├── Events/              # UserRegistered, SubscribedUser, RecieveMessage, ReplyMessage
│   │   ├── Listeners/           # Queued listeners that send emails
│   │   └── Mail/                # Mailable classes
│   ├── database/                # migrations, seeders, factories, json seed data
│   ├── resources/views/mail/    # HTML email templates
│   ├── routes/api.php
│   └── tests/Feature/           # Login, user registration, and post creation tests
│
└── fronted/                 # React + Vite SPA
    └── src/
        ├── Pages/           # Home, BlogPost, About, Contact, Login, Register, password reset pages, Admin* pages
        ├── components/      # Header, Footer, Sidebar, AdminHeader, Analytics, RecentPost, RecentComments...
        ├── Context/         # AuthContext, PostContext, CategoryContext, CommentContext, UserContext,
        │                    # DashboardContext, SettingContext, MonthlyReportContext, Public*Context, ...
        ├── Auth/            # RouteProtected, AuthDashboard, password reset route guards
        ├── Http/            # API base URL config
        └── services/        # apiClient.js
```

---

## 🔌 API Overview

All endpoints are served under `/api`. Key routes include:

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/login` | Public | User login |
| POST | `/account` | Public | Register account |
| POST | `/forgot-password` | Public | Send OTP to the user's email |
| POST | `/verify-otp` | Public | Verify the OTP |
| POST | `/reset-password` | Public | Set a new password |
| GET | `/public-posts` | Public | List published posts and popular posts |
| GET | `/public-category` | Public | List categories |
| GET | `/post-comments/{id}` | Public | Get comments for a post |
| GET | `/post-view/{id}` | Public | Fetch a single post and register its view (view counter) |
| GET | `/show-setting` | Public | Fetch site settings |
| POST | `/message` | Public | Send a contact message |
| POST | `/logout` | Auth | Log out and revoke token |
| POST | `/newsletter` | Auth | Subscribe to the newsletter |
| POST | `/public-comments` | Auth | Add a comment |
| GET/PUT/DELETE | `/public-comments/{id}` | Auth | View/update/delete own comment |
| GET | `/dashboard` | admin, editor, author | Dashboard analytics |
| GET | `/month-report` | admin, editor, author | Monthly performance report |
| POST/GET/PUT/DELETE | `/posts` | admin, editor, author | Post CRUD |
| POST | `/multi-delete-post` | admin, editor, author | Bulk delete posts |
| POST/GET/PUT/DELETE | `/categories` | admin, editor, author | Category CRUD |
| POST/GET/PUT/DELETE | `/comments` | admin, editor, author | Comment CRUD/moderation |
| GET | `/filter-comments` | admin, editor, author | Search/filter comments |
| GET | `/users`, `/users/{id}` | admin, editor | List/view users |
| POST/PUT/DELETE | `/users` | admin | User management |
| POST/GET/PUT/DELETE | `/settings` | admin | Site settings management |
| GET/PUT/DELETE | `/messages` | admin | Contact messages inbox |
| PUT | `/mark-as-read/{id}`, `/mark-as-unread/{id}` | admin | Update message read status |
| POST | `/reply-message` | admin | Reply to a contact message by email |

Authorization is enforced with Sanctum tokens plus a custom `role:` middleware (e.g. `role:admin`, `role:admin,editor,author`). Every route is also protected by a named rate limiter.

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
# configure DB_* and MAIL_* variables in .env
php artisan migrate --seed
php artisan serve
```

Emails are sent through the queue, so start a queue worker in a separate terminal:

```bash
php artisan queue:work
```

> `.env.example` uses `MAIL_MAILER=log` by default, so emails are written to the log. Set your SMTP credentials in `.env` to send real emails.

### Frontend (React + Vite)
```bash
cd fronted
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` by default and communicates with the Laravel API at `http://localhost:8000/api` (configured in `fronted/src/Http/Http.jsx`). CORS in the backend allows the `http://localhost:5173` origin.

### Running Tests
```bash
cd backend
php artisan test
```

---

## 👤 Roles & Permissions

| Role | Permissions |
|---|---|
| **Admin** | Full access: manage users, settings, messages, posts, categories, comments, and view analytics |
| **Editor** | Manage all posts, categories, and comments; view analytics and the user list |
| **Author** | Manage own posts, categories, and comments; view analytics |
| **User (public)** | Browse posts, comment on articles, and subscribe to the newsletter when logged in |

---

## 📄 License

This project is open-sourced for portfolio and educational purposes.

---

## 🙋 Author

**Ali Raza Mujahid**
Full-Stack Developer (Laravel · React.js · MySQL)
📧 alirazamujahid102@gmail.com