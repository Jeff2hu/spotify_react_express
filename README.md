# Music App - 全端音樂串流應用

<h2 id="chinese">中文版本</h2>

一個使用 React (TypeScript) 和 Express.js 建構的全端音樂串流應用，具備即時聊天、音樂播放和管理員後台等功能。

## 技術架構

### 前端 (React + TypeScript)

- **核心技術**

  - React 18
  - TypeScript
  - Vite
  - React Router v6
  - Zustand (狀態管理)
  - TanStack Query (React Query v5)

- **UI/樣式**

  - Tailwind CSS
  - Shadcn/ui
  - GSAP (動畫效果)
  - Radix UI (無頭元件)
  - Lucide Icons

- **身份驗證**

  - Clerk

- **API 通訊**
  - Axios
  - Socket.io Client

### 後端 (Node.js)

- **核心技術**

  - Express.js
  - MongoDB (Mongoose)
  - Node.js

- **檔案處理**

  - Cloudinary (媒體儲存)
  - Express FileUpload

- **認證與安全**

  - Clerk/Express
  - CORS

- **即時功能**
  - Socket.io

## 主要功能

- 🎵 音樂串流播放
- 🔐 使用者認證
- 💬 即時聊天
- 📱 響應式設計
- 🎨 現代化 UI 與動畫
- 👑 管理員後台
- 🖼️ 雲端儲存整合
- 🎧 音樂播放控制

## 專案結構

│<br>
├── client/ # React 前端<br>
│ ├── public/<br>
│ ├── src/<br>
│ └── package.json<br>
│<br>
└── server/ # Express 後端<br>
│ ├── routes/<br>
│ ├── controllers/<br>
│ ├── models/<br>
│ ├── services/<br>
│ ├── utils/<br>
│ ├── app.js<br>
│ ├── .env<br>
│ └── package.json<br>
