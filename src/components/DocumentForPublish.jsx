import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import '../assets/styles/DocumentTable.css';
import {getDocPublish} from '../api/apiGet';
import { ADMIN_API_BASE_URL } from '../config';
import { FaFileDownload } from "react-icons/fa";

const DocumentForPublish = () => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocPublish();
            setDocuments(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <div
                    className="text-center mx-auto pb-4 wow fadeInUp heading-double-line"
                    data-wow-delay="0.2s"
                    style={{ maxWidth: 800 }}
                >
                    <h2 className="text-primary fw-bold">เอกสารเผยแพร่</h2>
                    {/* <h1 class="display-4 mb-4">Insurance Provide you a Better Future</h1> */}
                </div>

                <div className="table-wrapper mx-auto animate-fadeInUp">
                    <div className="table-responsive">
                        <table className="table custom-table-style">
                            <thead>
                                <tr>
                                    <th style={{ width: '5%' }}>ลำดับ</th>
                                    <th>หัวข้อ</th>
                                    <th style={{ width: '5%' }}>ไฟล์</th>
                                    <th style={{ width: '15%' }}>วันที่เผยแพร่</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.length > 0 ? (
                                    documents.map((doc, index) => (
                                        <tr key={doc.id}>
                                            <td>{index + 1}</td>
                                            <td className="text-start">{doc.title}</td>
                                            <td>
                                                <a
                                                    href={`${ADMIN_API_BASE_URL}/document/${doc.folder_path}${doc.file_name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-sm btn-outline-dark rounded-pill "
                                                >
                                                    <FaFileDownload />
                                                </a>
                                            </td>
                                            <td>{new Date(doc.uploaded_at).toLocaleDateString('th-TH')}</td>
                                        </tr>
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-muted">
                                        ไม่พบข้อมูล
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DocumentForPublish;
