import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Spoon & Soul</title>
        <meta name="description" content="Privacy Policy for Spoon & Soul. Learn how we collect, use and protect your data, including our use of Google AdSense and Analytics." />
      </Helmet>

      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>How we collect, use, and protect your information</p>
      </div>

      <div className="privacy-wrap container">
        <p className="updated">Last updated: May 16, 2026</p>

        <p>Welcome to Spoon & Soul ("we," "our," or "us"). Your privacy matters. This Privacy Policy explains what information we collect when you visit this website, how we use it, and what rights you have regarding your data.</p>

        <h2>1. Information We Collect</h2>
        <h3>Information you provide directly</h3>
        <p>When you subscribe to our newsletter or use our contact form, we collect your name and email address. We never sell, rent, or share this data with third parties for marketing purposes.</p>
        <h3>Automatically collected information</h3>
        <p>Like most websites, we automatically collect certain technical information when you visit, including your IP address, browser type, device type, the pages you view, and time spent on those pages. This data is used only to understand and improve our website and content.</p>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To send you our recipe newsletter (only if you voluntarily subscribed)</li>
          <li>To respond to messages sent via our contact form</li>
          <li>To understand how visitors use our content so we can improve it</li>
          <li>To serve relevant advertising through Google AdSense</li>
          <li>To comply with applicable laws and regulations</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>Our website uses cookies — small text files stored on your browser — to improve your experience and enable certain site features. We use the following types of cookies:</p>
        <ul>
          <li><strong>Essential cookies:</strong> Required for the website to function correctly</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with the site (via Google Analytics)</li>
          <li><strong>Advertising cookies:</strong> Used by Google AdSense to show relevant ads based on your browsing history</li>
        </ul>
        <p>You can control cookies through your browser settings. Disabling certain cookies may affect site functionality.</p>

        <h2>4. Google AdSense &amp; Advertising</h2>
        <p>We use Google AdSense to display advertisements on this website. Google uses cookies to serve ads based on your prior visits to this and other websites. This is called "interest-based advertising." You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.</p>
        <p>Third-party vendors, including Google, use cookies to serve ads based on your past visits to our website and/or other sites on the internet. For more information, visit the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>

        <h2>5. Google Analytics</h2>
        <p>We use Google Analytics to understand how visitors use our site. Google Analytics collects anonymized data such as page views, session duration, and traffic sources. This data is never used to personally identify you. You can opt out via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>

        <h2>6. Affiliate Links</h2>
        <p>Some links on this website may be affiliate links. If you click a link and make a purchase, we may earn a small commission at no additional cost to you. We only recommend products we genuinely use or believe in. All affiliate relationships are disclosed in the relevant blog posts.</p>

        <h2>7. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to read their privacy policies before providing any personal information.</p>

        <h2>8. Data Security</h2>
        <p>We take reasonable technical and organizational steps to protect your personal information from unauthorized access, disclosure, or loss. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>9. Children's Privacy</h2>
        <p>This website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately so we can delete it.</p>

        <h2>10. Your Rights</h2>
        <p>Depending on your location, you may have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, please contact us via our <Link to="/contact">Contact page</Link>.</p>

        <h2>11. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.</p>

        <h2>12. Contact Us</h2>
        <p>If you have questions or concerns about this Privacy Policy, please <Link to="/contact">contact us here</Link>. We will respond within 5 business days.</p>
      </div>
    </>
  );
}
