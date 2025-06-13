import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { getAuditCommittee } from '../../api/apiGet';
import { ADMIN_API_BASE_URL } from '../../config';
import defaultProfile from '../../assets/img/default-profile.png';
import '../../assets/styles/AuditCommittee.css';

const AuditCommittee = () => {
    const [tabData, setTabData] = useState({});
    const [activeKey, setActiveKey] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAuditCommittee();
            const firstKey = Object.keys(data)[0];
            setTabData(data);
            setActiveKey(firstKey);
        };
        fetchData();
    }, []);

    // ✅ Group By position1 (group_id) + เก็บ group_name + display_order
    const groupByPosition = (committees) => {
        const grouped = {};

        committees.forEach((per) => {
            const groupId = per.position1 || 'unknown';
            if (!grouped[groupId]) {
                grouped[groupId] = {
                    groupName: per.group_name || 'ไม่ระบุตำแหน่ง',
                    displayOrder: per.display_order || 9999,
                    members: []
                };
            }
            grouped[groupId].members.push(per);
        });

        return grouped;
    };

    return (
        <div className="container-fluid team bg-light pb-5">
            <div className="container py-5">
                <div className="text-center mx-auto pb-4" style={{ maxWidth: 1000 }}>
                    <h2 className="text-primary fw-bold">คณะกรรมการตรวจสอบ</h2>
                    <h2>ประจำมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</h2>
                </div>

                <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)} justify>
                    {Object.entries(tabData).map(([yearRange, section]) => {
                        const groupedData = Object.entries(groupByPosition(section.committees))
                            .sort(([, a], [, b]) => a.displayOrder - b.displayOrder);

                        return (
                            <Tab eventKey={yearRange} title={yearRange} key={yearRange} className="mt-0">
                                <div className="tab-card-custom bg-white shadow-sm p-4">

                                    {/* ✅ Document */}
                                    {section.documents.length > 0 && (
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center rounded list-group-item">
                                                <strong>{section.documents[0].title}</strong>
                                                <a
                                                    href={`${ADMIN_API_BASE_URL}/document/composition/${section.documents[0].file_name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    ดาวน์โหลด
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {/* ✅ Grouped committees */}
                                    {groupedData.map(([groupId, groupData], posIndex) => (
                                        <div key={posIndex} className="mb-5">
                                            <h4 className="text-primary fw-bold">{groupData.groupName}</h4>
                                            <hr />
                                            <div className="row g-4">
                                                {groupData.members.map((per, index) => {
                                                    const imageUrl =
                                                        per.image_committee_name?.trim()
                                                            ? `${ADMIN_API_BASE_URL}/img/committee/${per.image_committee_name}`
                                                            : defaultProfile;

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp"
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
                                                                    <p className="mb-0">{groupData.groupName}</p>
                                                                    {per.position2 && (
                                                                        <p className="mb-0">({per.position2})</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </Tab>
                        );
                    })}
                </Tabs>
            </div>
        </div>
    );
};

export default AuditCommittee;
