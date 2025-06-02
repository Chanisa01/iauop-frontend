import axios from 'axios';
import { API_BASE_URL } from '../config';

export const getActiveBanners = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/banner.php?is_active=1`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch banners', error);
    return [];
  }
};

export const getFooterWebsites = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/internal_link.php?show_footer=1`)
    return response.data
  } catch (error) {
    console.error('Error loading footer links:', error)
    return []
  }
};

export const trackVisit = async () => {
  try {
    await fetch(`${API_BASE_URL}/track_visit.php`, {
      method: 'POST'
    })
  } catch (error) {
    console.error('Tracking visit failed', error)
  }
}

export const getVisitorStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/visitor_stats.php`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch visitor stats', error)
    return { today: 0, yesterday: 0, month: 0, total: 0 }
  }
}

export const getActiveEventBanner = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/event_banner.php?is_active=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching active event banner:', error);
    return []; // คืน array เปล่าในกรณี error
  }
};

export const getActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/activities.php?action=get_activities_card`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};

export const getAllActivities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/activities.php?action=get_all_activities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return [];
  }
};

export const getActivityById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/activities_detail.php?action=get_activity&id=${id}`);
  return res.data;
};

export const getActivityImages = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/activities_detail.php?action=get_images&id=${id}`);
  return res.data;
};

export const getActivityFiles = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/activities_detail.php?action=get_files&id=${id}`);
  return res.data;
};

export const getDocPublish = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents.php?category_id=5`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document Publish:', error);
    return [];
  }
};

export const getDownloadDoc = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents.php?category_id=9`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document Publish:', error);
    return [];
  }
};

export const getReport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents.php?category_id=3`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Report document:', error);
    return [];
  }
};

export const getCommitteeDoc = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents.php?category_id=2`);
    return response.data;
  } catch (error) {
    console.error('Error fetching committee document:', error);
    return [];
  }
};

export const getAboutDoc= async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/documents.php?category_id=1`);
    return response.data;
  } catch (error) {
    console.error('Error fetching committee document:', error);
    return [];
  }
};

export const getFAQ = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faq.php?action=get_active_faqs`);
    return response.data;
  }catch (error) {
    console.error('Error fetching FAQ:', error);
    return [];
  }
};

export const getAllFAQ = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faq.php?action=get_active_all_faqs`);
    return response.data;
  }catch (error) {
    console.error('Error fetching All FAQ:', error);
    return [];
  }
};

export const getPersonnal = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/personnal.php?category_id=6`);
    return response.data;
  }catch (error) {
    console.error('Error fetching personnal:', error);
    return [];
  }
};

export const getAuditCommittee = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/audit_committee.php`);
    return response.data;
  }catch (error) {
    console.error('Error fetching audit committee:', error);
    return [];
  }
};

export const getRelatedWeb = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/related_website.php`);
    return response.data;
  }catch (error) {
    console.error('Error fetching Related Website:', error);
    return [];
  }
};

export const getHistory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about_the_department.php?category_id=12`);
    return response.data;
  }catch (error) {
    console.error('Error fetching History:', error);
    return [];
  }
};

export const getVision = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about_the_department.php?category_id=13`);
    return response.data;
  }catch (error) {
    console.error('Error fetching Vision:', error);
    return [];
  }
};

export const getMission = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about_the_department.php?category_id=14`);
    return response.data;
  }catch (error) {
    console.error('Error fetching Mission:', error);
    return [];
  }
};

export const getIdentity = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about_the_department.php?category_id=15`);
    return response.data;
  }catch (error) {
    console.error('Error fetching Identity:', error);
    return [];
  }
};

export const getStructure = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/about_the_department.php?category_id=16`);
    return response.data;
  }catch (error) {
    console.error('Error fetching Identity:', error);
    return [];
  }
};



