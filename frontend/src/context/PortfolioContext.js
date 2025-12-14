import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const defaultContextValue = {
  profile: null,
  projects: [],
  skills: [],
  experience: [],
  certificates: [],
  internships: [],
  others: [],
  courses: [],
  recommendations: [],
  services: [],
  careerBreaks: [],
  events: [],
  loading: false,
  error: null,
  fetchProfile: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  fetchProjects: () => Promise.resolve(),
  addProject: () => Promise.resolve(),
  updateProject: () => Promise.resolve(),
  deleteProject: () => Promise.resolve(),
  fetchSkills: () => Promise.resolve(),
  addSkill: () => Promise.resolve(),
  updateSkill: () => Promise.resolve(),
  deleteSkill: () => Promise.resolve(),
  fetchExperience: () => Promise.resolve(),
  addExperience: () => Promise.resolve(),
  updateExperience: () => Promise.resolve(),
  deleteExperience: () => Promise.resolve(),
  fetchCertificates: () => Promise.resolve(),
  addCertificate: () => Promise.resolve(),
  updateCertificate: () => Promise.resolve(),
  deleteCertificate: () => Promise.resolve(),
  fetchInternships: () => Promise.resolve(),
  addInternship: () => Promise.resolve(),
  updateInternship: () => Promise.resolve(),
  deleteInternship: () => Promise.resolve(),
  fetchOthers: () => Promise.resolve(),
  addOther: () => Promise.resolve(),
  updateOther: () => Promise.resolve(),
  deleteOther: () => Promise.resolve(),
  fetchCourses: () => Promise.resolve(),
  addCourse: () => Promise.resolve(),
  updateCourse: () => Promise.resolve(),
  deleteCourse: () => Promise.resolve(),
  fetchRecommendations: () => Promise.resolve(),
  addRecommendation: () => Promise.resolve(),
  updateRecommendation: () => Promise.resolve(),
  deleteRecommendation: () => Promise.resolve(),
  fetchServices: () => Promise.resolve(),
  addService: () => Promise.resolve(),
  updateService: () => Promise.resolve(),
  deleteService: () => Promise.resolve(),
  fetchCareerBreaks: () => Promise.resolve(),
  addCareerBreak: () => Promise.resolve(),
  updateCareerBreak: () => Promise.resolve(),
  deleteCareerBreak: () => Promise.resolve(),
  fetchEvents: () => Promise.resolve(),
  addEvent: () => Promise.resolve(),
  updateEvent: () => Promise.resolve(),
  deleteEvent: () => Promise.resolve(),
};

