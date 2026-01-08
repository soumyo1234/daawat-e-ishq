import { useState } from 'react';
import api from '../utils/api';
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', subject: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.message) {
      setError('Please provide name, email and message.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/contact', form);
      if (res.data && res.data.success) {
        setSuccess('Message sent successfully. We will contact you soon.');
        setForm({ name: '', email: '', phone: '', message: '', subject: '' });
      } else {
        setError('Failed to send message.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <h2>Contact Us</h2>
      <p className="subtitle">
        With great joy and heartfelt warmth, we are opening the doors to
        <strong> Daawat-E-Ishq </strong> – a place where every flavor tells a
        story, and every bite is made with love. ❤🍴
      </p>

      <div className="contact-grid">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Visit Us</h3>
          <p>
            <strong>Location:</strong> India, North 24 Parganas, Barasat,
            Dakbunglow More
          </p>
          <p>
            <strong>Phone:</strong> 9933344656
          </p>
          <p>
            Your presence will make this beginning even more beautiful.
          </p>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h3>Get in Touch</h3>
          <form onSubmit={handleSubmit}>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your Name" required />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Your Email" required />
            <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="Phone (optional)" />
            <input name="subject" value={form.subject} onChange={handleChange} type="text" placeholder="Subject (optional)" />
            <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Your Message" required></textarea>
            <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="map-container">
        <iframe
          title="Daawat-E-Ishq Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14721.725113014818!2d88.475555!3d22.712206!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8999d4c2766af%3A0x9f110ed3b774d3bf!2zRGFhd2F04oCRZeKAkUlzaHEgUmVzdGF1cmFudA!5e0!3m2!1sen!2sus!4v1767874981274!5m2!1sen!2sus"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
