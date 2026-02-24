# Full-Stack Todo Admin Application

A production-style full-stack Todo application featuring secure authentication, role-based authorization, and an admin analytics dashboard. Built with modern Next.js App Router architecture and optimized Prisma queries.



##  Live Demo

*  **Live App:** https://todo-alpha-seven-13.vercel.app/
*  **Repository:** https://github.com/shefstack/todo



##  Key Features

###  Authentication

* Credential-based login using NextAuth
* Password hashing with bcrypt
* JWT session strategy
* Secure cookie handling

### Authorization

* Role-based access control (Admin / User)
* Ownership validation for todos
* Protected routes via middleware
* Server-side admin page protection
* Defense-in-depth security

###  Admin Dashboard

* Total users & todos metrics
* All users table with role badges
* Recent todos activity
* Server-side data fetching
* Optimized parallel queries

###  Performance Optimizations

* `Promise.all` for concurrent DB queries
* Indexed database fields
* Pagination using `take` & `skip`
* Avoided N+1 queries using Prisma `include`
* Server Components for direct DB access



##  Tech Stack

**Frontend**

* Next.js 14 (App Router)
* React
* TypeScript
* Tailwind CSS

**Backend**

* Next.js Route Handlers
* NextAuth
* Prisma ORM
* PostgreSQL

**Deployment**

* Vercel



##  Screenshots

### Admin Dashboard

<img width="800" height="800" alt="Screenshot 2026-02-24 234439" src="https://github.com/user-attachments/assets/dec90337-f1e1-46f5-a2fb-0a0195501802" />


### Todo Page

<img width="500" height="400" alt="Screenshot 2026-02-24 234922" src="https://github.com/user-attachments/assets/67ab4418-a37c-4766-a937-fb0c1846f566" />


### Login Page

<img width="500" height="400" alt="Screenshot 2026-02-24 234846" src="https://github.com/user-attachments/assets/5accf488-6a5e-4427-a3b1-9901a7e30901" />




##  Project Structure

```
app/
  admin/
  auth/
  todos/
  api/
lib/
  auth.ts
  prisma.ts
types/



##  Future Improvements

* Promote/Demote user roles
* Cursor-based pagination
* Activity logs
* Redis caching
* Optimistic UI updates



##  Author
Shefali Sinha


* GitHub: https://github.com/shefstack
* Portfolio: https://portfolio-delta-five-r69ar9r6y4.vercel.app/
