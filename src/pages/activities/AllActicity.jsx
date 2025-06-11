import React, { useEffect, useState } from 'react';
import { getAllActivities } from '../../api/apiGet';
import { ADMIN_API_BASE_URL } from '../../config';
import { Link } from 'react-router-dom';

const AllActivity = () => {
    const [activities, setActivities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 9;

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllActivities();
            setActivities(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const stripHtmlTags = (htmlString) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const text = tempDiv.textContent || tempDiv.innerText || '';
        return text.substring(0, 20);
    };

    // Pagination logic
    const indexOfLast = currentPage * activitiesPerPage;
    const indexOfFirst = indexOfLast - activitiesPerPage;
    const currentActivities = activities.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(activities.length / activitiesPerPage);

    return (
        <div>
            <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-2" style={{ maxWidth: 800 }}>
                    <h4 className="text-white display-2 mb-2 wow fadeInDown" data-wow-delay="0.1s">
                        กิจกรรมทั้งหมด
                    </h4>
                </div>
            </div>

            <div className="container-fluid blog py-5">
                <div className="container py-5">
                    <div className="row g-4 justify-content">
                        {currentActivities.map((activity) => (
                            <div className="col-lg-6 col-xl-4 wow fadeInUp" data-wow-delay="0.2s" key={activity.id}>
                                <div className="blog-item">
                                    <div className="blog-img" style={{ height: '180px', overflow: 'hidden' }}>
                                        <img
                                            src={`${ADMIN_API_BASE_URL}/img/information/activities/${activity.cover}`}
                                            className="img-fluid rounded-top w-100"
                                            alt={activity.title}
                                        />
                                    </div>
                                    <div className="blog-content p-4">
                                        <div className="blog-comment d-flex justify-content-between mb-3">
                                            <div className="small">
                                                <span className="fa fa-calendar text-primary"></span> {activity.uploaded_at}
                                            </div>
                                        </div>
                                        <a href="#" className="h4 d-inline-block mb-3">{activity.title.substring(0, 15)}</a>
                                        <p className="mb-3">{stripHtmlTags(activity.description)}...</p>
                                        <Link to={`/activity/${activity.slug}`} className="btn p-0">
                                            Read More <i className="fa fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    <div className="d-flex justify-content-center mt-5">
                        <nav>
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                                        &laquo;
                                    </button>
                                </li>
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                                        &raquo;
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllActivity;
