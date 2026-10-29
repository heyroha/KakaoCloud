import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import App from "./App";
import type { SearchResult, Slide } from "../../shared/types";

const slides: Slide[] = [1, 2, 3].map((id) => ({ id, type: "image", src: `${id}.png`, title: `테스트 슬라이드 ${id}` }));
const searchResult: SearchResult = {
  nights: 1,
  rooms: [
    { id: "r1", hotel: "호텔 파라다이스", name: "디럭스 더블", maxGuests: 2, pricePerNight: 320000, totalPrice: 320000 },
  ],
};

// 실제 서버 대신 URL별로 고정 응답을 돌려주는 fetch
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const body = url === "/api/slides" ? slides : searchResult;
      return new Response(JSON.stringify(body), { status: 200 });
    })
  );
});
afterEach(() => vi.unstubAllGlobals());

test("헤더 메뉴와 서버에서 받은 슬라이드를 보여준다", async () => {
  render(<App />);
  expect(screen.getByText("HOTEL")).toBeInTheDocument();
  expect((await screen.findAllByText("테스트 슬라이드 1")).length).toBeGreaterThan(0);
});

test("상품 검색을 누르면 검색 결과를 보여준다", async () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "상품 검색" }));
  expect(await screen.findByText("디럭스 더블")).toBeInTheDocument();
  expect(screen.getByText("320,000원")).toBeInTheDocument();
});
