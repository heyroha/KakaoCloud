import { render, screen } from '@testing-library/react';
import App from './App';

// swiper 11은 ESM 전용 + package exports를 써서 CRA(Jest 27)에서 바로 불러올 수 없어 목으로 대체
jest.mock('swiper/react', () => ({
  Swiper: ({ children }) => <div>{children}</div>,
  SwiperSlide: ({ children }) => <div>{children}</div>,
}), { virtual: true });
jest.mock('swiper/modules', () => ({}), { virtual: true });
jest.mock('swiper/css', () => ({}), { virtual: true });
jest.mock('swiper/css/navigation', () => ({}), { virtual: true });
jest.mock('swiper/css/pagination', () => ({}), { virtual: true });

test('renders header nav and search button', () => {
  render(<App />);
  expect(screen.getByText('HOTEL')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '상품 검색' })).toBeInTheDocument();
});
