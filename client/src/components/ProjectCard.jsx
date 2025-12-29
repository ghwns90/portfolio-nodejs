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
    : "https://placehold.co/600x400/1a1a1a/666666/png?text=Project+Image";

  return (
    <div className={`card project-card ${animationClass} ${className}`}
      style ={{ 
        '--bg-img': `url(${bgImage})`, 
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        ...style
      }}
    >
      {/* 배경 오버레이 (어둡게 만들기) */}
      <div className="project-bg"></div>

      {/* 텍스트 내용 */}
      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>

          <div className="project-links">
            {project.github_url && (
              <a href={project.github_url || '#'} target="_blank" rel="noopener noreferrer" className="icon-link"
                style={{ opacity: project.github_url ? 1 : 0.3, cursor: project.github_url ? 'pointer' : 'not-allowed' }}
              >
                <FaGithub />
              </a>
            )}
            {project.demo_url && (
              <a href={project.demo_url || '#'} target="_blank" rel="noopener noreferrer" className="icon-link"
                style={{ opacity: project.github_url ? 1 : 0.3, cursor: project.github_url ? 'pointer' : 'not-allowed' }}
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
        <p className="project-desc">{project.description || "현재 프로젝트에 대한 설명을 작성 중입니다.."}</p>
        
        {/* 기술스택 내용 */}
        <div className="project-tags">
          {tags.map((tag, idx) => (
            <span key={idx} className="skill-chip-mini">
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;