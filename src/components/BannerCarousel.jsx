// src/components/BannerCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getActiveBanners } from '../api/apiGet';
import '../assets/styles/BannerCarousel.css';
import { ADMIN_API_BASE_URL } from '../config';

const formatUrl = (url) => {
    if (!url) return null;
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }
    return `https://${trimmed}`;
};

const BannerCarousel = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        getActiveBanners()
        .then((data) => {
            // console.log('✅ ได้รับแบนเนอร์:', data);
            setBanners(data);
        })
    }, []);

    const hasBanners = banners.length > 0;

    return (
        <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000 }}
        loop={hasBanners && banners.length > 1} // ✅ ปิด loop ถ้ามีแค่ 1 รูป
        navigation
        pagination={{ clickable: true }}
        className="banner-swiper"
        >
        {hasBanners ? (
            banners.map((banner) => {
            const hasValidUrl = banner.url && banner.url.trim() !== '';
            return (
                <SwiperSlide key={banner.id}>
                {hasValidUrl ? (
                    <a href={formatUrl(banner.url)} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${ADMIN_API_BASE_URL}/img/banner/${banner.image_name}`}
                        alt="banner"
                        className="banner-image"
                    />
                    </a>
                ) : (
                    <img
                    src={`${ADMIN_API_BASE_URL}/img/banner/${banner.image_name}`}
                    alt="banner"
                    className="banner-image"
                    />
                )}
                </SwiperSlide>
            );
            })
        ) : (
            <SwiperSlide>
            <img
                src="/banner-default.png" // ✅ ต้องวางใน public/
                alt="default banner"
                className="banner-image"
            />
            </SwiperSlide>
        )}
        </Swiper>
    );
};

export default BannerCarousel;
