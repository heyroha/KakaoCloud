## QUIZ

- 5개의 공개 API URL에 GET 요청을 보냄
- 세 가지 방식으로 구현하고 성능을 비교합니다:
  - 순차 처리
  - ThreadPoolExecutor 사용
  - asyncio와 aiohttp 사용
- API_URLS
  - "https://jsonplaceholder.typicode.com/posts/1",
  - "https://jsonplaceholder.typicode.com/posts/2",
  - "https://jsonplaceholder.typicode.com/posts/3",
  - "https://jsonplaceholder.typicode.com/posts/4",
  - "https://jsonplaceholder.typicode.com/posts/5"

---

## 결과 정리

===== 순차 처리 =====
순차 처리 완료: 0.81s

===== ThreadPoolExecutor 처리 =====
ThreadPoolExecutor 완료: 0.36s

===== 비동기 처리 =====
비동기 처리 완료: 0.17s

===== 결과 요약 =====
순차: 1348 bytes
스레드풀: 1348 bytes
비동기: 1348 bytes
