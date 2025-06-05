import React, { useState } from 'react';
import { submitComplaint } from '../../api/apiPOST';
import { FaCheckCircle, FaRegTimesCircle} from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

const ComplaintForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    complaintType: '',
    detail: '',
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      setForm({ ...form, phone: digits });
    } else {
      setForm({
        ...form,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.complaintType) newErrors.complaintType = 'กรุณาเลือกประเภทเรื่องร้องเรียน';
    if (!form.detail) newErrors.detail = 'กรุณาระบุรายละเอียด';
    if (!form.consent) newErrors.consent = 'กรุณายอมรับหมายเหตุ';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      // const result = await submitComplaint(form);
      await new Promise((resolve) => setTimeout(resolve, 300));

      const result = await submitComplaint(form);
      setIsSubmitting(false);

      if (result.success) {
        setSubmitStatus('success');
        setForm({
          fullName: '',
          email: '',
          phone: '',
          complaintType: '',
          detail: '',
          consent: false,
        });
      } else {
        setSubmitStatus('error');
      }
      setTimeout(() => setSubmitStatus(null), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitStatus === 'success' && (
        <div className="alert alert-success d-flex align-items-center gap-2" role="alert">
          <FaCheckCircle size={20} className="text-success" />
          <div>📬 ส่งเรื่องเรียบร้อยแล้ว ขอบคุณสำหรับการร้องเรียนค่ะ/ครับ</div>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="alert alert-danger d-flex align-items-center gap-2" role="alert">
          <FaRegTimesCircle  size={20} className="text-danger" />
          <div>ไม่สามารถส่งเรื่องได้ กรุณาลองใหม่อีกครั้งค่ะ/ครับ</div>
        </div>
      )}
      <div className="row g-3">
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input
              autoComplete="off"
              type="text"
              className="form-control border-0"
              id="fullName"
              name="fullName"
              placeholder="ชื่อ - นามสกุล"
              value={form.fullName}
              onChange={handleChange}
            />
            <label htmlFor="fullName">ชื่อ - นามสกุล</label>
          </div>
        </div>
        <div className="col-lg-12 col-xl-6">
          <div className="form-floating">
            <input
              autoComplete="off"
              type="email"
              className="form-control border-0"
              id="email"
              name="email"
              placeholder="อีเมล"
              value={form.email}
              onChange={handleChange}
            />
            <label htmlFor="email">อีเมล</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <input
              autoComplete="off"
              type="tel"
              className="form-control border-0"
              id="phone"
              name="phone"
              placeholder="หมายเลขโทรศัพท์"
              value={form.phone}
              onChange={handleChange}
              onKeyDown={(e) => {
                const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
                if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <label htmlFor="phone">หมายเลขโทรศัพท์</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <select
              className={`form-select border-0 ${errors.complaintType ? 'is-invalid' : ''}`}
              id="complaintType"
              name="complaintType"
              value={form.complaintType}
              onChange={handleChange}
            >
              <option value="">-- กรุณาเลือกประเภทเรื่องร้องเรียน --</option>
              <option value="ร้องเรียน">เรื่องร้องเรียน</option>
              <option value="ข้อเสนอแนะ">เรื่องข้อเสนอแนะ</option>
            </select>
            <label htmlFor="complaintType">ประเภทเรื่องร้องเรียน</label>
            {errors.complaintType && <div className="invalid-feedback">{errors.complaintType}</div>}
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <textarea
              autoComplete="off"
              className={`form-control border-0 ${errors.detail ? 'is-invalid' : ''}`}
              placeholder="รายละเอียด"
              id="detail"
              name="detail"
              style={{ height: '120px' }}
              value={form.detail}
              onChange={handleChange}
            />
            <label htmlFor="detail">รายละเอียด</label>
            {errors.detail && <div className="invalid-feedback">{errors.detail}</div>}
          </div>
        </div>
        <div className="col-12">
          <div className="form-check">
            <input
              className={`form-check-input ${errors.consent ? 'is-invalid' : ''}`}
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="consent">
              <strong>หมายเหตุ:</strong> ข้าพเจ้าขอรับรองว่าข้อเท็จจริงที่ได้ยื่นร้องเรียน/ข้อเสนอแนะ หน่วยตรวจสอบภายใน
              สำนักงานอธิการบดี มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ เป็นเรื่องที่เกิดขึ้นจริงทั้งหมดและขอรับผิดชอบต่อข้อเท็จจริงดังกล่าวข้างต้นทุกประการ
            </label>
            {errors.consent && <div className="invalid-feedback d-block">{errors.consent}</div>}
          </div>
        </div>
        {/* <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 py-3">
            ส่งเรื่องร้องเรียน
          </button>
        </div> */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100 py-3" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" /> กำลังส่ง...
              </>
            ) : (
              'ส่งเรื่องร้องเรียน'
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ComplaintForm;
