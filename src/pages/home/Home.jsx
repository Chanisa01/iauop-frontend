import React from 'react';
import BannerCarousel from '../../components/BannerCarousel';
import ActivityCards from '../../components/ActivityCards';
import DocumentForPublish from'../../components/DocumentForPublish';
import FAQ from '../../components/FAQ';

const Home = () => {
    return(
        <div>
            <BannerCarousel />
            <ActivityCards />
            <FAQ/>
            <DocumentForPublish/>
        </div>
    );
}

export default Home;