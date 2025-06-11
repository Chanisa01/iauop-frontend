import React, { useEffect, useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'
import { getFooterWebsites,  trackVisit, getVisitorStats } from '../api/apiGet'
import '../assets/styles/footer.css'
const Footer = () => {
    const [footerLinks, setFooterLinks] = useState([])
    const [stats, setStats] = useState({ today: 0, yesterday: 0, month: 0, total: 0 })
    useEffect(() => {
        const fetchAll = async () => {
        setFooterLinks(await getFooterWebsites())
        await trackVisit()
        setStats(await getVisitorStats())
        }
        fetchAll()
    }, [])

    return (
        <>
            <div className="container-fluid footer py-1 wow fadeIn">
                <div className="container-fluid py-5 px-4">
                    <div className="row g-4">
                        <div className="row justify-content-between align-items-start g-4">
                            <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                                <div className="footer-item">
                                    <h4 className="text-white mb-3">ลิงก์ภายในที่เกี่ยวข้อง</h4>
                                    <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
                                        {footerLinks.map((link) => (
                                        <li key={link.id_websites} style={{ marginBottom: '0.5rem' }}>
                                            <a
                                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#ffffff',
                                                textDecoration: 'underline',
                                                transition: 'color 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.color = '#0d6efd')}
                                            onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                                            >
                                                <FaExternalLinkAlt size={14} /> {link.name_website}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                                <div className="footer-item ">
                                    <h4 className="text-white mb-3">ติดต่อหน่วยงาน</h4>
                                    <p className="text-white">
                                        หน่วยตรวจสอบภายใน สำนักงานอธิการบดี<br />
                                        มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
                                    </p>
                                    <p ><FaMapMarkerAlt className="me-1" /> 1518 ประชาราษฎร์ 1 วงศ์สว่าง บางซื่อ กรุงเทพฯ 10800</p>
                                    <p ><FaPhoneAlt className="me-1" /> (66)2-555-2000 ต่อ 1116, 1117</p>
                                    <p ><FaEnvelope className="me-1" /> iau@op.kmutnb.ac.th</p>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-4 d-flex justify-content-center align-items-center">
                                <div className="footer-item">
                                <h4 className="text-white mb-3">สถิติการเข้าชม</h4>
                                <div className="row text-white text-center g-4">
                                    <div className="col-6 col-md-6 col-lg-6">
                                        <div className="stat-box">
                                        <div className="stat-number">
                                            {stats.today.toLocaleString()}  <span className="stat-unit">ครั้ง</span>
                                        </div>
                                        <p className="stat-desc">จำนวนการเข้าชมของวันนี้</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6 col-lg-6">
                                        <div className="stat-box">
                                        <div className="stat-number">
                                            {stats.yesterday.toLocaleString()} <span className="stat-unit">ครั้ง</span>
                                        </div>
                                        <p className="stat-desc">จำนวนการเข้าชมของเมื่อวาน</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6 col-lg-6">
                                        <div className="stat-box">
                                        <div className="stat-number">
                                            {stats.month.toLocaleString()} <span className="stat-unit">ครั้ง</span>
                                        </div>
                                        <p className="stat-desc">จำนวนการเข้าชมตลอดเดือนนี้</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-6 col-lg-6">
                                        <div className="stat-box">
                                        <div className="stat-number">
                                            {stats.total.toLocaleString()} <span className="stat-unit">ครั้ง</span>
                                        </div>
                                        <p className="stat-desc">จำนวนการเข้าชมรวมทั้งหมด</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-md-6 text-center text-md-end mb-md-0">
                            <span className="text-body"><a href="#" className="border-bottom text-white"><i className="fas fa-copyright text-light me-2"></i>IAU KMUTNB</a>, All right reserved.</span>
                        </div>
                        <div className="col-md-6 text-center text-md-start text-body">
                            {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
                            {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
                            {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}

                            Designed By <a className="border-bottom text-white" href="https://htmlcodex.com">HTML Codex</a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer
