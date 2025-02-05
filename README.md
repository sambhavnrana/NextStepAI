# NextStepAI: AI-Based Career Platform

**NextStepAI** is an AI-powered career platform providing real-time insights into trending skills, job roles, and personalized tools to boost job readiness. It features a mock interview module, ATS-friendly resume builder, AI-generated cover letters, and more.

---

## 🛠 Tech Stack

- **Next.js** – Full-stack framework for frontend and backend.
- **PostgreSQL** – Scalable relational database.
- **Prisma** – Type-safe ORM for database operations.
- **Inngest** – Event-driven framework for weekly data syncs.
- **Gemini API** – for AI-driven insights and job recommendations.
- **Clerk** – User authentication and session management.

---

## 🚀 Features

### 1. AI-Powered Career Insights

- **Trending Skills & Job Roles**: Get real-time insights on in-demand skills and roles across industries.
- **Automated Weekly Updates**: Powered by Inngest to keep insights fresh and relevant.

### 2. Mock Interview Module

- **Role-Specific Questions**: AI-generated questions tailored to your desired job role.
- **Instant Feedback**: Receive AI-driven feedback to improve your responses.
- **Bookmark Important Questions**: Save challenging or key questions for later review.

### 3. ATS-Friendly Resume Builder & Cover Letter Generator

- **AI Resume Builder**: Generate personalized, ATS-optimized resumes tailored to specific job roles.
- **AI Cover Letter Generator**: Instantly craft compelling cover letters aligned with your resume and job description.

## 📌 Bookmarking Feature

Users can **bookmark tough or important questions** during mock interviews to review and revisit later, helping reinforce key concepts and improve retention.

---

## Getting Started

### 1. Install Dependencies
Clone the repository:

```bash
git clone https://github.com/sambhavnrana/NextStepAI.git
cd NextStepAI
npm install
```
### 2. Set Up Environment Variables
Rename `.env.example` file to `.env` and add your environment variables. You will need to set up the following variables:
```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
GEMINI_API_KEY=
```

### 3. Run Migrations
Run the Prisma migrations to set up the database schema:
```bash
npx prisma migrate dev --name init
```     
### 4. Start the Development Server
Start the Next.js development server:
```bash
npm run dev
```         
### 5. Access the Application
Open your browser and navigate to `http://localhost:3000` to access the application locally.