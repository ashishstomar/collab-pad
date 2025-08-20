# Collab-Pad Server

This repository contains the backend server for Collab-Pad, a realtime collaborative notes editing platform.

## Features

- Real-time collaboration
- User authentication
- Document management
- RESTful API

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### Installation

```bash
npm install
```

### Running the Server

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | `/notes/:id` | Get a specific document    |
| POST   | `/notes`     | create a document          |
| PUT    | `/notes/:id` | Update a specific document |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a pull request
