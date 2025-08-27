# 프로세스 간단 예제

import multiprocessing
import time

def count_up(name, max_count):
    """숫자를 세는 간단한 함수"""
    for i in range(1, max_count + 1):
        print(f"프로세스 {name}: count {i}")
        time.sleep(0.5)
        
if __name__ == "__main__": # 중요: 항상 이 조건 필요
    #프로세스 생성
    p1 = multiprocessing.Process(target = count_up, args= ("A",5))
    p2 = multiprocessing.Process(target = count_up, args= ("B",3))
    
    p1.start()
    p2.start()

    p1.join()
    p2.join()
    
    print("모든 프로세스 종료!")
    