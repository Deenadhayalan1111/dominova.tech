import React, { useState } from 'react';
import './Contact.css';

interface ContactProps {
  initialDomain?: string;
}

export default function Contact({ initialDomain = '' }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: initialDomain ? 'internship' : 'project',
    serviceDomain: initialDomain || 'Web Development',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission validation and dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-label">GET IN TOUCH</div>

        <div className="contact__grid">
          {/* Left Column: Direct Info & Socials */}
          <div className="contact__info">
            <h2 className="display-sm contact__heading">
              Let's Discuss Your Next <br />
              <span className="gold">Technology Breakthrough</span>
            </h2>

            <p className="body-md contact__intro">
              Whether you are an enterprise seeking custom software solutions or a student looking to start an industry
              internship in Chennai, our leadership team is ready to connect.
            </p>

            {/* Factual Contact Details */}
            <div className="contact__details">
              <div className="contact__detail-item">
                <span className="contact__icon">👤</span>
                <div>
                  <span className="contact__detail-label">Founder & Leadership</span>
                  <p className="contact__detail-val">B. Deepak</p>
                </div>
              </div>

              <div className="contact__detail-item">
                <span className="contact__icon">📍</span>
                <div>
                  <span className="contact__detail-label">Headquarters Location</span>
                  <p className="contact__detail-val">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="contact__detail-item">
                <span className="contact__icon">🌐</span>
                <div>
                  <span className="contact__detail-label">Official Portal</span>
                  <p className="contact__detail-val">www.dominova.tech</p>
                </div>
              </div>
            </div>

            {/* Verified Social Links */}
            <div className="contact__socials">
              <span className="contact__social-label">Connect with Dominova:</span>
              <div className="contact__social-links">
                <a
                  href="https://instagram.com/dominova_chennai_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                >
                  Instagram (@dominova_chennai_)
                </a>
                <a
                  href="https://www.linkedin.com/in/deepak-b-34734b279"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                >
                  LinkedIn (B. Deepak)
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h3 className="contact__success-title">Message Received</h3>
                <p className="contact__success-desc">
                  Thank you, <strong className="gold">{formData.name}</strong>. The Dominova team will review your inquiry regarding{' '}
                  <strong className="gold">{formData.serviceDomain}</strong> and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      organization: '',
                      inquiryType: 'project',
                      serviceDomain: 'Web Development',
                      message: '',
                    });
                  }}
                  className="btn-gold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form">
                <h3 className="contact__form-title">Send a Direct Message</h3>

                {/* Inquiry Type Tabs */}
                <div className="contact__type-selector">
                  <button
                    type="button"
                    className={`contact__type-btn ${formData.inquiryType === 'project' ? 'is-active' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, inquiryType: 'project' }))}
                  >
                    Business Project
                  </button>
                  <button
                    type="button"
                    className={`contact__type-btn ${formData.inquiryType === 'internship' ? 'is-active' : ''}`}
                    onClick={() => setFormData((prev) => ({ ...prev, inquiryType: 'internship' }))}
                  >
                    Internship Program
                  </button>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact__field">
                    <label htmlFor="organization">Company / College Name</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      placeholder="e.g. TechCorp / SRM Institute"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="serviceDomain">Service or Internship Domain *</label>
                  <select
                    id="serviceDomain"
                    name="serviceDomain"
                    value={formData.serviceDomain}
                    onChange={handleChange}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Custom Software Solutions">Custom Software Solutions</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Data Analytics & Science">Data Analytics & Data Science</option>
                    <option value="Cloud & Deployment">Cloud & Deployment (DevOps)</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Technology Consulting">Technology Consulting</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Project Requirements / Query Details *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your software project scope, timeline, or internship interest..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-gold contact__submit">
                  <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
