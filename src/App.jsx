import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import { ADMIN_API_BASE_URL } from './config';
import { getActiveEventBanner, trackVisit } from './api/apiGet';
import './assets/styles/bannerPopup.css';

const App = () => {
  const [activeBanner, setActiveBanner] = useState(null);
  const [showSite, setShowSite] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      const bannerData = await getActiveEventBanner();
      if (bannerData.length > 0) {
        setActiveBanner(bannerData[0]);
      } else {
        setShowSite(true);
      }
    };

    fetchBanner();
  }, []);

  useEffect(() => {
      trackVisit();
  }, []);


  // if (!showSite && activeBanner) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center flex-column vh-100 bg-dark text-white">
  //       <img
  //         src={`${ADMIN_API_BASE_URL}/img/event_banner/${activeBanner.image_name}`}
  //         alt="Event Banner"
  //         className="img-fluid mb-3"
  //         style={{ maxHeight: '90vh', objectFit: 'contain' }}
  //       />
  //       <button className="btn btn-primary" onClick={() => setShowSite(true)}>
  //         เข้าสู่เว็บไซต์
  //       </button>
  //     </div>
  //   );
  // }

  if (!showSite && activeBanner) {
    return (
      <div className="fullscreen-banner-wrapper">
        <div className="banner-border-frame">
          <img
            src={`${ADMIN_API_BASE_URL}/img/event_banner/${activeBanner.image_name}`}
            alt="Banner"
            className="fullscreen-banner-image"
          />
          <button className="enter-site-btn" onClick={() => setShowSite(true)}>เข้าสู่เว็บไซต์</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <AppRouter />
        </div>
        <Footer />
      </div>
      <a href="#" className="btn btn-primary btn-lg-square rounded-circle back-to-top">
        <i className="fa fa-arrow-up"></i>
      </a>
    </BrowserRouter>
  );
};

export default App;
