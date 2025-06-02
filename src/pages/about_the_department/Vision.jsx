import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getVision } from '../../api/apiGet';

const Vision = () => {
    const [aboutdepartment, setAboutdepartment] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
                const data = await getVision();
                setAboutdepartment(Array.isArray(data) ? data : []);
            };
            fetchData();
        }, []);

    return(
        <div className="container-fluid team bg-light pb-5" >
            <div className="container py-5">
                <div className="text-center mx-auto pb-3 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
                    <h2 className="text-primary fw-bold">วิสัยทัศน์</h2>
                    <h2>หน่วยตรวจสอบภายใน</h2>
                </div>
                <div className="row g-4">
                    <Card className="p-4">
                        {aboutdepartment.map((dep) => ( 
                            <div
                                key={dep.id_article}
                                style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                                dangerouslySetInnerHTML={{ __html: dep.description_th }}
                            />
                        ))}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Vision;