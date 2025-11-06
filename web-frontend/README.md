# Web Frontend

React frontend with Node.js backend for the multi-platform project.

## Setup

```bash
npm install
npm start
```

## Project Structure

```
web-frontend/
├── package.json          # Dependencies and scripts
├── public/              # Static files
├── src/                 # React source code
│   ├── components/     # React components
│   ├── App.js         # Main app component
│   └── index.js       # Entry point
├── server/             # Node.js backend
│   └── index.js       # Express server
└── .vscode/           # VS Code configuration
    └── launch.json    # Debug configuration
```

## Available Scripts

- `npm start` - Start React development server (port 3000)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run server` - Start Node.js backend
- `npm run lint` - Run ESLint

## Development

This is part of a multi-root workspace. See the workspace configuration file in the root directory.
