import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Eligibility & Background',
    question: 'Who is eligible to apply for Dominova internship programs?',
    answer: 'Our programs are open to engineering students, arts & science undergraduates, fresh graduates, and career switchers looking to build real-world software engineering capabilities. Tracks are structured for beginner to intermediate levels.',
  },
  {
    category: 'Location & Mode',
    question: 'Is the internship conducted online, offline, or hybrid?',
    answer: 'We offer flexible tracks: hybrid and in-person sessions at our Chennai headquarters, as well as fully remote tracks for students across India. Both formats follow structured agile sprints and live code reviews.',
  },
  {
    category: 'Duration & Sprints',
    question: 'How long are the programs and what is the weekly commitment?',
    answer: 'Internships run for 1 Month, 2 Months, or 3 Months depending on track depth. Sprints are designed with weekly milestones so college students can comfortably balance studies with hands-on development.',
  },
  {
    category: 'Certification & Credential',
    question: 'Will I receive a verified certificate and recommendation letter?',
    answer: 'Yes! Upon successful completion and code submission of your capstone project, you receive an official Dominova Internship Certificate (with a verifiable credential ID), a Project/Experience Letter, and a production GitHub repository to showcase on your resume.',
  },
  {
    category: 'Curriculum & Stack',
    question: 'What technologies and frameworks will I be working with?',
    answer: 'You will work with modern production tools including React, Next.js, TypeScript, Node.js, PostgreSQL, Flutter, Python (Machine Learning / Data Analytics), AWS, Docker, and Figma.',
  },
  {
    category: 'Enterprise Services',
    question: 'Does Dominova provide custom software development for businesses?',
    answer: 'Yes! Dominova is an enterprise software provider in Chennai. We engineer bespoke web platforms, cross-platform mobile apps, cloud infrastructure, and AI workflow automation for startups and established businesses.',
  },
  {
    category: 'Application Process',
    question: 'How do I apply and when does onboarding start?',
    answer: 'Click "Apply for Internship" anywhere on the site, select your preferred engineering track, and submit your details. Our admissions and mentorship team will review your application and reach out within 24–48 hours.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <div className="section-label">FREQUENTLY ASKED QUESTIONS</div>
        <h2 className="display-sm faq__title">Everything You Need To Know</h2>

        <div className="faq__list">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className={`faq__item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="faq__question-btn"
                  aria-expanded={isOpen}
                >
                  <div className="faq__question-content">
                    <span className="faq__category">{item.category}</span>
                    <h3 className="faq__question-text">{item.question}</h3>
                  </div>
                  <span className="faq__icon">{isOpen ? '−' : '+'}</span>
                </button>

                {isOpen && (
                  <div className="faq__answer-panel">
                    <p className="faq__answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
