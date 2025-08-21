import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch existing creator data
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
          setFormData({
            name: data.name || '',
            url: data.url || '',
            description: data.description || '',
            imageURL: data.imageURL || ''
          });
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
      setSubmitting(true);
      setError(null);
      
      const { error } = await supabase
        .from('creators')
        .update({
          name: formData.name.trim(),
          url: formData.url.trim() || null,
          description: formData.description.trim(),
          imageURL: formData.imageURL.trim() || null
        })
        .eq('id', id);

      if (error) {
        setError(error.message);
        console.error('Error updating creator:', error);
      } else {
        setSuccess(true);
    
      }
    } catch (err) {
      setError('Failed to update creator');
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this creator? This action cannot be undone.')) {
      try {
        setSubmitting(true);
        setError(null);
        
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', id);

        if (error) {
          setError(error.message);
          console.error('Error deleting creator:', error);
        } else {
          // Redirect to all creators after deletion
          navigate('/show-creators');
        }
      } catch (err) {
        setError('Failed to delete creator');
        console.error('Delete error:', err);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '0 20px', 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
        minHeight: '100vh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '40px',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h1 style={{ margin: '0 0 10px', fontSize: '1.8rem' }}>Loading Creator...</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Please wait while we fetch the creator details.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div style={{ 
        padding: '0 20px', 
        textAlign: 'center', 
        maxWidth: '600px', 
        margin: '0 auto',
        minHeight: '100vh',
        color: 'white'
      }}>
        <div style={{
        backgroundColor: '#1e3a8a',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '40px'
        }}>
          <h2>✅ Creator Updated Successfully!</h2>
          <p>The creator has been updated in the database.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '0 40px', 
      width: '100%',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <button 
        onClick={() => navigate(`/view-creator/${id}`)}
        style={{ 
          marginBottom: '30px', 
          marginTop: '20px',
          padding: '12px 24px',
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseOver={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.25)';
          e.target.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'rgba(255,255,255,0.15)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        ← Back to Creator
      </button>

      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '25px',
        padding: '40px',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'white', 
          marginBottom: '40px',
          fontSize: '2.5rem',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          ✨ Edit Creator
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
        backgroundColor: 'transparent',
        padding: '0',
        borderRadius: '0',
        boxShadow: 'none',
        border: 'none'
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

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '40px' }}>
          <button
            type="button"
            onClick={() => navigate(`/view-creator/${id}`)}
            style={{
              padding: '16px 32px',
              border: '2px solid rgba(255,255,255,0.3)',
              backgroundColor: 'transparent',
              color: 'white',
              borderRadius: '15px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '16px 32px',
              border: 'none',
              background: submitting ? 'rgba(255,255,255,0.3)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              borderRadius: '15px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            {submitting ? '✨ Updating...' : '💾 Update Creator'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            style={{
              padding: '16px 32px',
              border: 'none',
              background: submitting ? 'rgba(255,255,255,0.3)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              borderRadius: '15px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: submitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
              textShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            {submitting ? '🗑️ Deleting...' : '🗑️ Delete Creator'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default EditCreator;
