import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { getStructure } from '../../api/apiGet';
import defaultPhoto from '../../assets/img/coming-soon.png'
import { ADMIN_API_BASE_URL } from '../../config';


const Structure = () => {
    const [aboutdepartment, setAboutdepartment] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getStructure();
            setAboutdepartment(Array.isArray(data) ? data : []);
            setLoading(false);
        };
        fetchData();
    }, []);

    return(
        <div className="container-fluid team bg-light pb-5" >
            <div className="container py-5">
                <div className="text-center mx-auto pb-3 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
                    <h2 className="text-primary fw-bold">โครงสร้าง</h2>
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
                            aboutdepartment.map((dep) => {
                                const imageUrl =
                                    dep.image_name && dep.image_name.trim() !== ''
                                        ? `${ADMIN_API_BASE_URL}/img/${dep.folder_path}${dep.image_name}`
                                        : defaultPhoto;
                                return(
                                    <img 
                                        key={dep.id_article} 
                                        className="img-fluid rounded-top w-100"
                                        src={imageUrl}
                                    />
                                )
                            })
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Structure;