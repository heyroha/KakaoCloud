import { createApp } from "./app";

// PORT는 다른 도구(Vite 등)와 겹치기 쉬워 API_PORT로 따로 받음. client의 vite proxy와 맞춰야 함
const PORT = Number(process.env.API_PORT ?? 4000);

createApp().listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
