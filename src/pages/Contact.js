import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Recipe Question', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact — Spoon & Soul</title>
        <meta name="description" content="Get in touch with Adarsh at Spoon & Soul. Ask a recipe question, share feedback, or say hello." />
      </Helmet>

      <div className="page-header">
        <h1>Contact Me</h1>
        <p>Questions, recipe requests, or just want to say hi — I'd love to hear from you</p>
      </div>

      <div className="contact-wrap container">
        <div className="contact-info">
          <h2>Let's Talk</h2>
          <p>Whether you have a question about a recipe, a suggestion for the blog, want to collaborate, or just want to say hello — fill out the form and I'll get back to you within 1–2 business days.</p>
          <div className="contact-info-items">
            <div className="contact-info-item">
              <span>📧</span>
              <div>
                <strong>Email</strong>
                <p>alokyadav1139@gmail.com</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span>📍</span>
              <div>
                <strong>Location</strong>
                <p>Kathmandu, Nepal</p>
              </div>
            </div>
            <div className="contact-info-item">
              <span>⏰</span>
              <div>
                <strong>Response Time</strong>
                <p>1–2 business days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrap">
          {submitted ? (
            <div className="contact-success">
              <span>🎉</span>
              <h3>Message Sent!</h3>
              <p>Thanks for reaching out, {form.name}! I'll reply to <strong>{form.email}</strong> within 1–2 business days.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {error && <div className="form-error">{error}</div>}

              <div className="form-row">
                <label htmlFor="name">Full Name *</label>
                <input id="name" name="name" type="text" placeholder="Adarsh Tamang" value={form.name} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                  <option>Recipe Question</option>
                  <option>Blog Feedback</option>
                  <option>Brand / Collaboration Inquiry</option>
                  <option>General Hello</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-row">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} required rows={5} />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
