import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// 부모에게서 'project'라는 데이터 하나를 선물(Props)로 받음.
function ProjectCard({ project, className="", style={}, animated = true }) {

  // animated가 true일 때만 'fade-up-element' 클래스를 붙임
  const animationClass = animated ? "fade-up-element delay-2" : "";

  // 기술 스택 문자열을 배열로 변환
  const tags = project.tech_stack ? project.tech_stack.split(',') : [];

  const bgImage = project.image_url 
    ? project.image_url 
    : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className={`project-card ${animationClass} ${className}`}
      style ={{ 
        '--bg-img': `url(${bgImage})`, 
        ...style
      }}
    >
      {/* 배경 오버레이 (어둡게 만들기) */}
      <div className="project-bg"></div>
      
      {/* 텍스트 내용 */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>          
        <p className="project-desc">{project.description || "현재 프로젝트에 대한 설명을 입력해주세요"}</p>
        {/* 기술스택 내용 */}
        <div className="project-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="skill-chip-mini">
              {tag.trim()}
            </span>
          ))}
        </div>
        {/* 링크 */}
        <div className="project-actions">
          {project.github_url ? (
            <a href={project.github_url || ''} target="_blank" rel="noreferrer" className="btn-action btn-github">
              <FaGithub /> Code
            </a>
          ) : (
            <span className="btn-action btn-disabled">
              <FaGithub /> Code
            </span>
          )}
          {project.demo_url ? (
            <a href={project.demo_url || ''} target="_blank" rel="noreferrer" className="btn-action btn-demo">
              <FaExternalLinkAlt /> Live Demo
            </a>
          ) : (
            <span className="btn-action btn-disabled">
              <FaExternalLinkAlt /> Live Demo
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProjectCard;