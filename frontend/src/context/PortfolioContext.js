import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');

  const getAuthConfig = () => {
    const headers = {};
    if (adminToken) {
      headers['X-Admin-Token'] = adminToken;
    } else if (token) {
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
  }, []);

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
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProject = useCallback(async (projectId, data) => {
    try {
      const response = await axios.put(
        `${API_URL}/projects/${projectId}`,
        data,
        getAuthConfig()
      );
      // Refetch all projects to ensure consistency
      const projects = await axios.get(`${API_URL}/projects/user/${response.data.project.userId}`);
      setProjects(projects.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experience]);

  const value = {
    profile,
    projects,
    skills,
    experience,
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
  };

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
};
