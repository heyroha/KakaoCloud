import asyncio
import aiohttp
import time
import concurrent.futures
import requests


# 웹사이트 목록
websites = [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
    "https://jsonplaceholder.typicode.com/posts/4",
    "https://jsonplaceholder.typicode.com/posts/5"
    
]

# 웹사이트 fetch
# ------------------------
# 동기 fetch (requests용)
# ------------------------
def fetch_sync(url):
    start = time.time()
    resp = requests.get(url, timeout=10)
    elapsed = time.time() - start
    return url, len(resp.text), elapsed

# ------------------------
# 비동기 fetch (aiohttp용)
# ------------------------
async def fetch_async(session, url):
    start = time.time()
    async with session.get(url, timeout=10) as resp:
        text = await resp.text()
        elapsed = time.time() - start
        return url, len(text), elapsed
        
# 1.순차적으로 가져오기
def run_sequential(urls):
    print("\n===== 순차 처리 =====")
    start = time.time()
    results = [fetch_sync(u) for u in urls]
    print(f"순차 처리 완료: {time.time()-start:.2f}s")
    return results

# 2. ThreadPoolExecutor
def run_threadpool(urls):
    print("\n===== ThreadPoolExecutor 처리 =====")
    start = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:
        results = list(ex.map(fetch_sync, urls))
    print(f"ThreadPoolExecutor 완료: {time.time()-start:.2f}s")
    return results
    
# 3. asyncio, aiohttp 
async def run_asyncio(urls):
    print("\n===== 비동기 처리 =====")
    start = time.time()
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_async(session, u) for u in urls]
        results = await asyncio.gather(*tasks)
    print(f"비동기 처리 완료: {time.time()-start:.2f}s")
    return results

# main function
def main():
    seq = run_sequential(websites)
    thp = run_threadpool(websites)
    async_results = asyncio.run(run_asyncio(websites))

    print("\n===== 결과 요약 =====")
    print("순차:", sum(r[1] for r in seq), "bytes")
    print("스레드풀:", sum(r[1] for r in thp), "bytes")
    print("비동기:", sum(r[1] for r in async_results), "bytes")

if __name__ == "__main__":
    main()