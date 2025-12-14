import React, { useState, useEffect } from 'react';
import '../styles/SocialMediaForm.css';

const SocialMediaForm = ({ onAdd, onUpdate, existingData, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    url: '',
    thumbnail: null,
    description: '',
  });

  const [socialMediaLinks, setSocialMediaLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      fetchSocialMediaLinks();
    }
  }, [userId]);

  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name || '',
        category: existingData.category || '',
        url: existingData.url || '',
        thumbnail: null,
        description: existingData.description || '',
      });
      if (existingData.thumbnailUrl) {
        setThumbnailPreview(existingData.thumbnailUrl);
      }
      setEditingId(existingData._id);
    }
  }, [existingData]);

  const fetchSocialMediaLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/socialmedia/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setSocialMediaLinks(data);
      }
    } catch (error) {
      console.error('Error fetching social media links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        thumbnail: file,
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPayload = new FormData();
      formPayload.append('name', formData.name);
      formPayload.append('category', formData.category);
      formPayload.append('url', formData.url);
      formPayload.append('description', formData.description);
      formPayload.append('userId', userId);
      
      if (formData.thumbnail) {
        formPayload.append('thumbnail', formData.thumbnail);
      }

      if (editingId) {
        const response = await fetch(`http://localhost:5000/api/socialmedia/${editingId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formPayload,
        });

        if (response.ok) {
          alert('Social media link updated successfully!');
          setEditingId(null);
          resetForm();
          fetchSocialMediaLinks();
          if (onUpdate) onUpdate();
        }
      } else {
        const response = await fetch('http://localhost:5000/api/socialmedia', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: formPayload,
        });

        if (response.ok) {
          alert('Social media link added successfully!');
          resetForm();
          fetchSocialMediaLinks();
          if (onAdd) onAdd();
        }
      }
    } catch (error) {
      console.error('Error saving social media link:', error);
      alert('Error saving social media link');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/socialmedia/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          alert('Social media link deleted successfully!');
          fetchSocialMediaLinks();
        }
      } catch (error) {
        console.error('Error deleting social media link:', error);
      }
    }
  };

  const handleEdit = (link) => {
    setFormData({
      name: link.name || '',
      category: link.category || '',
      url: link.url || '',
      thumbnail: null,
      description: link.description || '',
    });
    if (link.thumbnailUrl) {
      setThumbnailPreview(link.thumbnailUrl);
    }
    setEditingId(link._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      url: '',
      thumbnail: null,
      description: '',
    });
    setThumbnailPreview(null);
    setEditingId(null);
  };

  return (
    <div className="social-media-form-container">
      <div className="form-wrapper">
        <h2>{editingId ? 'Edit Social Media Link' : 'Add Social Media Link'}</h2>
        
        <form onSubmit={handleSubmit} className="social-media-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., LinkedIn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="professional">Professional</option>
                <option value="nonProfessional">Non-Professional</option>
                <option value="website">Website</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="thumbnail">Upload Thumbnail Image</label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          {thumbnailPreview && (
            <div className="thumbnail-preview">
              <img src={thumbnailPreview} alt="Preview" />
              <p>Thumbnail Preview</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
              rows="3"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              {editingId ? 'Update Link' : 'Add Link'}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  resetForm();
                }}
              >
                Cancel
              </button>
            )}
            {onClose && (
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              >
                Close Form
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="links-list-wrapper">
        <h3>Your Social Media Links</h3>
        {loading ? (
          <p>Loading...</p>
        ) : socialMediaLinks.length === 0 ? (
          <p className="no-links">No social media links added yet.</p>
        ) : (
          <div className="links-list">
            {socialMediaLinks.map((link) => (
              <div key={link._id} className="link-card">
                <div className="link-header">
                  <h4>{link.name}</h4>
                  <span className="category-badge">{link.category}</span>
                </div>
                {link.thumbnailUrl && (
                  <div className="link-thumbnail">
                    <img src={link.thumbnailUrl} alt={link.name} />
                  </div>
                )}
                <p className="link-url">{link.url}</p>
                {link.description && <p className="link-description">{link.description}</p>}
                <div className="link-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(link)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(link._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaForm;
