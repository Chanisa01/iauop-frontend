import React, { useEffect, useState } from 'react';
import {getCommitteeDoc} from '../api/apiGet';
import {ADMIN_API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';


const CommitteeDropdown = () => {
    const [documents, setDocuments] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getCommitteeDoc();
            setDocuments(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="committeeDropdown" role="button" data-bs-toggle="dropdown">
                คณะกรรมการตรวจสอบ
            </a>
            <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="committeeDropdown">
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
                <li><Link className="dropdown-item" to="/AuditCommittee">องค์ประกอบคณะกรรมการตรวจสอบ</Link></li>
            </ul>
        </li>
    );
}

export default CommitteeDropdown;