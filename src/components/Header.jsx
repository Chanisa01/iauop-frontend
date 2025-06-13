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

        <div className="container-fluid nav-bar px-0 px-lg-4 py-lg-0">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <Link className="navbar-brand p-0" to="/">
                    {/* <img src="/Seal_of_KMUTNB.svg" alt="Logo" height="32" className="me-2" />
                    IAU KMUTNB */}
                    <img src="/internal.svg" alt="Logo" height="60" className="me-2" />
                  </Link>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="fa fa-bars"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarCollapse">
                    <div className="navbar-nav mx-0 mx-lg-auto">
                        <AboutDropdown/>
                        <CommitteeDropdown/>
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
                    </div>
                  </div>
                </nav>
            </div>
        </div>
    </>
  );
};

export default Header;
