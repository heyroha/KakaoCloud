## 🧠 Mini MNIST 분류기 (Softmax-only)

간단한 Softmax 다중분류기로 sklearn의 load_digits(8×8 손글씨 숫자) 데이터를 학습하고, 클래스별 성능을 확인하는 과제

📂 과제 개요

- 은닉층 없이 입력 → 선형 → Softmax 구조로 구성
- 데이터셋: sklearn.datasets.load_digits (0~9, 10개 클래스, 8×8 픽셀 → 64차원)
- 전처리: 입력 픽셀을 [0, 1]로 정규화(원본 범위 0~16), 원-핫 인코딩
- 모델: Softmax
- 학습: cross-entropy 손실, 미분(역전파)로 W, b 경사하강
- 평가: 정확도(Train/Test), 혼동행렬, 클래스별 Precision/Recall/
