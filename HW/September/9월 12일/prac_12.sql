create database orm_tutorial
	default character set utf8mb4
    default collate utf8mb4_unicode_ci;
    
use orm_tutorial;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
full_name VARCHAR(100),
age INT,
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

show tables;

CREATE TABLE posts (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(200) NOT NULL,
content TEXT,
user_id INT NOT NULL,
view_count INT DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (username, email, full_name, age) VALUES
('john_doe', 'john@example.com', '존 도', 25),
('jane_smith', 'jane@example.com', '제인 스미스', 30),
('bob_wilson', 'bob@example.com', '밥 윌슨', 35);

INSERT INTO posts (title, content, user_id, view_count) VALUES
('첫 번째 게시글', '안녕하세요! 첫 게시글입니다.', 1, 10),
('Python ORM 이해하기', 'SQLAlchemy에 대해 알아보겠습니다.', 1, 25),
('데이터베이스 설계', '좋은 데이터베이스 설계란?', 2, 15),
('FastAPI 튜토리얼', 'FastAPI로 API 만들기', 3, 8);

select * from users;