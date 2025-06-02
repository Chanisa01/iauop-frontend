import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getStructure } from '../../api/apiGet';
import defaultPhoto from '../../assets/img/coming-soon.png'
import { ADMIN_API_BASE_URL } from '../../config';


const Structure = () => {
    const [aboutdepartment, setAboutdepartment] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
                const data = await getStructure();
                setAboutdepartment(Array.isArray(data) ? data : []);
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
                    <Card className="p-4">
                        {aboutdepartment.map((dep) => {
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
                        })}
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Structure;