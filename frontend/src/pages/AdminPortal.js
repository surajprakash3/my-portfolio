import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePortfolio } from '../hooks/usePortfolio';
import ProjectForm from '../components/ProjectForm';
import SkillForm from '../components/SkillForm';
import ExperienceForm from '../components/ExperienceForm';
import InternshipForm from '../components/InternshipForm';
import CertificateForm from '../components/CertificateForm';
import ProjectCard from '../components/ProjectCard';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import InternshipCard from '../components/InternshipCard';
import CertificateCard from '../components/CertificateCard';
import OtherForm from '../components/OtherForm';
import OtherCard from '../components/OtherCard';
import CourseForm from '../components/CourseForm';
import CourseCard from '../components/CourseCard';
import RecommendationForm from '../components/RecommendationForm';
import RecommendationCard from '../components/RecommendationCard';
import ServiceForm from '../components/ServiceForm';
import ServiceCard from '../components/ServiceCard';
import CareerBreakForm from '../components/CareerBreakForm';
import CareerBreakCard from '../components/CareerBreakCard';
import EventForm from '../components/EventForm';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/AdminPortal.css';

const AdminPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const {
    profile,
    projects,
    skills,
    experience,
    internships,
    loading,
    fetchProfile,
    fetchProjects,
    fetchSkills,
    fetchExperience,
    fetchInternships,
    fetchCertificates,
    fetchOthers,
    fetchCourses,
    fetchRecommendations,
    fetchServices,
    fetchCareerBreaks,
    fetchEvents,
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
    addInternship,
    updateInternship,
    deleteInternship,
    certificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    others,
    addOther,
    updateOther,
    deleteOther,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    recommendations,
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    services,
    addService,
    updateService,
    deleteService,
    careerBreaks,
    addCareerBreak,
    updateCareerBreak,
    deleteCareerBreak,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  } = usePortfolio();

  // Redirect to admin login if not authenticated
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin-login');
      return;
    }
  }, [isAdminLoggedIn, navigate]);

  const [activeTab, setActiveTab] = useState('profile');
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingInternship, setEditingInternship] = useState(null);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [editingOther, setEditingOther] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingRecommendation, setEditingRecommendation] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [editingCareerBreak, setEditingCareerBreak] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showOtherForm, setShowOtherForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showCareerBreakForm, setShowCareerBreakForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const portfolioUserId = localStorage.getItem('portfolioUserId');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    bio: '',
    location: '',
    phone: '',
    portfolio: '',
    github: '',
    linkedin: '',
    twitter: '',
    profileImage: '',
    university: '',
    course: '',
    graduationYear: '',
  });

  const resolveUserId = async () => {
    if (user?.id) return user.id;
    if (portfolioUserId) return portfolioUserId;
    if (profile?._id) return profile._id;
    const resp = await axios.get(`${API_URL}/portfolio/user`);
    const id = resp.data?._id;
    if (id) {
      localStorage.setItem('portfolioUserId', id);
      return id;
    }
    return null;
  };

  useEffect(() => {
    const userId = user?.id || portfolioUserId;
    if (userId) {
      fetchProfile(userId).catch(() => {});
      fetchProjects(userId).catch(() => {});
      fetchSkills(userId).catch(() => {});
      fetchExperience(userId).catch(() => {});
      fetchInternships(userId).catch(() => {});
      fetchCertificates(userId).catch(() => {});
      fetchOthers(userId).catch(() => {});
      fetchCourses(userId).catch(() => {});
      fetchRecommendations(userId).catch(() => {});
      fetchServices(userId).catch(() => {});
      fetchCareerBreaks(userId).catch(() => {});
      fetchEvents(userId).catch(() => {});
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
        portfolio: profile.portfolio || '',
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
      const userId = await resolveUserId();
      if (!userId) {
        alert('Error: Could not determine user ID. Please try logging in again.');
        return;
      }
      await updateProfile(userId, profileData);
      await fetchProfile(userId);
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

  

  const handleCertificateSubmit = async (data) => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID.');
        return;
      }
      if (editingCertificate) {
        await updateCertificate(editingCertificate._id, data);
        alert('Certificate updated successfully!');
      } else {
        await addCertificate({ ...data, userId });
        alert('Certificate added successfully!');
      }
      setShowCertificateForm(false);
      setEditingCertificate(null);
    } catch (error) {
      alert('Failed to save certificate: ' + error.message);
    }
  };

  const handleCertificateDelete = async (certId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(certId);
        alert('Certificate deleted successfully!');
      } catch (error) {
        alert('Failed to delete certificate: ' + error.message);
      }
    }
  };

  const handleInternshipSubmit = async (data) => {
    try {
      const userId = user?.id || portfolioUserId;
      if (!userId) {
        alert('Error: Could not determine user ID.');
        return;
      }
      if (editingInternship) {
        await updateInternship(editingInternship._id, data);
        alert('Internship updated successfully!');
      } else {
        await addInternship({ ...data, userId });
        alert('Internship added successfully!');
      }
      setShowInternshipForm(false);
      setEditingInternship(null);
    } catch (error) {
      alert('Failed to save internship: ' + error.message);
    }
  };

  const handleInternshipDelete = async (internshipId) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      try {
        await deleteInternship(internshipId);
        alert('Internship deleted successfully!');
      } catch (error) {
        alert('Failed to delete internship: ' + error.message);
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
        
        <button
          className={`tab ${activeTab === 'certificates' ? 'active' : ''}`}
          onClick={() => setActiveTab('certificates')}
        >
          Certificates
        </button>
        <button
          className={`tab ${activeTab === 'internships' ? 'active' : ''}`}
          onClick={() => setActiveTab('internships')}
        >
          Internships
        </button>
        <button
          className={`tab ${activeTab === 'additional' ? 'active' : ''}`}
          onClick={() => setActiveTab('additional')}
        >
          Additional
        </button>
        <button
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        <button
          className={`tab ${activeTab === 'recommendations' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendations')}
        >
          Recommendations
        </button>
        <button
          className={`tab ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          className={`tab ${activeTab === 'careerbreaks' ? 'active' : ''}`}
          onClick={() => setActiveTab('careerbreaks')}
        >
          Career Breaks
        </button>
        <button
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
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

      {/* Internships Tab */}
      {activeTab === 'internships' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>Internships</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingInternship(null);
                setShowInternshipForm(!showInternshipForm);
              }}
            >
              {showInternshipForm ? 'Cancel' : 'Add Internship'}
            </button>
          </div>

          {showInternshipForm && (
            <InternshipForm
              internship={editingInternship}
              onSubmit={handleInternshipSubmit}
              onCancel={() => {
                setShowInternshipForm(false);
                setEditingInternship(null);
              }}
            />
          )}

          <div className="items-list">
            {internships && internships.length > 0 ? (
              internships.map((intn) => (
                <InternshipCard
                  key={intn._id}
                  internship={intn}
                  isAdmin={true}
                  onEdit={(i) => {
                    setEditingInternship(i);
                    setShowInternshipForm(true);
                  }}
                  onDelete={handleInternshipDelete}
                />
              ))
            ) : (
              <p className="empty-message">No internships yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div className="admin-content">
          <div className="section-header">
            <h2>Certificates</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingCertificate(null);
                setShowCertificateForm(!showCertificateForm);
              }}
            >
              {showCertificateForm ? 'Cancel' : 'Add Certificate'}
            </button>
          </div>

          {showCertificateForm && (
            <CertificateForm
              certificate={editingCertificate}
              onSubmit={handleCertificateSubmit}
              onCancel={() => {
                setShowCertificateForm(false);
                setEditingCertificate(null);
              }}
            />
          )}

          <div className="items-list">
            {certificates && certificates.length > 0 ? (
              certificates.map((cert) => (
                <CertificateCard
                  key={cert._id}
                  certificate={cert}
                  isAdmin={true}
                  onEdit={(c) => {
                    setEditingCertificate(c);
                    setShowCertificateForm(true);
                  }}
                  onDelete={handleCertificateDelete}
                />
              ))
            ) : (
              <p className="empty-message">No certificates yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}
      {/* Internships Tab */}
      {/* Additional Tab */}
      {activeTab === 'additional' && (
        <div className="admin-content">
          <div className="content-header">
            <h2>Additional</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingOther(null);
                setShowOtherForm(!showOtherForm);
              }}
            >
              {showOtherForm ? 'Cancel' : 'Add Item'}
            </button>
          </div>

          {showOtherForm && (
            <OtherForm
              item={editingOther}
              onSubmit={async (data) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  if (!userId) { alert('Error: Could not determine user ID.'); return; }
                  if (editingOther) {
                    await updateOther(editingOther._id, data);
                    alert('Item updated successfully!');
                  } else {
                    await addOther({ ...data, userId });
                    alert('Item added successfully!');
                  }
                  setShowOtherForm(false);
                  setEditingOther(null);
                } catch (error) {
                  alert('Failed to save item: ' + error.message);
                }
              }}
              onCancel={() => {
                setShowOtherForm(false);
                setEditingOther(null);
              }}
            />
          )}

          <div className="items-list">
            {others && others.length > 0 ? (
              others.map((it) => (
                <OtherCard
                  key={it._id}
                  item={it}
                  isAdmin={true}
                  onEdit={(o) => { setEditingOther(o); setShowOtherForm(true); }}
                  onDelete={async (id) => {
                    if (window.confirm('Delete this item?')) {
                      try {
                        await deleteOther(id);
                        alert('Item deleted successfully!');
                      } catch (error) {
                        alert('Failed to delete item: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No additional items yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="admin-content">
          <div className="content-header">
            <h2>Courses</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingCourse(null);
                setShowCourseForm(!showCourseForm);
              }}
            >
              {showCourseForm ? 'Cancel' : 'Add Course'}
            </button>
          </div>

          {showCourseForm && (
            <CourseForm
              course={editingCourse}
              onSubmit={async (data) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  if (!userId) { alert('Error: Could not determine user ID.'); return; }
                  if (editingCourse) {
                    await updateCourse(editingCourse._id, data);
                    alert('Course updated successfully!');
                  } else {
                    await addCourse({ ...data, userId });
                    alert('Course added successfully!');
                  }
                  setShowCourseForm(false);
                  setEditingCourse(null);
                } catch (error) {
                  alert('Failed to save course: ' + error.message);
                }
              }}
              onCancel={() => {
                setShowCourseForm(false);
                setEditingCourse(null);
              }}
            />
          )}

          <div className="items-list">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  isAdmin={true}
                  onEdit={(c) => { setEditingCourse(c); setShowCourseForm(true); }}
                  onDelete={async (id) => {
                    if (window.confirm('Delete this course?')) {
                      try {
                        await deleteCourse(id);
                        alert('Course deleted successfully!');
                      } catch (error) {
                        alert('Failed to delete course: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No courses yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="admin-content">
          <div className="content-header">
            <h2>Recommendations</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingRecommendation(null);
                setShowRecommendationForm(!showRecommendationForm);
              }}
            >
              {showRecommendationForm ? 'Cancel' : 'Add Recommendation'}
            </button>
          </div>

          {showRecommendationForm && (
            <RecommendationForm
              recommendation={editingRecommendation}
              onSubmit={async (data) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  if (!userId) { alert('Error: Could not determine user ID.'); return; }
                  if (editingRecommendation) {
                    await updateRecommendation(editingRecommendation._id, data);
                    alert('Recommendation updated successfully!');
                  } else {
                    await addRecommendation({ ...data, userId });
                    alert('Recommendation added successfully!');
                  }
                  setShowRecommendationForm(false);
                  setEditingRecommendation(null);
                } catch (error) {
                  alert('Failed to save recommendation: ' + error.message);
                }
              }}
              onCancel={() => {
                setShowRecommendationForm(false);
                setEditingRecommendation(null);
              }}
            />
          )}

          <div className="items-list">
            {recommendations && recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <RecommendationCard
                  key={rec._id}
                  recommendation={rec}
                  isAdmin={true}
                  onEdit={(r) => { setEditingRecommendation(r); setShowRecommendationForm(true); }}
                  onDelete={async (id) => {
                    if (window.confirm('Delete this recommendation?')) {
                      try {
                        await deleteRecommendation(id);
                        alert('Recommendation deleted successfully!');
                      } catch (error) {
                        alert('Failed to delete recommendation: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No recommendations yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="admin-content">
          <div className="content-header">
            <h2>Services</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingService(null);
                setShowServiceForm(!showServiceForm);
              }}
            >
              {showServiceForm ? 'Cancel' : 'Add Service'}
            </button>
          </div>

          {showServiceForm && (
            <ServiceForm
              service={editingService}
              onSubmit={async (data) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  if (!userId) { alert('Error: Could not determine user ID.'); return; }
                  if (editingService) {
                    await updateService(editingService._id, data);
                    alert('Service updated successfully!');
                  } else {
                    await addService({ ...data, userId });
                    alert('Service added successfully!');
                  }
                  setShowServiceForm(false);
                  setEditingService(null);
                } catch (error) {
                  alert('Failed to save service: ' + error.message);
                }
              }}
              onCancel={() => {
                setShowServiceForm(false);
                setEditingService(null);
              }}
            />
          )}

          <div className="items-list">
            {services && services.length > 0 ? (
              services.map((svc) => (
                <ServiceCard
                  key={svc._id}
                  service={svc}
                  isAdmin={true}
                  onEdit={(s) => { setEditingService(s); setShowServiceForm(true); }}
                  onDelete={async (id) => {
                    if (window.confirm('Delete this service?')) {
                      try {
                        await deleteService(id);
                        alert('Service deleted successfully!');
                      } catch (error) {
                        alert('Failed to delete service: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No services yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Career Breaks Tab */}
      {activeTab === 'careerbreaks' && (
        <div className="admin-content">
          <div className="content-header">
            <h2>Career Breaks</h2>
            <button
              className="add-btn"
              onClick={() => {
                setEditingCareerBreak(null);
                setShowCareerBreakForm(!showCareerBreakForm);
              }}
            >
              {showCareerBreakForm ? 'Cancel' : 'Add Break'}
            </button>
          </div>

          {showCareerBreakForm && (
            <CareerBreakForm
              careerBreak={editingCareerBreak}
              onSubmit={async (data) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  if (!userId) { alert('Error: Could not determine user ID.'); return; }
                  if (editingCareerBreak) {
                    await updateCareerBreak(editingCareerBreak._id, data);
                    alert('Career break updated successfully!');
                  } else {
                    await addCareerBreak({ ...data, userId });
                    alert('Career break added successfully!');
                  }
                  setShowCareerBreakForm(false);
                  setEditingCareerBreak(null);
                } catch (error) {
                  alert('Failed to save career break: ' + error.message);
                }
              }}
              onCancel={() => {
                setShowCareerBreakForm(false);
                setEditingCareerBreak(null);
              }}
            />
          )}

          <div className="items-list">
            {careerBreaks && careerBreaks.length > 0 ? (
              careerBreaks.map((brk) => (
                <CareerBreakCard
                  key={brk._id}
                  careerBreak={brk}
                  isAdmin={true}
                  onEdit={(b) => { setEditingCareerBreak(b); setShowCareerBreakForm(true); }}
                  onDelete={async (id) => {
                    if (window.confirm('Delete this career break?')) {
                      try {
                        await deleteCareerBreak(id);
                        alert('Career break deleted successfully!');
                      } catch (error) {
                        alert('Failed to delete career break: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No career breaks yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="admin-content">
          <h2>Events</h2>
          <button className="add-btn" onClick={() => setShowEventForm(!showEventForm)}>
            {showEventForm ? 'Cancel' : '+ Add Event'}
          </button>

          {showEventForm && (
            <EventForm
              onSubmit={async (eventData) => {
                try {
                  const userId = user?.id || portfolioUserId;
                  await addEvent({ ...eventData, userId });
                  setShowEventForm(false);
                } catch (error) {
                  alert('Failed to add event: ' + error.message);
                }
              }}
            />
          )}

          <div className="items-grid">
            {events && events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={(eventData) => {
                    // Handle edit if needed
                  }}
                  onDelete={async (eventId) => {
                    if (window.confirm('Are you sure?')) {
                      try {
                        await deleteEvent(eventId);
                      } catch (error) {
                        alert('Failed to delete event: ' + error.message);
                      }
                    }
                  }}
                />
              ))
            ) : (
              <p className="empty-message">No events yet. Add one to get started!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;

