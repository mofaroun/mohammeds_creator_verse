import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreatorCard.css";

function CreatorCard({ id, name, description, imageURL }) {
  const navigate = useNavigate();

  const handleViewProfile = (e) => {
    e.preventDefault();
    navigate(`/view-creator/${id}`);
  };

  const handleEditCreator = (e) => {
    e.preventDefault();
    navigate(`/edit-creator/${id}`);
  };

  return (
    <div className="card">
      {imageURL && <img style={{ borderRadius: '8px' }} src={imageURL} alt={name} className="card-image" />}
      <div className="card-content">
        <h2>{name}</h2>
        <p>{description}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleViewProfile}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '20px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            👁️ View Profile
          </button>
          <button 
            onClick={handleEditCreator}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '20px',
              fontWeight: '600',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.4)';
            }}
          >
            ✏️ Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatorCard;
