// ===== pages/Home/components/HeroSection.jsx =====
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// ✅ Correct import of local image
import restrutent1Img from '../Assets/restrutent.jpg';
import restrutent2Img from '../Assets/restrutent2.jpg';
import './HeroSection.css';

// Use local images bundled with the app
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: restrutent1Img,
      title: 'Welcome to Daawat-E-Ishq',
      subtitle: 'Where Every Meal is a Love Story',
      description: 'Experience the perfect blend of traditional flavors and modern elegance',
    },
    {
      image: restrutent2Img,
      title: 'Romantic Dining Experience',
      subtitle: 'Create Memories That Last Forever',
      description: 'Perfect ambiance for special occasions and intimate moments',
    },
    {
      image: restrutent1Img,
      title: 'Authentic Indian Cuisine',
      subtitle: 'Crafted with Love & Tradition',
      description: 'Savor the rich heritage of Indian spices and cooking techniques',
    },
  ];

  useEffect(() => {
    const MIN = 5000;
    const MAX = 6000;
    const delay = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  const sliderStyle = { 
    transform: `translateX(-${currentSlide * 100}%)` 
  };

  return (
    <section className="hero-section home-hero">
      {/* Slider container */}
      <div className="hero-slider" style={sliderStyle}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="hero-slide"
            style={{ backgroundImage: `url("${slide.image}")` }}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              style={{ display: 'none' }} 
            />
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <div className="container">
                <div className="hero-text">
                  <h1 className="hero-title fade-in-up">
                    <span className="script-font">{slide.title}</span>
                  </h1>
                  <h2 className="hero-subtitle fade-in-up fade-in-up-delay-1">
                    {slide.subtitle}
                  </h2>
                  <p className="hero-description fade-in-up fade-in-up-delay-2">
                    {slide.description}
                  </p>
                  <div className="hero-buttons fade-in-up fade-in-up-delay-3">
                    <Link to="/menu" className="btn btn-primary">
                      Explore Menu
                    </Link>
                    <Link to="/reservations" className="btn btn-primary">
                      Book Table
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="scroll-indicator">
        <ChevronDown className="bounce" size={30} />
      </div>
    </section>
  );
};

export default HeroSection;