import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function ViewCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCreator() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          setError(error.message);
          console.error('Error fetching creator:', error);
        } else {
          setCreator(data);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch creator details');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCreator();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '0 20px', textAlign: 'center' }}>
        <h1>Loading Creator...</h1>
        <p>Please wait while we fetch the creator details.</p>
      </div>
    );
  }

  if (error || !creator) {
    return (
      <div style={{ 
        padding: '0 40px', 
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '40px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h1>Creator Not Found</h1>
          <p style={{ color: '#ffcccb' }}>{error || 'Creator not found'}</p>
          <button 
            onClick={() => navigate('/show-creators')}
            style={{ 
              padding: '12px 24px', 
              marginTop: '15px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Back to All Creators
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '0 40px', 
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        paddingTop: '20px'
      }}>
        <button 
          onClick={() => navigate('/show-creators')}
          style={{ 
            color: 'white',
            marginBottom: '20px', 
            padding: '8px 16px',
          background: '#1e3a8a',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to All Creators
      </button>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid rgba(0,0,0,0.05)'
        
      }}>
        {creator.imageURL && (
          <img 
            src={creator.imageURL} 
            alt={creator.name}
            style={{
              width: '300px',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '15px',
              marginBottom: '30px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        )}
        
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#2c3e50', 
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {creator.name}
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#666', 
          lineHeight: '1.6',
          textAlign: 'center',
          maxWidth: '600px',
          marginBottom: '30px'
        }}>
          {creator.description}
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {creator.url && (
            <a 
              href={creator.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '15px 30px',
                borderRadius: '25px',
                fontWeight: '500',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
            >
              Wikipedia Page
            </a>
          )}
          
          <button
            onClick={() => navigate(`/edit-creator/${creator.id}`)}
            style={{
              display: 'inline-block',
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontWeight: '500',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(40, 167, 69, 0.4)'
            }}
          >
            Edit Creator
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ViewCreator;
