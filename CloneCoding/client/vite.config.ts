import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // 개발 중 /api 요청을 Express 서버(4000)로 넘겨서 CORS 설정 없이 같은 주소처럼 호출
    proxy: { "/api": "http://localhost:4000" },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    env: { TZ: "Asia/Seoul" }, // 날짜 테스트가 실행 환경 시간대에 따라 달라지지 않도록 고정
  },
});
