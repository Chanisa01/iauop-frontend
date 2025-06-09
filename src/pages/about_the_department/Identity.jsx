import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { getIdentity } from '../../api/apiGet';

const Identity = () => {
    const [aboutdepartment, setAboutdepartment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                const data = await getIdentity();
                setAboutdepartment(Array.isArray(data) ? data : []);
                setLoading(false);
            };
            fetchData();
        }, []);

    return(
        <div className="container-fluid team bg-light pb-5" >
            <div className="container py-5">
                <div className="text-center mx-auto pb-3 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
                    <h2 className="text-primary fw-bold">อัตลักษณ์</h2>
                    <h2>หน่วยตรวจสอบภายใน</h2>
                </div>
                <div className="row g-4">
                    <Card className="p-4 position-relative" style={{ minHeight: '200px' }}>
                        {loading ? (
                            <div
                                className="d-flex justify-content-center align-items-center"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(255, 255, 255, 0.6)', // เพิ่มพื้นหลังโปร่งแสง
                                    zIndex: 10,
                                }}
                            >
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : (
                            aboutdepartment.map((dep) => ( 
                                <div
                                    key={dep.id_article}
                                    style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                                    dangerouslySetInnerHTML={{ __html: dep.description_th }}
                                />
                            ))
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Identity;