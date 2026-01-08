// ===== pages/Home/Home.jsx =====
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FeaturedMenu from '../components/FeaturedMenu';
import HeroSection from '../components/HeroSection';
import './Home.css';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`modern-home ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated Hero Slider Section */}
      <HeroSection />

      {/* Featured Menu Section */}
      <FeaturedMenu />

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <div className="experience-content">
            <div className="experience-text">
              <h2>An Unforgettable Culinary Journey</h2>
              <p>
                Immerse yourself in the rich tapestry of Indian cuisine, where each dish tells a story
                of tradition, passion, and culinary excellence. Our chefs craft every meal with love,
                using authentic spices and time-honored techniques.
              </p>
              <div className="experience-features">
                <div className="feature">
                  <div className="feature-icon">🍽️</div>
                  <div className="feature-text">
                    <h4>Authentic Recipes</h4>
                    <p>Traditional family recipes passed down through generations</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon">✨</div>
                  <div className="feature-text">
                    <h4>Premium Ingredients</h4>
                    <p>Fresh, high-quality ingredients sourced from trusted suppliers</p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-icon">❤️</div>
                  <div className="feature-text">
                    <h4>Made with Love</h4>
                    <p>Every dish prepared with passion and attention to detail</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="experience-visual">
              <div className="visual-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <h3>Reserve Your Experience</h3>
                  <p>Book a table and let us create magical moments for you</p>
                  <Link to="/reservations" className="reserve-btn">
                    Make Reservation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;