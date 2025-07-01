import React, { useEffect, useState } from 'react';
import { getAllFAQ } from '../../api/apiGet';
import { ADMIN_API_BASE_URL } from '../../config';
import { FaFileDownload, FaQuestionCircle, FaSearch, FaCalendarAlt } from "react-icons/fa";
import '../../assets/styles/faq.css';

const AllFAQ = () => {
    const [faqGroups, setFaqGroups] = useState({});
    const [openIndex, setOpenIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFAQs, setFilteredFAQs] = useState({});
    const [initiallyOpenItems, setInitiallyOpenItems] = useState(new Set());

    const handleAccordionClick = (id) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllFAQ();
            const faqData = typeof data === 'object' && data !== null ? data : {};
            setFaqGroups(faqData);
            
            // เปิดคำถามแรกในแต่ละประเภทเมื่อโหลดครั้งแรก
            const firstItems = new Set();
            Object.entries(faqData).forEach(([groupName, groupData], groupIndex) => {
                if (groupData.faqs && groupData.faqs.length > 0) {
                    const firstItemId = `collapse-${groupIndex}-0`;
                    firstItems.add(firstItemId);
                }
            });
            setInitiallyOpenItems(firstItems);
            
            // ตั้งค่าให้เปิดคำถามแรกของกลุ่มแรก
            if (firstItems.size > 0) {
                const firstItem = Array.from(firstItems)[0];
                setOpenIndex(firstItem);
            }
        };
        fetchData();
    }, []);

    // Filter FAQs based on search term
    useEffect(() => {
        if (!searchTerm) {
            setFilteredFAQs(faqGroups);
            return;
        }

        const filtered = {};
        Object.entries(faqGroups).forEach(([groupName, groupData]) => {
            if (groupData.faqs) {
                const filteredFaqs = groupData.faqs.filter(faq =>
                    faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    faq.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
                if (filteredFaqs.length > 0) {
                    filtered[groupName] = { ...groupData, faqs: filteredFaqs };
                }
            }
        });
        setFilteredFAQs(filtered);
    }, [searchTerm, faqGroups]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const dataToDisplay = searchTerm ? filteredFAQs : faqGroups;

    return (
        <div className="container-fluid contact bg-light py-5">
            <div className="container py-5">
                <div className="text-center mx-auto pb-4" data-wow-delay="0.2s" style={{ maxWidth: 900 }}>
                    {/* <h4 className="text-primary">คำถามที่พบบ่อย</h4> */}
                    {/* <h1 className="mb-4">คำถามที่พบบ่อยและสำคัญ</h1> */}
                    <h4 className="text-primary">FAQ</h4>
                    <h1 className="mb-4">คำถามที่พบบ่อยและสำคัญ</h1> 
                </div>

                {/* Search Box */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="position-relative">
                            <div className="position-absolute" style={{ left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
                                <FaSearch className="text-primary" />
                            </div>
                            <input
                                type="text"
                                className="form-control form-control-lg ps-5"
                                placeholder="ค้นหาคำถาม..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    borderRadius: '50px',
                                    border: '2px solid var(--bs-primary)',
                                    paddingLeft: '50px',
                                    fontSize: '1.1rem',
                                    boxShadow: searchTerm ? '0 0 0 0.2rem rgba(var(--bs-primary-rgb), 0.25)' : 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* No Results Message */}
                {Object.keys(dataToDisplay).length === 0 && searchTerm && (
                    <div className="text-center py-5">
                        <FaQuestionCircle className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                        <h5 className="text-muted">ไม่พบคำถามที่ตรงกับการค้นหาของคุณ</h5>
                        <p className="text-muted">ลองใช้คำค้นหาอื่น หรือดูคำถามทั้งหมด</p>
                    </div>
                )}

                {/* FAQ Groups */}
                {Object.entries(dataToDisplay).map(([groupName, groupData], groupIndex) => (
                    <div key={groupIndex} className="mb-5">
                        <div className="d-flex align-items-center mb-3">
                            <FaQuestionCircle className="text-primary me-2" style={{ fontSize: '1.5rem' }} />
                            <h3 className="text-primary fw-bold mb-0">{groupName}</h3>
                        </div>
                        <hr className="text-primary" style={{ height: '2px', opacity: '0.5' }} />
                        
                        <div className="accordion" id={`accordion-${groupIndex}`}>
                            {groupData.faqs && groupData.faqs.map((faq, index) => {
                                const collapseId = `collapse-${groupIndex}-${index}`;
                                const headingId = `heading-${groupIndex}-${index}`;
                                const uploadedAt = faq.uploaded_at ? formatDate(faq.uploaded_at) : null;
                                const isOpen = openIndex === collapseId || (!searchTerm && initiallyOpenItems.has(collapseId) && openIndex === null);
                                
                                return (
                                    <div className="accordion-item mb-3" key={faq.id} style={{ 
                                        border: 'none', 
                                        borderRadius: '15px', 
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}>
                                        <h2 className="accordion-header" id={headingId}>
                                            <button
                                                className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
                                                type="button"
                                                onClick={() => handleAccordionClick(collapseId)}
                                                aria-expanded={isOpen}
                                                aria-controls={collapseId}
                                                style={{
                                                    backgroundColor: isOpen ? 'var(--bs-primary)' : '#f8f9fa',
                                                    color: isOpen ? 'white' : '#333',
                                                    borderRadius: isOpen ? '15px 15px 0 0' : '15px',
                                                    border: 'none',
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    padding: '1.25rem 1.5rem',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: isOpen ? '0 2px 8px rgba(var(--bs-primary-rgb), 0.3)' : 'none'
                                                }}
                                            >
                                                <span>Q: {faq.title}</span>
                                            </button>
                                        </h2>
                                        
                                        {isOpen && (
                                            <div
                                                id={collapseId}
                                                className="accordion-collapse show"
                                                aria-labelledby={headingId}
                                                data-bs-parent={`#accordion-${groupIndex}`}
                                            >
                                                <div className="accordion-body position-relative" style={{ 
                                                    backgroundColor: 'white',
                                                    padding: '2rem 1.5rem'
                                                }}>
                                                    {uploadedAt && (
                                                        <div className="d-flex align-items-center mb-3 p-2" style={{
                                                            backgroundColor: 'rgba(var(--bs-primary-rgb), 0.1)',
                                                            borderRadius: '8px',
                                                            color: 'var(--bs-primary)'
                                                        }}>
                                                            <FaCalendarAlt className="me-2" />
                                                            <span className="fw-medium">วันที่เผยแพร่: {uploadedAt}</span>
                                                        </div>
                                                    )}

                                                    <div style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#555' }}>
                                                        <strong style={{ color: 'var(--bs-primary)' }}>A:</strong>{' '}
                                                        <span dangerouslySetInnerHTML={{ __html: faq.description }} />
                                                    </div>

                                                    {faq.files?.length > 0 && (
                                                        <div className="table-wrapper mx-auto mt-4">
                                                            <div style={{ 
                                                                borderRadius: '10px', 
                                                                overflow: 'hidden',
                                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                                            }}>
                                                                <table className="table table-hover mb-0">
                                                                    <thead style={{ backgroundColor: 'var(--bs-primary)', color: 'white' }}>
                                                                        <tr>
                                                                            <th style={{ width: '10%', padding: '1rem', border: 'none' }}>ลำดับ</th>
                                                                            <th style={{ padding: '1rem', border: 'none' }}>หัวข้อ</th>
                                                                            <th style={{ width: '15%', padding: '1rem', border: 'none', textAlign: 'center' }}>ไฟล์</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {faq.files.map((file, fileIndex) => (
                                                                            <tr key={fileIndex} style={{ backgroundColor: fileIndex % 2 === 0 ? '#f8f9fa' : 'white' }}>
                                                                                <td style={{ padding: '1rem', fontWeight: '600' }}>{fileIndex + 1}</td>
                                                                                <td style={{ padding: '1rem' }}>{file.original_name}</td>
                                                                                <td className="text-center" style={{ padding: '1rem' }}>
                                                                                    <a
                                                                                        href={`${ADMIN_API_BASE_URL}/document/${file.folder_path}${file.file_name}`}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="btn btn-outline-primary btn-sm"
                                                                                        style={{
                                                                                            borderRadius: '25px',
                                                                                            padding: '0.5rem 1rem',
                                                                                            fontWeight: '500',
                                                                                            display: 'inline-flex',
                                                                                            alignItems: 'center',
                                                                                            gap: '0.5rem',
                                                                                            transition: 'all 0.3s ease'
                                                                                        }}
                                                                                        onMouseEnter={(e) => {
                                                                                            e.target.style.backgroundColor = 'var(--bs-primary)';
                                                                                            e.target.style.color = 'white';
                                                                                            e.target.style.transform = 'translateY(-2px)';
                                                                                        }}
                                                                                        onMouseLeave={(e) => {
                                                                                            e.target.style.backgroundColor = 'transparent';
                                                                                            e.target.style.color = 'var(--bs-primary)';
                                                                                            e.target.style.transform = 'translateY(0)';
                                                                                        }}
                                                                                    >
                                                                                        <FaFileDownload />
                                                                                        ดาวน์โหลด
                                                                                    </a>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllFAQ;