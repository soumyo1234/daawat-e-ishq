import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    occasion: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  const occasions = [
    'Regular Dining', 'Anniversary', 'Birthday', 'Date Night',
    'Business Meeting', 'Family Gathering', 'Celebration'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!phoneRegex.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Invalid phone number';

    if (!formData.date) newErrors.date = 'Date is required';
    else if (new Date(formData.date) < new Date().setHours(0, 0, 0, 0))
      newErrors.date = 'Please choose a future date';

    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For now, we'll simulate a successful submission
      // In a real app, this would be an actual API call
      console.log('Reservation Data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        occasion: formData.occasion,
        message: formData.specialRequests
      });

      alert('🎉 Reservation submitted successfully! We will contact you shortly to confirm your booking.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        occasion: '',
        specialRequests: ''
      });
    } catch (error) {
      console.error('Reservation error:', error);
      alert('❌ Failed to submit reservation. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="reservation-form-card">
      <div className="form-header">
        <h2>Make a Reservation</h2>
        <p>Fill in the details below to book your table</p>
      </div>

      <form onSubmit={handleSubmit} className="reservation-form">
        {/* Name & Email */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name"><User size={18} /> Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email"><Mail size={18} /> Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        {/* Phone & Guests */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone"><Phone size={18} /> Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="guests"><Users size={18} /> Number of Guests</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date & Time */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date"><Calendar size={18} /> Preferred Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              min={today}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time"><Clock size={18} /> Preferred Time *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={errors.time ? 'error' : ''}
            >
              <option value="">Select time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.time && <span className="error-text">{errors.time}</span>}
          </div>
        </div>

        {/* Occasion & Message */}
        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleInputChange}
          >
            <option value="">Select occasion (optional)</option>
            {occasions.map((occasion) => (
              <option key={occasion} value={occasion}>{occasion}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="specialRequests"><MessageSquare size={18} /> Special Requests</label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            placeholder="Any dietary restrictions, seating preferences, or special arrangements..."
            rows="4"
          />
        </div>

        <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Reserve Table'}
        </button>
      </form>

      <div className="form-footer">
        <p>
          By making a reservation, you agree to our{' '}
          <a href="/terms">Terms & Conditions</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default ReservationForm;
