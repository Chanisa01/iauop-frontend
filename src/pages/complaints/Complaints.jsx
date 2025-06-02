import React from 'react';
import complaintsImage from '../../assets/img/social-media.png'
import ComplaintForm from './ComplaintsForm';
const Complaints = () => {
    return(
        <div>
            <div className="container-fluid contact bg-light py-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: 900 }}>
                        <h2 className="text-primary fw-bold">รับเรื่องร้องเรียน</h2>
                        <h2>ตรวจสอบด้วยกัลยาณมิตร เกิดผลสัมฤทธิ์ตามเป้าหมาย</h2>
                        {/* <h1 className="mb-4">ตรวจสอบด้วยกัลยาณมิตร เกิดผลสัมฤทธิ์ตามเป้าหมาย</h1> */}
                    </div>
                    <div className="row g-5">
                        <div className="col-xl-6 wow fadeInLeft" data-wow-delay="0.2s">
                            <div className="contact-img d-flex justify-content-center">
                                <div className="contact-img-inner">
                                <img src={complaintsImage} className="img-fluid w-100" alt="Image" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 wow fadeInRight" data-wow-delay="0.4s">
                            <div>
                                <h4 className="text-primary">แบบฟอร์มรับเรื่องร้องเรียน</h4>
                                <p className="mb-4">
                                    ท่านสามารถแจ้งเรื่องร้องเรียนมาที่หน่วยตรวจสอบภายใน สำนักงานอธิการบดี ห้อง 916 ชั้น 9 อาคารอเนกประสงค์
                                    หรือโทรศัพท์สายตรงผู้อำนวยการหน่วยตรวจสอบภายใน 02-555-2166 หรือ เบอร์โทรภายใน 2166
                                </p>
                                <ComplaintForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default Complaints;
