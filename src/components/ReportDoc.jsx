import React, { useEffect, useState } from 'react';
import {getReport} from '../api/apiGet';
import {ADMIN_API_BASE_URL} from '../config';

const ReportDoc = () => {
    const [documents, setDocuments] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getReport();
            setDocuments(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return(
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="reportDropdown" role="button" data-bs-toggle="dropdown">
                รายงานผลการดำเนินงาน
            </a>
            <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="reportDropdown">
                {/* {documents.map((doc, index) => (
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
                ))} */}
                {documents.length > 0 ? (
                    documents.map((doc, index) => (
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
                    ))
                ) : (
                    <li className="dropdown-item text-muted">ไม่มีรายงานผลการดำเนินงาน</li>
                )}
            </ul>
        </li>
    );
}

export default ReportDoc;