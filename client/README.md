# Collab-Pad Client

This is the React client for **Collab-Pad**, a real-time collaborative note-taking application.

## Features

- Create and join collaborative notes
- Real-time editing with multiple users
- Auto-save and change tracking
- User presence indicator
- Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- The Collab-Pad server running ([../server](../../server))

### Installation

```sh
npm install
```

### Running the Client

```sh
npm run dev
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```
VITE_API_BASE_URL= api
VITE_SOCKET_URL= url
```

## Project Structure

- `src/` — Main source code
  - `components/` — UI components
  - `pages/` — App pages
  - `hooks/` — Custom React hooks
  - `services/` — API service functions
  - `constants/` — Environment constants

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code
