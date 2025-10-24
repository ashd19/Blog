<!-- # 📝 Next.js Blog Application

A modern, full-stack blog platform built with **Next.js App Router**, **TypeScript**, **Drizzle ORM**, **PostgreSQL**, **shadcn/ui**, and **Docker**.  
This project demonstrates scalable architecture, clean code, and best practices for authentication, database design, and UI/UX.

---

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes, Drizzle ORM
- **Database:** PostgreSQL (Dockerized for local dev, Cloud SQL-ready for production)
- **Authentication:** NextAuth.js (with Google OAuth, JWT)
- **DevOps:** Docker, Vercel (for deployment)
- **Other:** Lucide Icons, Zod (validation), Sonner (toasts)

---

## 🗂️ Project Structure

```
src/
  app/                # Next.js app directory (routing, pages)
    post/             # Blog post routes (dynamic, create, edit)
    api/              # API routes (getAllPosts, etc.)
  components/         # Reusable UI and feature components
    post/             # PostCard, PostList, PostContent, PostForm, etc.
    ui/               # shadcn/ui-based primitives (Button, Card, Chatbot, etc.)
  lib/
    db/               # Drizzle ORM schema, queries, and DB config
    types/            # TypeScript types/interfaces
    utils.ts          # Utility functions (slugify, formatDate, etc.)
  actions/            # Server actions (createPost, updatePost, etc.)
public/               # Static assets
.env.example          # Environment variable template
```

---

## 🗄️ Database Architecture

### Tables

#### `users`

| Column         | Type      | Description               |
| -------------- | --------- | ------------------------- |
| id             | string    | Primary key (UUID)        |
| name           | string    | User's display name       |
| email          | string    | Unique email              |
| email_Verified | boolean   | Email verification status |
| created_at     | timestamp | Account creation date     |
| updated_at     | timestamp | Last update               |

#### `posts`

| Column      | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| id          | int       | Primary key                    |
| title       | string    | Post title                     |
| description | string    | Short summary                  |
| content     | text      | Full post content              |
| slug        | string    | URL-friendly unique identifier |
| author_id   | string    | Foreign key → users.id         |
| created_at  | timestamp | Post creation date             |
| updated_at  | timestamp | Last update                    |

### Relationships

- **One-to-Many:**
  - `users (1)` ⟶ `posts (many)`
  - Each post belongs to one user (author), each user can have many posts.

---

## 🔐 Authentication

- **NextAuth.js** with Google OAuth and JWT.
- Only authenticated users can create, edit, or delete posts.
- Authorization checks ensure only the post author can edit/delete their posts (both client and server guarded).

---

## 📝 Features & Flow

- **Home Page:** Lists all blog posts, newest first.
- **Post Page:** Dynamic route (`/post/[slug]`) displays full post content, author, and metadata.
- **Create/Edit Post:** Authenticated users can create new posts or edit their own posts.
- **Delete Post:** Authors can delete their posts, with confirmation modal.
- **Authentication:** Login/logout with Google.
- **Responsive UI:** Minimal, accessible, and mobile-friendly using shadcn/ui and Tailwind CSS.
- **Toasts:** User feedback for actions (success, error) via Sonner.
- **SEO:** Dynamic metadata for posts.

---

## 🏗️ Application Flow

1. **User visits home page:**
   - Sees a list of posts (fetched server-side for SEO).
2. **User clicks a post:**
   - Navigates to `/post/[slug]` to view full content.
3. **Authenticated user:**
   - Can create, edit, or delete their own posts.
   - Edit/delete buttons are only visible to the author.
4. **Server-side guards:**
   - Prevent unauthorized access to edit/delete routes even if URL is typed manually.
5. **Database:**
   - All data persisted in PostgreSQL (Docker for dev, Cloud SQL-ready for prod).

---

## 🐳 Local Development

1. **Clone the repo and install dependencies:**

   ```bash
   git clone https://github.com/yourusername/your-blog-app.git
   cd your-blog-app
   npm install
   ```

2. **Start PostgreSQL with Docker:**

   ```bash
   docker-compose up -d
   ```

3. **Set up your `.env` file:**
   - Copy `.env.example` to `.env` and fill in your secrets.

4. **Run database migrations (if needed):**

   ```bash
   npm run db:migrate
   ```

5. **Start the dev server:**

   ```bash
   npm run dev
   ```

6. **Visit [http://localhost:3000](http://localhost:3000)**

---

## ☁️ Deployment

- **Vercel:**
  - Set `DATABASE_URL` in Vercel project settings to your cloud Postgres instance (Neon, Supabase, GCP Cloud SQL, etc.).
  - Push to `main` branch to auto-deploy.

---

## 🙋 About & Contact

This project is a demonstration of modern full-stack web development best practices.  
Feel free to fork, contribute, or reach out for collaboration!

- **Author:** Ashton Dsouza
- **Email:** ashtondsouza192@gmail.com
- **GitHub:** [yourusername](https://github.com/yourusername)

---

## 📄 License

MIT

--- -->
