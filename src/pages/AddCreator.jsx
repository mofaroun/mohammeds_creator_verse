import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function AddCreator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Creator name is required');
      return;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase
        .from('creators')
        .insert([
          {
            name: formData.name.trim(),
            url: formData.url.trim() || null,
            description: formData.description.trim(),
            imageURL: formData.imageURL.trim() || null
          }
        ]);

      if (error) {
        setError(error.message);
        console.error('Error adding creator:', error);
      } else {
        setSuccess(true);
        setFormData({ name: '', url: '', description: '', imageURL: '' });
        
       
      }
    } catch (err) {
      setError('Failed to add creator');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ 
        padding: '0 40px', 
        width: '100%',
        minHeight: '100vh',
        color: 'white',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          padding: '40px',
          borderRadius: '12px',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2>✅ Creator Added Successfully!</h2>
          <p>The new creator has been added to the database.</p>
          <p> Click "All Creators" to see your new creator addition.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '0 40px', 
      width: '100%',
      minHeight: '100vh',
      color: 'white',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        paddingTop: '20px'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'white', 
          marginBottom: '30px'
        }}>
          Add New Creator
        </h1>
      
      {error && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '15px',
          borderRadius: '8px',
          border: '1px solid #f5c6cb',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#1e3a8a',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: 'white'
          }}>
            Creator Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            placeholder="Enter creator's name"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: 'white'
          }}>
            Profile URL (optional)
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            placeholder="https://example.com/creator-profile"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: 'white'
          }}>
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
            placeholder="Describe the creator and their content..."
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
            color: 'white'
          }}>
            Image URL (optional)
          </label>
          <input
            type="url"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={() => navigate('/show-creators')}
            style={{
              padding: '12px 24px',
              border: '2px solid #6c757d',
              backgroundColor: 'transparent',
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: loading ? '#cccccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? 'Adding Creator...' : 'Add Creator'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default AddCreator;
