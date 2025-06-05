import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/header.css';
import ReportDoc from './ReportDoc';
import CommitteeDropdown from './CommitteeDropdown';
import AboutDropdown from './AboutDropdown';

const Header = () => {
  return (
    <>
      <div className="container-fluid topbar px-0 px-lg-4 bg-light py-2 d-none d-lg-block">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="text-muted small">
              <i className="fas fa-map-marker-alt text-primary me-2"></i>
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
            </div>

            <div>
              <a href="mailto:iau@op.kmutnb.ac.th" className="text-muted small">
                <i className="fas fa-envelope text-primary me-2"></i>
                iau@op.kmutnb.ac.th
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar sticky-top navbar-expand-lg bg-white py-3 sticky-header">
        <div className="container">

          {/* โลโก้ */}
          <Link className="navbar-brand fw-bold text-primary d-flex align-items-center" to="/">
            <img src="/Seal_of_KMUTNB.svg" alt="Logo" height="32" className="me-2" />
            IAU KMUTNB
          </Link>

          {/* ปุ่มสามขีดแสดงใน mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* เมนูหลัก */}
          <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
            <div className="menu-container mt-3 mt-lg-0 w-100">
              <ul className="navbar-nav flex-row flex-wrap align-items-center gap-3 px-3 menu-full-width">

                {/* เกี่ยวกับหน่วยงาน */}
                <AboutDropdown/>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="aboutDropdown" role="button" data-bs-toggle="dropdown">
                    เกี่ยวกับหน่วยงาน
                  </a>
                  <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="aboutDropdown">
                    <li><Link className="dropdown-item" to="/History">ประวัติความเป็นมา</Link></li>
                    <li><Link className="dropdown-item" to="/Vision">วิสัยทัศน์</Link></li>
                    <li><Link className="dropdown-item" to="/Mission">พันธกิจ</Link></li>
                    <li><Link className="dropdown-item" to="/Identity">อัตลักษณ์</Link></li>
                    <li><Link className="dropdown-item" to="/Structure">โครงสร้าง</Link></li>
                    <li><Link className="dropdown-item" to="/Personnal">บุคลากร</Link></li>                
                  </ul>
                </li> */}
                {/* <li className="nav-item"><Link className="nav-link" to="/AllActivity">กิจกรรมข่าว</Link></li> */}

                {/* คณะกรรมการตรวจสอบ */}
                <CommitteeDropdown/>
                {/* <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="committeeDropdown" role="button" data-bs-toggle="dropdown">
                    คณะกรรมการตรวจสอบ
                  </a>
                  <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="committeeDropdown">
                    <li><Link className="dropdown-item" to="/AuditCommittee">องค์ประกอบคณะกรรมการตรวจสอบ</Link></li>
                  </ul>
                </li> */}

                {/* รายงานผลการดำเนินงาน */}
                <ReportDoc/>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="information" role="button" data-bs-toggle="dropdown">
                    สารสนเทศ
                  </a>
                  <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="information">
                    <li><Link className="dropdown-item" to="/AllActivity">กิจกรรมข่าว</Link></li>
                    <li><Link className="dropdown-item" to="/DownloadDoc">เอกสารดาวน์โหลด</Link></li>
                    <li><Link className="dropdown-item" to="/AllFAQ">คำถามที่พบบ่อย</Link></li>             
                  </ul>
                </li>

                <li className="nav-item"><Link className="nav-link" to="/complaints">แจ้งเรื่องร้องเรียน</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/RelatedWebsite">เว็บไซต์ที่เกี่ยวข้อง</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
