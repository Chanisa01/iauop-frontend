import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {getPersonnal} from '../../api/apiGet';
import { ADMIN_API_BASE_URL }from '../../config';
import defaultProfile from '../../assets/img/default-profile.png';
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosMail } from "react-icons/io";
import { GrCertificate } from "react-icons/gr";
import '../../assets/styles/personnal.css'

const Personnal = () => {
    const [personnal, setPersonnal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPersonnal();
            setPersonnal(Array.isArray(data) ? data : []);
        };
        fetchData();
    }, []);

    const groupByDepartment = (data) => {
        const groups = {};

        data.forEach((item) => {
            const groupName = item.group_name || 'ไม่ระบุกลุ่มงาน';
            const groupOrder = item.display_order || 999; // ถ้าไม่มี display_order → 999 ไว้ล่าง

            if (!groups[groupName]) {
                groups[groupName] = {
                    display_order: groupOrder,
                    members: [],
                };
            }
            groups[groupName].members.push(item);
        });

        // Convert to array & sort by display_order
        return Object.entries(groups)
            .map(([groupName, value]) => ({
                groupName,
                display_order: value.display_order,
                members: value.members,
            }))
            .sort((a, b) => a.display_order - b.display_order);
    };
    const groupedPersonnal = groupByDepartment(personnal);

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
                    <Card className='p-5 mx-auto' style={{ maxWidth: '1200px' }}>
                      <div className="row g-4" >                      
                        {groupedPersonnal.map((group, groupIndex) => (
                          <div key={groupIndex} className="mb-5">
                            <h3 className="text-primary fw-bold mt-4">{group.groupName}</h3>
                            <hr />
                            <div className="row g-4">
                              {group.members.map((per, index) => {
                                const imageUrl =
                                    per.image_personal_name && per.image_personal_name.trim() !== ''
                                        ? `${ADMIN_API_BASE_URL}/img/${per.folder_path}${per.image_personal_name}`
                                        : defaultProfile;

                                return (
                                  <div
                                    key={per.id_personal || index}
                                    className="col-md-6 col-lg-4 col-xl-4 wow fadeInUp"
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
                                        <h4 className="mb-0">
                                            {per.prename}
                                            {per.name} {per.surname}
                                        </h4>
                                        <hr className="my-2" />
                                        <p className="mb-0">{per.position}</p>
                                        {per.certificate === 1 ? (
                                            <p className="mb-0">
                                                <GrCertificate /> CGIA, CPA, CPIAT
                                            </p>
                                        ) : (
                                            <p className="mb-0">&nbsp;</p>
                                        )}
                                        <hr className="my-2" />
                                        {per.email && (
                                            <p className="mb-0">
                                                <IoIosMail /> {per.email}
                                            </p>
                                        )}
                                        {per.phone && (
                                            <p className="mb-0">
                                                <BsFillTelephoneFill /> {per.phone}{' '}
                                            </p>
                                        )}
                                        {per.extension && (
                                            <p className="mb-0">เบอร์ภายใน {per.extension}</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                
                                );
                              })}
                            </div>
                          </div>
                        ))}

                          {/* {personnal.map((per, index) => {
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
                          })} */}
                      </div>
                    </Card>

                </div>
            </div>

        </div>
    );
}

export default Personnal;