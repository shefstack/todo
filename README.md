Full-Stack Todo Admin Application
A production-style full-stack Todo application featuring secure authentication, role-based authorization, and an admin analytics dashboard. Built with modern Next.js App Router architecture and optimized Prisma queries.

Live Demo
  Live App:https://todo-alpha-seven-13.vercel.app
  Repository: https://github.com/shefstack/todo

Key Features
    Authentication:
      Credential-based login using NextAuth
      Password hashing with bcrypt
      JWT session strategy
      Secure cookie handling
    
    Authorization:
      Role-based access control (Admin / User)
      Ownership validation for todos
      Protected routes via middleware
      Server-side admin page protection
      Defense-in-depth security

Admin Dashboard
  Total users & todos metrics
  All users table with role badges
  Recent todos activity
  Server-side data fetching
  Optimized parallel queries

Performance Optimizations
  Promise.all for concurrent DB queries
  Indexed database fields
  Pagination using take & skip
  Avoided N+1 queries using Prisma include
  Server Components for direct DB access

Tech Stack
  Frontend:
    Next.js 14 (App Router)
    React
    TypeScript
    Tailwind CSS

  Backend:
    Next.js Route Handlers
    NextAuth
    Prisma ORM
    PostgreSQL

  Deployment:
    Vercel

Screenshots
  Admin 
  <img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/da725736-14d0-4598-a35d-67ecd04b7135" />
  Todo
<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/a2d9d046-badb-4093-ae88-1e4144e8abe4" />
  Login
  <img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/bb402bc5-16da-4afd-84c2-b8e79b218837" />

