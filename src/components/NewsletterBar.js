import React, { useState } from 'react';
import './NewsletterBar.css';

export default function NewsletterBar() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="nl-bar">
      <div className="nl-inner">
        <h3>Never Miss a Recipe</h3>
        <p>Get new recipes delivered to your inbox every Tuesday — no spam, ever.</p>
        {submitted ? (
          <p className="nl-success">🎉 You're subscribed! Check your inbox.</p>
        ) : (
          <form className="nl-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe Free</button>
          </form>
        )}
      </div>
    </div>
  );
}
