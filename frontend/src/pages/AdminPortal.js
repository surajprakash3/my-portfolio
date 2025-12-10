import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectForm from '../components/ProjectForm';
import SkillForm from '../components/SkillForm';
import ExperienceForm from '../components/ExperienceForm';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/AdminPortal.css';

const AdminPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  // Redirect to admin login if not authenticated
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin-login');
      return;
    }
  }, [isAdminLoggedIn, navigate]);
  const {
    profile,
    projects,
    skills,
    experience,
    loading,
    fetchProfile,
    fetchProjects,
    fetchSkills,
    fetchExperience,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const portfolioUserId = localStorage.getItem('portfolioUserId');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    bio: '',
    location: '',
    phone: '',
    github: '',
    linkedin: '',
    twitter: '',
    profileImage: '',
    university: '',
    course: '',
    graduationYear: '',
  });

  useEffect(() => {
    const userId = user?.id || portfolioUserId;
    if (userId) {
      fetchProfile(userId).catch(() => {});
      fetchProjects(userId).catch(() => {});
      fetchSkills(userId).catch(() => {});
      fetchExperience(userId).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioUserId]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        title: profile.title || '',
        bio: profile.bio || '',
        location: profile.location || '',
        phone: profile.phone || '',
        github: profile.github || '',
        linkedin: profile.linkedin || '',
        twitter: profile.twitter || '',
        profileImage: profile.profileImage || '',
        university: profile.university || '',
        course: profile.course || '',
        graduationYear: profile.graduationYear || '',
      });
    }
  }, [profile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async () => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID. Please try logging in again.');
        return;
      }
      await updateProfile(userId, profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleProjectSubmit = async (data) => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID.');
        return;
      }
      
      if (editingProject) {
        await updateProject(editingProject._id, data);
        alert('Project updated successfully!');
      } else {
        await addProject({ ...data, userId });
        alert('Project added successfully!');
      }
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      alert('Failed to save project: ' + error.message);
    }
  };

  const handleProjectDelete = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        alert('Project deleted successfully!');
      } catch (error) {
        alert('Failed to delete project: ' + error.message);
      }
    }
  };

  const handleSkillSubmit = async (data) => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID.');
        return;
      }
      
      if (editingSkill) {
        await updateSkill(editingSkill._id, data);
        alert('Skill updated successfully!');
      } else {
        await addSkill({ ...data, userId });
        alert('Skill added successfully!');
      }
      setShowSkillForm(false);
      setEditingSkill(null);
    } catch (error) {
      alert('Failed to save skill: ' + error.message);
    }
  };

  const handleSkillDelete = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(skillId);
        alert('Skill deleted successfully!');
      } catch (error) {
        alert('Failed to delete skill: ' + error.message);
      }
    }
  };

  const handleExperienceSubmit = async (data) => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID.');
        return;
      }
      
      if (editingExperience) {
        await updateExperience(editingExperience._id, data);
        alert('Experience updated successfully!');
      } else {
        await addExperience({ ...data, userId });
        alert('Experience added successfully!');
      }
      setShowExperienceForm(false);
      setEditingExperience(null);
    } catch (error) {
      alert('Failed to save experience: ' + error.message);
    }
  };

  const handleExperienceDelete = async (expId) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(expId);
        alert('Experience deleted successfully!');
      } catch (error) {
        alert('Failed to delete experience: ' + error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="admin-portal">
      <div className="admin-header">
        <div>
          <h1>Admin Portal</h1>
          <p>Manage your portfolio</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          Skills
        </button>
        <button
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="admin-content">
          <h2>Profile Information</h2>
          <form className="profile-form">
            {/* Profile Image Section */}
            <div className="image-upload-section">
              <div className="image-preview">
                {profileData.profileImage ? (
                  <img src={profileData.profileImage} alt="Profile" />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="form-group">
                <label>Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <small>Recommended: 400x400px, JPG or PNG</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Full Stack Developer"
                value={profileData.title}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>University/College</label>
                <input
                  type="text"
                  name="university"
                  placeholder="e.g., University of Technology"
                  value={profileData.university}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Course/Degree</label>
                <input
                  type="text"
                  name="course"
                  placeholder="e.g., Bachelor of Computer Science"
                  value={profileData.course}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="number"
                name="graduationYear"
                placeholder="e.g., 2025"
                value={profileData.graduationYear}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself"
                value={profileData.bio}
                onChange={handleProfileChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City, Country"
                  value={profileData.location}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  name="github"
                  placeholder="https://github.com/username"
                  value={profileData.github}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={profileData.linkedin}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Twitter</label>
              <input
                type="url"
                name="twitter"
                placeholder="https://twitter.com/username"
                value={profileData.twitter}
                onChange={handleProfileChange}
              />
            </div>

            <button type="button" className="save-btn" onClick={handleProfileSubmit}>
              Save Profile
            </button>
          </form>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>Projects</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingProject(null);
                setShowProjectForm(!showProjectForm);
              }}
            >
              {showProjectForm ? 'Cancel' : 'Add Project'}
            </button>
          </div>

          {showProjectForm && (
            <ProjectForm
              project={editingProject}
              onSubmit={handleProjectSubmit}
              onCancel={() => {
                setShowProjectForm(false);
                setEditingProject(null);
              }}
            />
          )}

          <div className="items-list">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  isAdmin={true}
                  onEdit={(p) => {
                    setEditingProject(p);
                    setShowProjectForm(true);
                  }}
                  onDelete={handleProjectDelete}
                />
              ))
            ) : (
              <p className="empty-message">No projects yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === 'skills' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>Skills</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingSkill(null);
                setShowSkillForm(!showSkillForm);
              }}
            >
              {showSkillForm ? 'Cancel' : 'Add Skill'}
            </button>
          </div>

          {showSkillForm && (
            <SkillForm
              skill={editingSkill}
              onSubmit={handleSkillSubmit}
              onCancel={() => {
                setShowSkillForm(false);
                setEditingSkill(null);
              }}
            />
          )}

          <div className="skills-grid">
            {skills && skills.length > 0 ? (
              skills.map((skill) => (
                <SkillCard
                  key={skill._id}
                  skill={skill}
                  isAdmin={true}
                  onEdit={(s) => {
                    setEditingSkill(s);
                    setShowSkillForm(true);
                  }}
                  onDelete={handleSkillDelete}
                />
              ))
            ) : (
              <p className="empty-message">No skills yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>Experience</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingExperience(null);
                setShowExperienceForm(!showExperienceForm);
              }}
            >
              {showExperienceForm ? 'Cancel' : 'Add Experience'}
            </button>
          </div>

          {showExperienceForm && (
            <ExperienceForm
              experience={editingExperience}
              onSubmit={handleExperienceSubmit}
              onCancel={() => {
                setShowExperienceForm(false);
                setEditingExperience(null);
              }}
            />
          )}

          <div className="items-list">
            {experience && experience.length > 0 ? (
              experience.map((exp) => (
                <ExperienceCard
                  key={exp._id}
                  experience={exp}
                  isAdmin={true}
                  onEdit={(e) => {
                    setEditingExperience(e);
                    setShowExperienceForm(true);
                  }}
                  onDelete={handleExperienceDelete}
                />
              ))
            ) : (
              <p className="empty-message">No experience yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;
