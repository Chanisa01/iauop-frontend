import React, { useEffect, useState } from 'react';
import {getAboutDoc} from '../api/apiGet';
import {ADMIN_API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';

const AboutDropdown = () => {
    const [documents, setDocuments] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAboutDoc();
            setDocuments(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-bs-toggle="dropdown">
                เกี่ยวกับหน่วยงาน
            </a>
            <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="aboutDropdown">
                <li><Link className="dropdown-item" to="/History">ประวัติความเป็นมา</Link></li>
                <li><Link className="dropdown-item" to="/Vision">วิสัยทัศน์</Link></li>
                <li><Link className="dropdown-item" to="/Mission">พันธกิจ</Link></li>
                <li><Link className="dropdown-item" to="/Identity">อัตลักษณ์</Link></li>
                <li><Link className="dropdown-item" to="/Structure">โครงสร้าง</Link></li>
                <li><Link className="dropdown-item" to="/Personnal">บุคลากร</Link></li>
                {documents.map((doc, index) => (
                    <li key={index}>
                        <a
                        className="dropdown-item"
                        href={`${ADMIN_API_BASE_URL}/document/${doc.folder_path}${doc.file_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        {doc.title}
                        </a>
                    </li>
                ))}               
            </ul>
        </li>
    );
}

export default AboutDropdown;