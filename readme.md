# 🚀 Rafiq - رفيق

Rafiq (رفيق) is your ultimate all-in-one productivity companion, designed to streamline your workflow, manage tasks efficiently, and enhance your daily productivity. This app brings together powerful tools to help you stay organized and focused. Currently in active development.

## 🚧 Planned Features

- ✅ Job Tracker
- ⏳ Expenses Tracker
- ⏳ Notes
- ⏳ Calendar
- ⏳ Tasks

## 📚 Tech Stack

- 🌐 **TanStack Start** - Modern React framework
- 🦊 **ElysiaJS** - Fast web framework for Node.js
- 📘 **TypeScript** - Typed JavaScript
- 💧 **Drizzle ORM** - Type-safe ORM for SQL databases
- ☁️ **Turso Cloud** - Edge database platform

## 🛠️ Getting Started

### Prerequisites

- Bun or Node.js
- Git

### Clone the Repository

```bash
git clone https://github.com/ahmeddotgg/rafiq.git
cd rafiq
```

### Install Dependencies

```bash
bun install
```

### Environment Setup

Create `.env` files in the respective packages based on the examples below.

#### Server (.env in packages/server)

```
TURSO_DATABASE_URL="your_turso_database_url"
TURSO_AUTH_TOKEN="your_turso_auth_token"
JWT_SECRET="your_jwt_secret"
```

### Run the Application

```bash
bun run dev
```

This will start both the client and server concurrently.

## 📊 Database

- Push schema: `bun run db:push`
- Seed data: `bun run db:seed`
- Open Drizzle Studio: `bun run db:studio`
- test
