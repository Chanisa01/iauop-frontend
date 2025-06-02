import React, { useEffect, useState } from 'react';
import { getRelatedWeb } from '../../api/apiGet';
import defaultWeb from '../../assets/img/default-website.png';
import { ADMIN_API_BASE_URL } from '../../config';

const RelatedWebsite = () => {
    const [relatedwebsite, setRelatedwebsite] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRelatedWeb();
            setRelatedwebsite(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-2" style={{ maxWidth: 800 }}>
                    <h4 className="text-white display-2 mb-2 wow fadeInDown" data-wow-delay="0.1s">
                        เว็บไซต์ที่เกี่ยวข้อง
                    </h4>
                </div>
            </div>

            <div className="container-fluid blog bg-light team py-5">
                <div className="container py-5">
                    <div className="row g-4">
                        {relatedwebsite.map((web) => {
                            const imageUrl =
                                web.image_name && web.image_name.trim() !== ''
                                    ? `${ADMIN_API_BASE_URL}/img/websites/${web.image_name}`
                                    : defaultWeb;

                            return (
                                <div
                                    key={web.id_websites}
                                    className="col-12 col-md-4 col-lg-3 wow fadeInUp"
                                    data-wow-delay="0.2s"
                                >
                                    <a
                                        href={web.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-decoration-none"
                                    >
                                        <div className="team-item d-flex flex-column h-100 shadow rounded overflow-hidden">
                                            {/* รูปภาพจัตุรัส */}
                                            <div className="ratio ratio-1x1">
                                                <img
                                                    src={imageUrl}
                                                    className="img-fluid w-100"
                                                    alt={web.name_website}
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            </div>

                                            {/* กล่องฟ้า: สูงเท่ากันและจัดกลาง */}
                                            <div
                                                className="team-title p-3 text-white bg-primary d-flex align-items-center justify-content-center text-center"
                                                style={{
                                                    minHeight: '80px',
                                                    borderBottomLeftRadius: '8px',
                                                    borderBottomRightRadius: '8px',
                                                }}
                                            >
                                                <p className="mb-0">{web.name_website}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedWebsite;
