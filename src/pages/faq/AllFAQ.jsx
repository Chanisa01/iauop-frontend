import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {getAllFAQ} from '../../api/apiGet';
import { ADMIN_API_BASE_URL } from '../../config';
import { FaFileDownload } from "react-icons/fa";

import '../../assets/styles/faq.css'

const AllFAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllFAQ();
            setFaqs(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const handleAccordionClick = (index) => {
        if (activeIndex !== index) {
            setActiveIndex(index); // เปลี่ยนเฉพาะเมื่อ index ใหม่ไม่เท่าของเดิม
        }
    };

    return(
            <div className="container-fluid contact bg-light py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-4 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 900 }}>
                        <h4 className="text-primary">คำถามที่พบบ่อย</h4>
                        <h1 className="mb-4">คำถามที่พบบ่อยและสำคัญ</h1>
                    </div>
                    <div className="accordion" id="accordionExample">
                        {faqs.map((faq, index) => (
                            <div className="accordion-item" key={faq.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button
                                        style={{ color: '#182132', fontWeight: 500 }}
                                        className={`accordion-button ${activeIndex === index ? '' : 'collapsed'} ${activeIndex === index ? 'bg-primary text-white' : ''}`}
                                        type="button"
                                        // onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                                        onClick={() => handleAccordionClick(index)}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${index}`}
                                        aria-expanded={activeIndex === index}
                                        aria-controls={`collapse${index}`}
                                    >
                                        Q: {faq.title}
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${index}`}
                                    className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                                    aria-labelledby={`heading${index}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body" >
                                        <p >
                                            <span style={{fontWeight: 500, marginRight: '6px'}}>A:</span>
                                            <span dangerouslySetInnerHTML={{ __html: faq.description }} />
                                        </p>
                                        {faq.files && faq.files.length > 0 && (
                                            <div className="table-wrapper mx-auto">
                                            <table className="table" style={{ marginBottom: 0 }}>
                                                <thead>
                                                <tr>
                                                    <th style={{ width: '5%' }}>ลำดับ</th>
                                                    <th>หัวข้อ</th>
                                                    <th style={{ width: '10%' }}>ไฟล์</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {faq.files.map((doc, fileIndex) => (
                                                    <tr key={fileIndex}>
                                                    <td data-label="ลำดับ">{fileIndex + 1}</td>
                                                    <td data-label="หัวข้อ">{doc.original_name}</td>
                                                    <td data-label="ไฟล์" className="text-center">
                                                        <a
                                                        href={`${ADMIN_API_BASE_URL}/document/${doc.folder_path}${doc.file_name}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-outline-dark rounded-pill"
                                                        >
                                                        <FaFileDownload />
                                                        </a>
                                                    </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    );
}

export default AllFAQ;