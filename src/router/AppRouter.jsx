import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import Complaints from '../pages/complaints/Complaints';
import ActivityDetail from '../pages/activities/ActivityDetail'
import AllFAQ from '../pages/faq/AllFAQ'
import AllActivity from '../pages/activities/AllActicity'
import Personnal from '../pages/personal/Personnel';
import AuditCommittee from '../pages/audit_committee/AuditCommittee';
import RelatedWebsite from '../pages/related_website/RelatedWebsite';
import History from '../pages/about_the_department/History';
import Vision from '../pages/about_the_department/vision';
import Mission from '../pages/about_the_department/Mission';
import Identity from '../pages/about_the_department/Identity';
import Structure from '../pages/about_the_department/Structure';
import DownloadDoc from '../pages/download/DownloadDoc';

const AppRouter = () => { 
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/AllFAQ" element={<AllFAQ/>}/>
            <Route path="/AllActivity" element={<AllActivity/>}/>
            <Route path="/Personnal" element={<Personnal/>} />
            <Route path="/AuditCommittee" element={<AuditCommittee/>} />
            <Route path="/RelatedWebsite" element={<RelatedWebsite/>} />
            <Route path="/History" element={<History/>} />
            <Route path="/Vision" element={<Vision/>} />
            <Route path="/Mission" element={<Mission/>} />
            <Route path="/Identity" element={<Identity/>} />
            <Route path="/Structure" element={<Structure/>} />
            <Route path="/DownloadDoc" element={<DownloadDoc/>} />
        </Routes>
    );
};

export default AppRouter;