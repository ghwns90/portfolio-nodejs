CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    tech_stack VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,          -- 이름 (예: OOO)
    title VARCHAR(100),                 -- 한 줄 소개 (예: 끊임없이 성장하는...)
    description TEXT,                   -- 긴 자기소개
    profile_image_url VARCHAR(255),     -- 프로필 사진 주소
    github_url VARCHAR(255)             -- 깃허브 주소
);

INSERT INTO profile (name, title, description, profile_image_url, github_url)
VALUES (
    '코딩딩',
    '어제보다 오늘 더 성장하는 개발자',
    '안녕하세요! 백엔드 개발자입니다. 관리자 페이지에서 이 내용을 수정할 수 있어요!',
    'https://via.placeholder.com/150',
    'https://github.com/codingding'
);

create table if not exists comments (
	id SERIAL primary key,
	username varchar(50) not null,
	password varchar(50) not null,
	content TEXT not null,
	created_at timestamp default CURRENT_TIMESTAMP	
);

insert into comments (username, password, content)
values ('지나가던개발자', '1234', '포트폴리오 잘 보고 갑니다! 화이팅하세요!');

delete from comments;

INSERT INTO users (username, password, nickname)
VALUES ('admin', '$2b$10$X2fpRAn264kP.VVKdEbG5.qXt9gRAsHYAelT6WS91xbl1Cnadg4Pm', '관리자');

create table if not exists replies (
	id SERIAL primary key,
	comment_id INTEGER not null,
	username VARCHAR(50) default 'HOJUN',
	content TEXT not null,
	created_at TIMESTAMP default CURRENT_TIMESTAMP,
	constraint fk_comment
	   foreign KEY(comment_id)
	   references comments(id)
	   on delete CASCADE
);