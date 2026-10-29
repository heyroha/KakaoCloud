import type { ApiError, SearchRequest, SearchResult, Slide } from "../../../shared/types";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  // 서버가 꺼져 있으면 프록시가 빈 응답을 줘서 JSON 파싱이 실패함
  const body: unknown = await res.json().catch(() => {
    throw new Error("서버에 연결할 수 없습니다. API 서버가 켜져 있는지 확인해 주세요.");
  });
  if (!res.ok) {
    throw new Error((body as ApiError).message ?? "요청에 실패했습니다.");
  }
  return body as T;
}

export function fetchSlides(): Promise<Slide[]> {
  return request<Slide[]>("/api/slides");
}

export function searchRooms(query: SearchRequest): Promise<SearchResult> {
  return request<SearchResult>("/api/reservations/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
}
