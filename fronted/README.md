# SlowLiving Blog — React Conversion

Har screenshot ka alag React component banaya gaya hai, apni `.module.css` file ke saath.
Bootstrap grid/utilities (`row`, `col-*`) layout ke liye use hui hain, aur colors/fonts/spacing
CSS Modules mein hain — original design se match karne ke liye.

## Run karne ka tareeqa

```bash
npm install
npm run dev
```

Phir browser mein `http://localhost:5173` open karein.

## Pages (Routes)

| Route | Component | Screenshot |
|---|---|---|
| `/` | Home | Home page (hero + recent stories) |
| `/all-posts` | AllPosts | All Stories archive |
| `/category/minimalism` | CategoryArchive | Minimalism category page |
| `/post/:slug` | BlogPost | Single article page |
| `/about` | About | About page |
| `/contact` | Contact | Contact page |
| `/login` | Login | Login / Register |
| `/profile` | UserProfile | User account / bookmarks |
| `/admin/login` | AdminLogin | Admin security check |
| `/admin/dashboard` | AdminDashboard | System overview |
| `/admin/posts` | AdminPosts | Manage posts table |
| `/admin/posts/new` | AdminAddPost | Post editor |
| `/admin/categories` | AdminCategories | Manage categories |
| `/admin/comments` | AdminComments | Manage comments |
| `/admin/users` | AdminUsers | Manage users |
| `/admin/media` | AdminMedia | Media library |
| `/admin/settings` | AdminSettings | General settings |

## Folder Structure

```
src/
  components/
    Home/Home.jsx + Home.module.css
    AllPosts/...
    CategoryArchive/...
    BlogPost/...
    About/...
    Contact/...
    Login/...
    UserProfile/...
    AdminLogin/...
    AdminLayout/...        <- shared admin sidebar + topbar (Dashboard, Posts, Categories, etc. sab isko use karte hain)
    AdminDashboard/...
    AdminPosts/...
    AdminAddPost/...
    AdminCategories/...
    AdminComments/...
    AdminUsers/...
    AdminMedia/...
    AdminSettings/...
  App.jsx        <- react-router routes
  main.jsx       <- entry point (bootstrap CSS import yahan hai)
  index.css      <- global reset
```

Note: Admin ke saare 8 pages ek common `AdminLayout` component share karte hain (dark sidebar +
topbar), kyunke screenshots mein sidebar/topbar identical thay — isse code duplication nahi hui,
per phir bhi har page ka apna content + CSS module alag hai.
