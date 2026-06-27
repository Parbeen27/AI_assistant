# AI Assistant

**Full-stack AI Assistant with MERN, tool-augmented LLM reasoning, and CI/CD automation.**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=githubactions)](https://github.com/features/actions)
[![AI](https://img.shields.io/badge/AI-LangChain%20%2B%20Groq-7C3AED?style=flat-square)](https://www.langchain.com/)

> **Watch Demo:** See the assistant in action and evaluate the full workflow.

## Links

- **Live Demo:** [Vercel Frontend](https://ai-assistant-gilt-iota.vercel.app)
- **Backend API:** [Render Deployment](https://ai-assistant-jk09.onrender.com)
- **GitHub Repository:** [github.com/<your-username>/AI_Assistent](https://github.com/Parbeen27/AI_assistant)
- **Demo Video:** [Watch on YouTube](https://www.youtube.com/watch?v=<demo-link>)

---

## Project Overview

This project is a professional AI assistant built with a MERN stack frontend and backend, powered by tool-augmented LLM reasoning. It combines real-time search, memory-driven conversations, and graph-based workflow execution to deliver intelligent, context-aware responses.

The backend orchestrates LangChain workflows and custom tools, including Tavily search and Groq LLM, to fetch external data, reason over user intent, and generate rich answers.

## Features

- Authentication with secure **JWT** sessions
- AI assistant with **conversation memory and context awareness**
- Tool-augmented reasoning with **Tavily search, Groq LLM, and custom actions**
- **Graph-based workflow execution** for structured task handling
- Fully **Dockerized architecture** for consistent local and cloud deployment
- Automated deployment using **self-hosted GitHub Actions runner**

## Architecture

The solution is split into a modern React frontend and a Node.js/Express backend.

- **Frontend:** React application for user interaction, authentication, and chat UI
- **Backend:** Express API with JWT authentication, user management, and AI orchestration
- **AI layer:** LangChain-powered reasoning layer using Groq and custom tool integrations
- **Deployment:** Frontend on Vercel, backend on Render, CI/CD with Docker and GitHub Actions

## Tech Stack

- **MongoDB**
- **Express**
- **React**
- **Node.js**
- **LangChain**
- **Groq API**
- **Tavily API**
- **Docker**
- **GitHub Actions** (self-hosted runner)
- **JWT Authentication**

## Installation / Setup

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/AI_Assistent.git
   cd AI_Assistent/Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` with the required values:
   ```env
   PORT=4000
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   GROQ_API_KEY=<your-groq-api-key>
   TAVILY_API_KEY=<your-tavily-api-key>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the test frontend directory:
   ```bash
   cd ../test
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` for frontend settings if needed.
4. Start the frontend:
   ```bash
   npm run dev
   ```

### Docker

Build and run the services using Docker:

```bash
Docker compose up --build
```

If you need to run only the backend container:

```bash
   docker build -t ai-assistant-backend Backend
   docker run -e MONGODB_URI=<your-mongodb-uri> -e JWT_SECRET=<your-jwt-secret> -p 4000:4000 ai-assistant-backend
```

## CI/CD

This project is configured for automated deployment using a **self-hosted GitHub Actions runner**. The pipeline builds the frontend and backend, runs validation, and deploys updates to the configured hosting platforms.

- **Build:** Node.js dependency install and production build
- **Test / Validate:** Linting and sanity checks
- **Deploy:** Push frontend to Vercel, backend to Render using GitHub Actions

## Screenshots / Demo

> Demo video: [Watch on YouTube](https://www.youtube.com/watch?v=<demo-link>)

- `screenshot-01.png` - Landing and authentication
- `screenshot-02.png` - AI assistant chat flow
- `screenshot-03.png` - Workflow and results view

## Future Improvements

- Add **streaming AI responses** for real-time assistant feedback
- Improve **agent memory** persistence and recall
- Add **multi-agent support** for collaborative workflows

---

## Notes

Replace placeholder links and environment values with your real deployments before sharing or publishing.
