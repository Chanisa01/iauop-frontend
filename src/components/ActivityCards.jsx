import React, { useEffect, useState } from 'react';
import { getActivities } from '../api/apiGet';
import { ADMIN_API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
// import '../assets/styles/ActivityCards.css';

const ActivityCards = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getActivities();
            setActivities(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const stripHtmlTags = (htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.substring(0, 45);
    };


    return(
        <div className="container-fluid blog py-5" >
            <div className="container py-5">
                <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
                    <h2 className="text-primary fw-bold">กิจกรรม</h2>
                    <h2>ข่าวสารและกิจกรรม</h2>
                </div>

                <div className="row g-4 justify-content" >
                    {activities.map((activity, index) => (
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
                                        <div className="small"><span className="fa fa-calendar text-primary"></span> {activity.uploaded_at}</div>
                                    </div>
                                    {/* <a href="#" className="h4 d-inline-block mb-3">{activity.title.substring(0, 33)}...</a> */}
                                    <a className="h4 d-inline-block mb-3">
                                        {activity.title.length > 32 
                                            ? activity.title.substring(0, 32) + '...'
                                            : activity.title}
                                    </a>
                                    <p className="mb-3">{stripHtmlTags(activity.description)}...</p>
                                    <Link to={`/activity/${activity.slug}`} className="btn p-0">
                                        Read More <i className="fa fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.2s">
                <Link to={'/AllActivity'} className="btn btn-primary rounded-pill py-3 px-5">
                กิจกรรมทั้งหมด
                </Link>
            </div>
        </div>
    );
}

export default ActivityCards;