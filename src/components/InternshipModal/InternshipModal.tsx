import React, { useState, useEffect } from 'react';
import { applications } from '../../lib/data/db';
import './InternshipModal.css';

interface InternshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDomain?: string;
}

export default function InternshipModal({ isOpen, onClose, defaultDomain = '' }: InternshipModalProps) {
  const [selectedDomain, setSelectedDomain] = useState(defaultDomain || 'Web Development');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('3rd Year');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultDomain) setSelectedDomain(defaultDomain);
  }, [defaultDomain]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save to admin applications inbox
      applications.create({
        applicantName: name,
        email,
        phone,
        college,
        yearOfStudy: year,
        internshipId: '',
        internshipTitle: selectedDomain + ' Internship',
        status: 'new',
        notes: '',
        appliedAt: new Date().toISOString(),
      });
    } catch {
      console.error('[Dominova] Failed to save application to admin inbox.');
    }
    setSubmitted(true);
  };

  return (
    <div className="intern-modal" role="dialog" aria-modal="true">
      <div className="intern-modal__overlay" onClick={onClose} />
      <div className="intern-modal__content">
        <button className="intern-modal__close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {submitted ? (
          <div className="intern-modal__success">
            <div className="intern-modal__success-icon">✓</div>
            <h3 className="intern-modal__title">Application Submitted</h3>
            <p className="intern-modal__desc">
              Thank you <strong className="gold">{name}</strong>! Your application for the{' '}
              <strong className="gold">{selectedDomain} Internship</strong> at Dominova (Chennai) has been logged. Our mentorship team will review your application and reach out via email.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="btn-gold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="intern-modal__form">
            <span className="intern-modal__badge">DOMINOVA CAREERS</span>
            <h3 className="intern-modal__title">Apply for Internship Program</h3>
            <p className="intern-modal__sub">Blended 3-Month Hands-on Program in Chennai, India</p>

            <div className="intern-modal__field">
              <label>Select Preferred Domain *</label>
              <select value={selectedDomain} onChange={(e) => setSelectedDomain(e.target.value)}>
                <option value="Web Development">Web Development (React / Node)</option>
                <option value="Mobile App Development">Mobile App Development (Flutter / React Native)</option>
                <option value="Data Science & Analytics">Data Science & Machine Learning</option>
                <option value="Cybersecurity">Cybersecurity & Ethical Hacking</option>
                <option value="UI/UX Design">UI/UX Design Strategy</option>
                <option value="Cloud Computing & DevOps">Cloud & DevOps Infrastructure</option>
              </select>
            </div>

            <div className="intern-modal__row">
              <div className="intern-modal__field">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sundaram"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="intern-modal__field">
                <label>Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="intern-modal__row">
              <div className="intern-modal__field">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="intern-modal__field">
                <label>Year of Study *</label>
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year / Final">4th Year / Final</option>
                  <option value="Recent Graduate">Recent Graduate</option>
                </select>
              </div>
            </div>

            <div className="intern-modal__field">
              <label>College / Institution Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anna University / SRM / VIT"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-gold intern-modal__submit">
              <span>Submit Internship Application</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
