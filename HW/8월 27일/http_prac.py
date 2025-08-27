# 여러 웹사이트에서 동시에 정보 수집
import asyncio
import aiohttp
import time

# 대상 웹사이트 목록
websites = [
    "https://www.google.com",
    "https://www.naver.com",
    "https://www.daum.net",
    "https://www.github.com",
    "https://www.python.org"
]

# 비동기적으로 웹사이트 내용 가져오기
async def fetch(session,url):
    print(f"{url}요청시작")
    try:
        start_time = time.time()
        async with session.get(url, timeout = 10) as response:
            content = await response.text()
            elapsed = time.time() -start_time
            print(f"{url} 응답 완료: {len(content)} 바이트 (소요시간: {elapsed:.2f}s)")
            return url, len(content), elapsed
    except Exception as e:
        print(f"{url} 오류 발생 : {e}")
        return url, 0,0
    
    
# 모든 웹사이트 순차적으로 요청
async def fetch_all_sequential(urls):
    start_time = time.time()
    results = []


    async with aiohttp.ClientSession() as session:
        for url in urls:
            result = await fetch(session, url)            
            results.append(result)
    end_time = time.time()
    print(f"순차 처리 완료: {end_time- start_time:.2f}s 소요")
    return results

# 모든 웹사이트 병렬로 요청

async def fetch_all_parallel(urls):
    start_time = time.time()
        
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)  # ✅ 병렬 실행
    print(f"병렬 처리 완료: {time.time() - start_time:.2f}s 소요")
    return results

# 메인 함수
async def main():
    print("\n=====순차 처리 시작=======")
    sequential_results = await fetch_all_sequential(websites)
    
    #잠시 대기
    await asyncio.sleep(1)
    
    #병렬 처리
    print("\n=====병렬 처리 시작=======")
    parallel_results = await fetch_all_parallel(websites)
    
    #결과 요약
    print('\n=====결과 요약 =====')
    seq_total_bytes = sum(r[1] for r in sequential_results)
    par_total_bytes = sum(r[1] for r in parallel_results)
    
    print(f"순차 처리 : 총 {seq_total_bytes}bytes")
    print(f"병렬 처리 : 총 {par_total_bytes}bytes")
    
if __name__ == "__main__":
    asyncio.run(main())
    