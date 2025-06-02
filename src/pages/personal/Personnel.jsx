import React, { useEffect, useState } from 'react';
import {getPersonnal} from '../../api/apiGet';
// import { ADMIN_API_BASE_URL } from '../../config';
import { ADMIN_API_BASE_URL }from '../../config';
import defaultProfile from '../../assets/img/default-profile.png';
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";

const Personnal = () => {
    const [personnal, setPersonnal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPersonnal();
            setPersonnal(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    return(
        <div>
            {/* <div className="container-fluid bg-breadcrumb">
                <div className="container text-center py-2" style={{ maxWidth: 800 }}>
                    <h4 className="text-white display-2 mb-2 wow fadeInDown" data-wow-delay="0.1s">
                        บุคลากร
                    </h4>
                </div>
            </div> */}

            <div className="container-fluid team bg-light pb-5" >
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{maxWidth: 800}}>
                        <h2 className="text-primary fw-bold">บุคลากร</h2>
                        <h2>หน่วยตรวจสอบภายใน</h2>
                        {/* <h1 className="display-4 mb-4">หน่วยตรวจสอบภายใน</h1> */}
                    </div>

                    <div className="row g-4">
                        {personnal.map((per, index) => {
                            const imageUrl =
                                per.image_personal_name && per.image_personal_name.trim() !== ''
                                    ? `${ADMIN_API_BASE_URL}/img/${per.folder_path}${per.image_personal_name}`
                                    : defaultProfile;

                            return (
                                <div
                                    key={per.id_personal || index}
                                    className="col-md-6 col-lg-6 col-xl-3 wow fadeInUp"
                                    data-wow-delay="0.2s"
                                >
                                    <div className="team-item">
                                        <div className="team-img">
                                            <img
                                                src={imageUrl}
                                                className="img-fluid rounded-top w-100"
                                                alt={`${per.name} ${per.surname}`}
                                            />
                                        </div>
                                        <div className="team-title p-4">
                                            <h4 className="mb-0">{per.prename}{per.name} {per.surname}</h4>
                                            <hr className="my-2" />
                                            <p className="mb-0">{per.department}</p>
                                            <p className="mb-0">{per.position}</p>
                                            {/* <hr className="my-2" /> */}
                                            {per.certificate === 1 ? (
                                                <p className="mb-0"><GrCertificate /> CGIA, CPA, CPIAT</p>
                                            ) : (
                                                <p className="mb-0">&nbsp;</p>
                                            )}

                                            
                                            <p className="mb-0">
                                                <hr className="my-2" />
                                                {per.email && <p className="mb-0"><IoIosMail /> {per.email}</p>}
                                            
                                                {per.phone && <span><BsFillTelephoneFill/> {per.phone} </span>}
                                                {per.extension && <span>เบอร์ภายใน {per.extension}</span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Personnal;