import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADMIN_API_BASE_URL } from '../../config';
import { getActivityById, getActivityImages, getActivityFiles } from '../../api/apiGet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '../../assets/styles/ActivityDetail.css';

const ActivityDetail = () => {
    const { id } = useParams(); // กรณีใช้ slug ก็ใช้ slug แทน
    const [activity, setActivity] = useState(null);
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getActivityById(id);
            const imgs = await getActivityImages(id);
            const files = await getActivityFiles(id);

            setActivity(data);
            setImages(imgs);
            setFiles(files);
        };
        fetchAll();
    }, [id]);

    if (!activity) return <div className="text-center">Loading...</div>;

    const allImages = [activity.cover, ...images.map((img) => img.image_name)];

    return (
        <div className="container-fluid py-5">
            <div className="container py-3">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="mb-4 border-bottom pb-3">
                            <h2 className="fw-bold">{activity.title}</h2>
                            <p className="text-muted">
                                <i className="fa fa-calendar text-primary me-2"></i>
                                วันที่เผยแพร่: {activity.uploaded_at}
                            </p>
                        </div>

                        <div className="mb-5">
                            <Swiper
                                modules={[Navigation, Thumbs]}
                                spaceBetween={10}
                                navigation
                                thumbs={{ swiper: thumbsSwiper }}
                                className="main-swiper"
                                style={{ width: '100%', height: '500px' }}
                            >
                                {allImages.map((img, index) => (
                                    <div className='mb-3'>
                                        <SwiperSlide key={index}>
                                            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                            <img
                                                src={`${ADMIN_API_BASE_URL}/img/information/activities/${img}`}
                                                alt={`activity-${index}`}
                                                className="img-fluid rounded shadow"
                                                style={{ maxHeight: '100%', objectFit: 'contain' }}
                                            />
                                            </div>
                                        </SwiperSlide>                                
                                    </div>
                                ))}
                            </Swiper>

                            {images.length > 0 && (
                                <div className="d-flex justify-content-center">
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView="auto"
                                    watchSlidesProgress
                                    className="d-flex justify-content-center mt-3"
                                >
                                    {allImages.map((img, index) => (
                                        <SwiperSlide key={index} style={{ width: '80px' }}>
                                        <img
                                            src={`${ADMIN_API_BASE_URL}/img/information/activities/${img}`}
                                            alt={`thumb-${index}`}
                                            className="img-fluid border rounded"
                                            style={{ height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                                        />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>                                    
                                </div>

                            )}
                        </div>

                        <div className="mb-5 reveal-up">
                        <div className="p-4 bg-light rounded shadow-sm animate__animated animate__fadeIn">
                            <div
                                style={{ lineHeight: '1.8', fontSize: '1.1rem' }}
                                dangerouslySetInnerHTML={{ __html: activity.description }}
                            />
                        </div>
                        </div>


                        {files.length > 0 && (
                            <div className="table-responsive mb-4">
                                <h5 className="mb-3">เอกสารแนบ</h5>
                                <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                    <th>ชื่อไฟล์</th>
                                    <th>ดาวน์โหลด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((file) => (
                                    <tr key={file.id}>
                                        <td>{file.original_name || file.file_name}</td>
                                        <td>
                                        <a
                                            href={`${ADMIN_API_BASE_URL}/document/information/activities/${file.file_name}`}
                                            className="btn btn-outline-primary btn-sm"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ดาวน์โหลด
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
        </div>
    );
};

export default ActivityDetail;
