import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// 부모에게서 'project'라는 데이터 하나를 선물(Props)로 받음.
function ProjectCard({ project }) {

  return (
    <div className="card">
      {/* 이미지 영역 */}
      <img 
        src={project.image_url || "https://via.placeholder.com/300"} 
        alt={project.title} 
        className="card-img" 
      />

      {/* 내용 영역 */}
      <div className="card-content">
        <h3>{project.title}</h3>
        <p style={{ color: '#555', lineHeight: '1.5' }}>{project.description}</p>
        <div className="tech-badge">{project.tech_stack}</div>
        {/* 링크 버튼 영역 */}
        <div className="flex-row" style={{ marginTop: '20px' }}>
          {project.github_url && (
            <a 
              href={project.github_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-dark" style={{ fontSize: '0.9rem', padding: '8px 12px' }}
            >
              <FaGithub /> GitHub
            </a>
          )}
          
          {project.demo_url && (
            <a 
              href={project.demo_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaExternalLinkAlt /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;