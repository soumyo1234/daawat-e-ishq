// ===== frontend/src/pages/Reservations.jsx =====
import { Briefcase, CalendarHeart, Clock, Gift, Mail, MapPin, Phone } from 'lucide-react';
import ReservationForm from '../components/ReservationForm';
import './Reservations.css';

const Reservations = () => {
  return (
    <div className="reservations-page">
      {/* Hero Section */}
      <div className="reservations-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="page-title">Book Your Table</h1>
            <p className="page-subtitle">Reserve your perfect dining experience at Daawat-E-Ishq</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="reservations-content">
          {/* Left Info Panel */}
          <div className="reservation-info">
            <div className="info-card">
              <h3>Restaurant Information</h3>

              <div className="info-item">
                <MapPin size={22} />
                <div>
                  <strong>Address</strong>
                  <p>123 Food Street, Gourmet District, Delhi - 110001</p>
                </div>
              </div>

              <div className="info-item">
                <Phone size={22} />
                <div>
                  <strong>Phone</strong>
                  <p>+91 7001365854</p>
                </div>
              </div>

              <div className="info-item">
                <Mail size={22} />
                <div>
                  <strong>Email</strong>
                  <p>reservations@daawateishq.com</p>
                </div>
              </div>

              <div className="info-item">
                <Clock size={22} />
                <div>
                  <strong>Opening Hours</strong>
                  <p>Mon-Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* Special Occasions Section */}
            <div className="special-occasions">
              <h3>Special Occasions</h3>
              <div className="occasion-cards">
                <div className="occasion-card">
                  <CalendarHeart size={28} className="occasion-icon" />
                  <div>
                    <h4>Anniversary Dinner</h4>
                    <p>Romantic setup with candles & flowers</p>
                  </div>
                </div>
                <div className="occasion-card">
                  <Gift size={28} className="occasion-icon" />
                  <div>
                    <h4>Birthday Celebration</h4>
                    <p>Special cake & festive decorations</p>
                  </div>
                </div>
                <div className="occasion-card">
                  <Briefcase size={28} className="occasion-icon" />
                  <div>
                    <h4>Business Meeting</h4>
                    <p>Private dining area with WiFi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="reservation-form-section">
            <ReservationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
