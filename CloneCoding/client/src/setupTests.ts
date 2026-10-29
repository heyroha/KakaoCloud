// jest-dom의 DOM 전용 matcher(toBeInTheDocument 등)를 vitest의 expect에 추가
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// vitest는 globals 옵션 없이는 테스트마다 렌더링 결과를 자동으로 지우지 않음
afterEach(() => cleanup());
