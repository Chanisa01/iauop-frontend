import axios from 'axios';
import { API_BASE_URL } from '../config';

export const submitComplaint = async (formData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/submit_complaint.php`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
        });

        return response.data; // { success: true/false, error: ... }
    } catch (error) {
        console.error('❌ API error:', error);
        return { success: false, error: 'เชื่อมต่อ API ไม่สำเร็จ' };
    }
};