export const PortfolioContext = createContext(defaultContextValue);

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [internships, setInternships] = useState([]);
  const [others, setOthers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [services, setServices] = useState([]);
  const [careerBreaks, setCareerBreaks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const getAuthConfig = () => {
    const headers = {};
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return { headers };
  };

  const fetchProfile = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/profile/${userId}`);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const updateProfile = useCallback(async (userId, data) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/profile/${userId}`, data, getAuthConfig());
      setProfile(response.data.user);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const fetchProjects = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/projects/user/${userId}`);
      setProjects(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addProject = useCallback(async (projectData) => {
    try {
      const response = await axios.post(`${API_URL}/projects`, projectData, getAuthConfig());
      // Fetch fresh projects list instead of relying on state
      const userId = projectData.userId;
      const projectsResponse = await axios.get(`${API_URL}/projects/user/${userId}`);
      setProjects(projectsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateProject = useCallback(async (projectId, data) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}`,
        data,
        getAuthConfig()
      );
      // Refetch all projects to ensure consistency
      const projectsResp = await axios.get(`${API_URL}/projects/user/${response.data.project.userId}`);
      setProjects(projectsResp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const deleteProject = useCallback(async (projectId) => {
    try {
      const projectToDelete = projects.find(p => p._id === projectId);
      await axios.delete(`${API_URL}/projects/${projectId}`, getAuthConfig());
      if (projectToDelete) {
        const projectsResponse = await axios.get(`${API_URL}/projects/user/${projectToDelete.userId}`);
        setProjects(projectsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, projects]);

  const fetchSkills = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/skills/user/${userId}`);
      setSkills(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addSkill = useCallback(async (skillData) => {
    try {
      const response = await axios.post(`${API_URL}/skills`, skillData, getAuthConfig());
      // Fetch fresh skills list instead of relying on state
      const userId = skillData.userId;
      const skillsResponse = await axios.get(`${API_URL}/skills/user/${userId}`);
      setSkills(skillsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateSkill = useCallback(async (skillId, data) => {
    try {
      const response = await axios.put(`${API_URL}/skills/${skillId}`, data, getAuthConfig());
      // Refetch all skills to ensure consistency
      const skillsResp = await axios.get(`${API_URL}/skills/user/${response.data.skill.userId}`);
      setSkills(skillsResp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const deleteSkill = useCallback(async (skillId) => {
    try {
      const skillToDelete = skills.find(s => s._id === skillId);
      await axios.delete(`${API_URL}/skills/${skillId}`, getAuthConfig());
      if (skillToDelete) {
        const skillsResponse = await axios.get(`${API_URL}/skills/user/${skillToDelete.userId}`);
        setSkills(skillsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, skills]);

  const fetchExperience = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/experience/user/${userId}`);
      setExperience(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const fetchCertificates = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/certificates/user/${userId}`);
      setCertificates(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const fetchInternships = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/internships/user/${userId}`);
      setInternships(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const fetchOthers = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/others/user/${userId}`);
      setOthers(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addExperience = useCallback(async (expData) => {
    try {
      const response = await axios.post(`${API_URL}/experience`, expData, getAuthConfig());
      // Fetch fresh experience list instead of relying on state
      const userId = expData.userId;
      const experienceResponse = await axios.get(`${API_URL}/experience/user/${userId}`);
      setExperience(experienceResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const addCertificate = useCallback(async (data) => {
    try {
      let response;
      if (data.file) {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            fd.append(k, v);
          }
        });
        const cfg = getAuthConfig();
        cfg.headers['Content-Type'] = 'multipart/form-data';
        response = await axios.post(`${API_URL}/certificates`, fd, cfg);
      } else {
        response = await axios.post(`${API_URL}/certificates`, data, getAuthConfig());
      }
      const userId = data.userId;
      const certsResponse = await axios.get(`${API_URL}/certificates/user/${userId}`);
      setCertificates(certsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const addInternship = useCallback(async (data) => {
    try {
      const response = await axios.post(`${API_URL}/internships`, data, getAuthConfig());
      const userId = data.userId;
      const internshipsResponse = await axios.get(`${API_URL}/internships/user/${userId}`);
      setInternships(internshipsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const addOther = useCallback(async (data) => {
    try {
      const response = await axios.post(`${API_URL}/others`, data, getAuthConfig());
      const userId = data.userId;
      const othersResponse = await axios.get(`${API_URL}/others/user/${userId}`);
      setOthers(othersResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateExperience = useCallback(async (expId, data) => {
    try {
      const response = await axios.put(
        `${API_URL}/experience/${expId}`,
        data,
        getAuthConfig()
      );
      // Refetch all experience to ensure consistency
      const expResp = await axios.get(`${API_URL}/experience/user/${response.data.experience.userId}`);
      setExperience(expResp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateCertificate = useCallback(async (certId, data) => {
    try {
      let response;
      if (data.file) {
        const fd = new FormData();
        Object.entries(data).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            fd.append(k, v);
          }
        });
        const cfg = getAuthConfig();
        cfg.headers['Content-Type'] = 'multipart/form-data';
        response = await axios.put(`${API_URL}/certificates/${certId}`, fd, cfg);
      } else {
        response = await axios.put(`${API_URL}/certificates/${certId}`, data, getAuthConfig());
      }
      const resp = await axios.get(`${API_URL}/certificates/user/${response.data.certificate.userId}`);
      setCertificates(resp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateInternship = useCallback(async (internshipId, data) => {
    try {
      const response = await axios.put(`${API_URL}/internships/${internshipId}`, data, getAuthConfig());
      const resp = await axios.get(`${API_URL}/internships/user/${response.data.internship.userId}`);
      setInternships(resp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateOther = useCallback(async (otherId, data) => {
    try {
      const response = await axios.put(`${API_URL}/others/${otherId}`, data, getAuthConfig());
      const resp = await axios.get(`${API_URL}/others/user/${response.data.item.userId}`);
      setOthers(resp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const deleteExperience = useCallback(async (expId) => {
    try {
      const expToDelete = experience.find(e => e._id === expId);
      await axios.delete(`${API_URL}/experience/${expId}`, getAuthConfig());
      if (expToDelete) {
        const experienceResponse = await axios.get(`${API_URL}/experience/user/${expToDelete.userId}`);
        setExperience(experienceResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, experience]);

  const deleteCertificate = useCallback(async (certId) => {
    try {
      const toDelete = certificates.find(c => c._id === certId);
      await axios.delete(`${API_URL}/certificates/${certId}`, getAuthConfig());
      if (toDelete) {
        const certsResponse = await axios.get(`${API_URL}/certificates/user/${toDelete.userId}`);
        setCertificates(certsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, certificates]);

  const deleteInternship = useCallback(async (internshipId) => {
    try {
      const toDelete = internships.find(i => i._id === internshipId);
      await axios.delete(`${API_URL}/internships/${internshipId}`, getAuthConfig());
      if (toDelete) {
        const internshipsResponse = await axios.get(`${API_URL}/internships/user/${toDelete.userId}`);
        setInternships(internshipsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, internships]);

  const deleteOther = useCallback(async (otherId) => {
    try {
      const toDelete = others.find(o => o._id === otherId);
      await axios.delete(`${API_URL}/others/${otherId}`, getAuthConfig());
      if (toDelete) {
        const othersResponse = await axios.get(`${API_URL}/others/user/${toDelete.userId}`);
        setOthers(othersResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, others]);

  const fetchCourses = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/courses/user/${userId}`);
      setCourses(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addCourse = useCallback(async (data) => {
    try {
      const response = await axios.post(`${API_URL}/courses`, data, getAuthConfig());
      const userId = data.userId;
      const coursesResponse = await axios.get(`${API_URL}/courses/user/${userId}`);
      setCourses(coursesResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateCourse = useCallback(async (courseId, data) => {
    try {
      const response = await axios.put(`${API_URL}/courses/${courseId}`, data, getAuthConfig());
      const resp = await axios.get(`${API_URL}/courses/user/${response.data.course.userId}`);
      setCourses(resp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const deleteCourse = useCallback(async (courseId) => {
    try {
      const toDelete = courses.find(c => c._id === courseId);
      await axios.delete(`${API_URL}/courses/${courseId}`, getAuthConfig());
      if (toDelete) {
        const coursesResponse = await axios.get(`${API_URL}/courses/user/${toDelete.userId}`);
        setCourses(coursesResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, courses]);

  const fetchRecommendations = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/recommendations/user/${userId}`);
      setRecommendations(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addRecommendation = useCallback(async (data) => {
    try {
      const response = await axios.post(`${API_URL}/recommendations`, data, getAuthConfig());
      const userId = data.userId;
      const recsResponse = await axios.get(`${API_URL}/recommendations/user/${userId}`);
      setRecommendations(recsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateRecommendation = useCallback(async (recId, data) => {
    try {
      const response = await axios.put(`${API_URL}/recommendations/${recId}`, data, getAuthConfig());
      const resp = await axios.get(`${API_URL}/recommendations/user/${response.data.recommendation.userId}`);
      setRecommendations(resp.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const deleteRecommendation = useCallback(async (recId) => {
    try {
      const toDelete = recommendations.find(r => r._id === recId);
      await axios.delete(`${API_URL}/recommendations/${recId}`, getAuthConfig());
      if (toDelete) {
        const recsResponse = await axios.get(`${API_URL}/recommendations/user/${toDelete.userId}`);
        setRecommendations(recsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, recommendations]);

  // Services CRUD
  const fetchServices = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/services/user/${userId}`);
      setServices(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [API_URL]);

  const addService = useCallback(async (serviceData) => {
    try {
      const response = await axios.post(`${API_URL}/services`, serviceData, getAuthConfig());
      const userId = serviceData.userId;
      const servicesResponse = await axios.get(`${API_URL}/services/user/${userId}`);
      setServices(servicesResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateService = useCallback(async (serviceId, serviceData) => {
    try {
      const response = await axios.put(`${API_URL}/services/${serviceId}`, serviceData, getAuthConfig());
      const service = services.find(s => s._id === serviceId);
      if (service) {
        const servicesResponse = await axios.get(`${API_URL}/services/user/${service.userId}`);
        setServices(servicesResponse.data);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, services]);

  const deleteService = useCallback(async (serviceId) => {
    try {
      const toDelete = services.find(s => s._id === serviceId);
      await axios.delete(`${API_URL}/services/${serviceId}`, getAuthConfig());
      if (toDelete) {
        const servicesResponse = await axios.get(`${API_URL}/services/user/${toDelete.userId}`);
        setServices(servicesResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, services]);

  // Career Breaks CRUD
  const fetchCareerBreaks = useCallback(async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/careerbreaks/user/${userId}`);
      setCareerBreaks(response.data);
    } catch (err) {
      setError(err.message);
    }
  }, [API_URL]);

  const addCareerBreak = useCallback(async (breakData) => {
    try {
      const response = await axios.post(`${API_URL}/careerbreaks`, breakData, getAuthConfig());
      const userId = breakData.userId;
      const breaksResponse = await axios.get(`${API_URL}/careerbreaks/user/${userId}`);
      setCareerBreaks(breaksResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateCareerBreak = useCallback(async (breakId, breakData) => {
    try {
      const response = await axios.put(`${API_URL}/careerbreaks/${breakId}`, breakData, getAuthConfig());
      const breakItem = careerBreaks.find(b => b._id === breakId);
      if (breakItem) {
        const breaksResponse = await axios.get(`${API_URL}/careerbreaks/user/${breakItem.userId}`);
        setCareerBreaks(breaksResponse.data);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, careerBreaks]);

  const deleteCareerBreak = useCallback(async (breakId) => {
    try {
      const toDelete = careerBreaks.find(b => b._id === breakId);
      await axios.delete(`${API_URL}/careerbreaks/${breakId}`, getAuthConfig());
      if (toDelete) {
        const breaksResponse = await axios.get(`${API_URL}/careerbreaks/user/${toDelete.userId}`);
        setCareerBreaks(breaksResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, careerBreaks]);

  const fetchEvents = useCallback(async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/events/user/${userId}`);
      setEvents(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const addEvent = useCallback(async (eventData) => {
    try {
      let dataToSend = eventData;
      
      // Handle image upload with FormData
      if (eventData.eventImage instanceof File) {
        const formData = new FormData();
        
        // Add all form fields except the image file and preview
        Object.keys(eventData).forEach(key => {
          if (key !== 'eventImage' && key !== 'eventImagePreview') {
            if (typeof eventData[key] === 'object' && eventData[key] !== null) {
              formData.append(key, JSON.stringify(eventData[key]));
            } else {
              formData.append(key, eventData[key]);
            }
          }
        });
        
        // Add image file
        formData.append('eventImage', eventData.eventImage);
        dataToSend = formData;
      }
      
      const config = getAuthConfig();
      if (dataToSend instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      
      const response = await axios.post(`${API_URL}/events`, dataToSend, config);
      const eventsResponse = await axios.get(`${API_URL}/events/user/${eventData.userId}`);
      setEvents(eventsResponse.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL]);

  const updateEvent = useCallback(async (eventId, eventData) => {
    try {
      let dataToSend = eventData;
      const config = getAuthConfig();

      if (eventData.eventImage instanceof File) {
        const formData = new FormData();
        Object.keys(eventData).forEach(key => {
          if (key !== 'eventImagePreview') {
            const val = eventData[key];
            if (key === 'eventImage') {
              formData.append('eventImage', val);
            } else if (typeof val === 'object' && val !== null) {
              formData.append(key, JSON.stringify(val));
            } else {
              formData.append(key, val);
            }
          }
        });
        dataToSend = formData;
        config.headers['Content-Type'] = 'multipart/form-data';
      }

      const response = await axios.put(`${API_URL}/events/${eventId}`, dataToSend, config);
      const event = events.find(e => e._id === eventId);
      if (event) {
        const eventsResponse = await axios.get(`${API_URL}/events/user/${event.userId}`);
        setEvents(eventsResponse.data);
      }
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, events]);

  const deleteEvent = useCallback(async (eventId) => {
    try {
      const toDelete = events.find(e => e._id === eventId);
      await axios.delete(`${API_URL}/events/${eventId}`, getAuthConfig());
      if (toDelete) {
        const eventsResponse = await axios.get(`${API_URL}/events/user/${toDelete.userId}`);
        setEvents(eventsResponse.data);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [API_URL, events]);

  const value = {
    profile,
    projects,
    skills,
    experience,
    certificates,
    internships,
    others,
    courses,
    recommendations,
    services,
    careerBreaks,
    events,
    loading,
    error,
    fetchProfile,
    updateProfile,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    fetchSkills,
    addSkill,
    updateSkill,
    deleteSkill,
    fetchExperience,
    addExperience,
    updateExperience,
    deleteExperience,
    fetchCertificates,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    fetchInternships,
    addInternship,
    updateInternship,
    deleteInternship,
    fetchOthers,
    addOther,
    updateOther,
    deleteOther,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    fetchRecommendations,
    addRecommendation,
    updateRecommendation,
    deleteRecommendation,
    fetchServices,
    addService,
    updateService,
    deleteService,
    fetchCareerBreaks,
    addCareerBreak,
    updateCareerBreak,
    deleteCareerBreak,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
};
