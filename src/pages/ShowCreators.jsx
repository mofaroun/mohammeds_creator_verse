import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import CreatorCard from '../components/CreatorCard';

function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCreators() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*');
      
      if (error) {
        setError(error.message);
        console.error('Error:', error);
      } else {
        setCreators(data || []);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch creators');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCreators();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        padding: '0 40px', 
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h1>All Creators</h1>
          <p>Loading creators...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '0 40px', 
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '40px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0,0,0,0.1)'
        }}>
          <h1>All Creators</h1>
          <p style={{ color: 'red' }}>Error: {error}</p>
          <button onClick={fetchCreators} style={{ 
            padding: '12px 24px', 
            marginTop: '15px',
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '0',
      width: '100%',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px 0',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
        margin: '0 0 40px 0',
        color: 'white',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          margin: '0 0 15px',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          ✨ All Creators
        </h1>
        <p style={{
          fontSize: '1.2rem',
          margin: 0,
          opacity: 0.9
        }}>
          Discover amazing content creators and their work!
        </p>
      </div>
      
      {creators.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '0 40px'
        }}>
          <p>No creators found. Add some creators to get started!</p>
        </div>
      ) : (
        <div style={{ 
          padding: '0 40px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '20px',
            width: '100%',
            padding: '20px 0',
            boxSizing: 'border-box'
          }}>
          {creators.map((creator, index) => (
            <CreatorCard
              key={creator.id || index}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default ShowCreators;
