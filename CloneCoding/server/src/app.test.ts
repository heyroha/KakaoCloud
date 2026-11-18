import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app";

const app = createApp();

describe("GET /api/slides", () => {
  it("슬라이드 목록을 돌려준다", async () => {
    const res = await request(app).get("/api/slides");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});

describe("POST /api/reservations/search", () => {
  const valid = { hotel: "호텔 파라다이스", checkIn: "2026-11-01", checkOut: "2026-11-03", adult: 2, child: 1 };

  it("인원이 들어가는 객실과 숙박 일수만큼의 총액을 돌려준다", async () => {
    const res = await request(app).post("/api/reservations/search").send(valid);
    expect(res.status).toBe(200);
    expect(res.body.nights).toBe(2);
    expect(res.body.rooms.map((r: { id: string }) => r.id)).toEqual(["hp-family", "hp-suite"]);
    expect(res.body.rooms[0].totalPrice).toBe(820000);
  });

  it("체크아웃이 체크인보다 빠르면 400을 돌려준다", async () => {
    const res = await request(app)
      .post("/api/reservations/search")
      .send({ ...valid, checkOut: "2026-10-31" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch("체크아웃");
  });

  it("성인이 0명이면 400을 돌려준다", async () => {
    const res = await request(app).post("/api/reservations/search").send({ ...valid, adult: 0 });
    expect(res.status).toBe(400);
  });

  it.each(["2026-02-31", "2026-13-01", "2026-00-10"])("존재하지 않는 날짜(%s)는 400을 돌려준다", async (checkIn) => {
    const res = await request(app).post("/api/reservations/search").send({ ...valid, checkIn });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch("체크인");
  });

  it("체크아웃이 존재하지 않는 날짜면 400을 돌려준다", async () => {
    const res = await request(app).post("/api/reservations/search").send({ ...valid, checkOut: "2026-11-31" });
    expect(res.status).toBe(400);
  });

  it("숙박 일수는 서머타임 등과 관계없이 달력 날짜 차이로 계산한다", async () => {
    const res = await request(app)
      .post("/api/reservations/search")
      .send({ ...valid, checkIn: "2026-02-27", checkOut: "2026-03-02" });
    expect(res.status).toBe(200);
    expect(res.body.nights).toBe(3);
  });
});
