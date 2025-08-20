# Collab-Pad

A real-time collaborative note-taking application built with React and Node.js.

## Project Structure

- `client/` — React frontend
- `server/` — Node.js/Express backend

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Setup

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd collab-pad
```

### 2. Environment Variables

Copy the example environment files and fill in your values:

#### Backend (`server/.env.example`)

```env
# filepath: server/.env.example
PORT=5000
MONGO_URI="mongodb://localhost:27017/collaborative-notes"
```

#### Frontend (`client/.env.example`)

```env
# filepath: client/.env.example
VITE_API_BASE_URL= your-api
VITE_SOCKET_URL= your-socket-url
```

### 3. Install dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 4. Run the applications

#### Start the backend server

```sh
cd server
npm run dev
```

#### Start the frontend client

```sh
cd ../client
npm run dev
```

The frontend will be available at localhost by default.

## Usage

- Create or join notes using ID from the homepage.
- Collaborate in real-time with others.
