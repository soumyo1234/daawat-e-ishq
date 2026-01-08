import { Calendar, Heart, MapPin, Phone, Sparkles, Star } from 'lucide-react';

const About = () => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fed7aa 50%, #fef3c7 100%)',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const heroStyle = {
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    padding: '80px 24px'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #dc2626, #ea580c, #d97706)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '24px'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.25rem, 4vw, 2rem)',
    color: '#374151',
    fontStyle: 'italic',
    fontWeight: '300',
    maxWidth: '768px',
    margin: '0 auto'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '48px',
    margin: '64px auto',
    maxWidth: '1152px',
    position: 'relative',
    overflow: 'hidden'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    marginBottom: '32px'
  };

  const gridItemStyle = {
    background: 'linear-gradient(135deg, #fef2f2, #fce7f3)',
    padding: '24px',
    borderRadius: '16px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const iconContainerStyle = {
    background: 'linear-gradient(135deg, #dc2626, #ea580c)',
    padding: '16px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
    animation: 'bounce 2s infinite'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '24px',
    textAlign: 'center'
  };

  const valuesContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '32px',
    marginTop: '48px'
  };

  const valueItemStyle = {
    textAlign: 'center',
    padding: '32px 16px'
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
       <div className="hero-section" style={heroStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <Sparkles style={{ color: '#f59e0b', width: '32px', height: '32px', marginRight: '12px', animation: 'pulse 2s infinite' }} />
          <h1 style={titleStyle}>Daawat-E-Ishq</h1>
          <Sparkles style={{ color: '#f59e0b', width: '32px', height: '32px', marginLeft: '12px', animation: 'pulse 2s infinite' }} />
        </div>
        <p style={subtitleStyle}>
          "Where every flavor tells a story, and every bite is made with love"
        </p>
      </div>

      {/* Main Content */}
       <div className="main-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Opening Announcement Card */}
        <div style={cardStyle} className="card-hover">
          <div style={{ textAlign: 'center' }}>
                         <div className="icon-container" style={iconContainerStyle}>
              <Heart style={{ color: 'white', width: '32px', height: '32px' }} fill="white" />
            </div>
            
            <h2 style={headingStyle}>We're Available for your service 🎉</h2>
            
            <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '32px', lineHeight: '1.7', maxWidth: '768px', margin: '0 auto 32px' }}>
              With great joy and heartfelt warmth, we are opening the doors to Daawat-E-Ishq – 
              a place where tradition meets innovation, and every meal becomes a celebration of love.
            </p>

            {/* Opening Details Grid */}
            <div style={gridStyle}>
              <div style={gridItemStyle} className="grid-item">
                <MapPin style={{ color: '#dc2626', width: '32px', height: '32px', margin: '0 auto 12px' }} />
                <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Location</h3>
                <p style={{ color: '#4b5563' }}>Dakbungalow More opposite Indian Silk House Gupta Colony, Barasat Kolkata, West Bengal</p>
              </div>
              
              <div style={gridItemStyle} className="grid-item">
                <Calendar style={{ color: '#ea580c', width: '32px', height: '32px', margin: '0 auto 12px' }} />
                <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Working hours: Monday-Sunday: 12am–11pm</h3>
               
              </div>
              
              <div style={gridItemStyle} className="grid-item">
                <Phone style={{ color: '#d97706', width: '32px', height: '32px', margin: '0 auto 12px' }} />
                <h3 style={{ fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Contact</h3>
                <p style={{ color: '#4b5563' }}>9933344656</p>
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #dc2626, #ea580c)', 
              color: 'white', 
              padding: '24px', 
              borderRadius: '16px',
              marginTop: '32px'
            }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '500', margin: 0 }}>
                Your presence will make this beginning even more beautiful. 
                Come, be a part of our journey, and celebrate love through food. ✨
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '48px', 
          alignItems: 'center', 
          marginBottom: '64px' 
        }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Our Story</h2>
            <div style={{ 
              width: '80px', 
              height: '4px', 
              background: 'linear-gradient(135deg, #dc2626, #ea580c)', 
              borderRadius: '2px', 
              marginBottom: '24px' 
            }}></div>
            <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.7', marginBottom: '20px' }}>
              Our journey began with a vision to bring age-old recipes to modern plates, 
              offering a culinary experience that delights every palate and touches every heart.
            </p>
            <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: '1.7' }}>
              At Daawat-E-Ishq, we specialize in authentic Indian cuisine, blending rich spices, 
              fresh ingredients, and generations of love in every dish we serve.
            </p>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #fef2f2, #fed7aa)', 
            padding: '32px', 
            borderRadius: '24px', 
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ color: '#f59e0b', width: '32px', height: '32px' }} fill="#f59e0b" />
                ))}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>Our Promise</h3>
              <p style={{ color: '#374151', fontStyle: 'italic', lineHeight: '1.6' }}>
                "From family dinners to festive occasions, we aim to make every meal 
                memorable with authentic flavors and heartwarming hospitality."
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
         <div className="values-section" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '48px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={headingStyle}>What Makes Us Special</h2>
            <div style={{ 
              width: '80px', 
              height: '4px', 
              background: 'linear-gradient(135deg, #dc2626, #ea580c)', 
              borderRadius: '2px', 
              margin: '0 auto' 
            }}></div>
          </div>

          <div style={valuesContainerStyle}>
            <div style={valueItemStyle} className="value-item">
              <div style={{
                background: 'linear-gradient(135deg, #dc2626, #f43f5e)',
                padding: '24px',
                borderRadius: '16px',
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Heart style={{ color: 'white', width: '32px', height: '32px' }} fill="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Made with Love</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                Every dish is crafted with passion, care, and the warmth of traditional home cooking.
              </p>
            </div>

            <div style={valueItemStyle} className="value-item">
              <div style={{
                background: 'linear-gradient(135deg, #ea580c, #d97706)',
                padding: '24px',
                borderRadius: '16px',
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles style={{ color: 'white', width: '32px', height: '32px' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Authentic Flavors</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                Rich spices, fresh ingredients, and time-honored recipes create unforgettable taste experiences.
              </p>
            </div>

            <div style={valueItemStyle} className="value-item">
              <div style={{
                background: 'linear-gradient(135deg, #d97706, #eab308)',
                padding: '24px',
                borderRadius: '16px',
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Star style={{ color: 'white', width: '32px', height: '32px' }} fill="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>Warm Hospitality</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
                Our passionate team creates not just great food, but also a welcoming atmosphere for all.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', marginTop: '64px', marginBottom: '64px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #dc2626, #ea580c, #d97706)',
            color: 'white',
            padding: '48px',
            borderRadius: '24px',
            boxShadow: '0 25px 50px rgba(220, 38, 38, 0.3)'
          }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 'bold', marginBottom: '24px' }}>
              Join Our Culinary Journey
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              marginBottom: '32px', 
              opacity: '0.9', 
              maxWidth: '768px', 
              margin: '0 auto 32px',
              lineHeight: '1.6'
            }}>
              Come, be a part of our story and savor the taste of tradition with a modern twist. 
              Experience the magic where flavors meet emotions.
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              padding: '16px 32px',
              borderRadius: '50px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              display: 'inline-block'
            }}>
              <p style={{ fontSize: '1.125rem', fontWeight: '500', margin: 0 }}>
                 At Dakbungalow More opposite Indian Silk House Gupta Colony, Barasat Kolkata, West Bengal
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-10px);
          }
          70% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        /* Only apply hover effects to specific interactive elements */
        .grid-item:hover {
          transform: scale(1.02);
        }
        
        .value-item:hover {
          transform: scale(1.02);
        }
        
        .card-hover:hover {
          transform: scale(1.01);
        }

        /* Mobile Responsiveness - Comprehensive */
        @media (max-width: 768px) {
          /* Container adjustments */
          .main-content {
            padding: 0 16px !important;
            max-width: 100% !important;
          }
          
          /* Hero section mobile */
          .hero-section {
            padding: 40px 16px !important;
          }
          
          /* Title adjustments for mobile */
          h1 {
            font-size: clamp(2rem, 8vw, 3rem) !important;
            margin-bottom: 16px !important;
            line-height: 1.2 !important;
          }
          
          /* Subtitle mobile */
          p {
            font-size: clamp(1rem, 4vw, 1.25rem) !important;
            line-height: 1.5 !important;
            margin-bottom: 16px !important;
          }
          
          /* Card mobile optimization */
          .card-hover {
            padding: 24px 16px !important;
            margin: 32px auto !important;
            border-radius: 16px !important;
          }
          
          /* Grid items mobile */
          .grid-item {
            padding: 20px 16px !important;
            margin-bottom: 16px !important;
            border-radius: 12px !important;
          }
          
          /* Values section mobile */
          .value-item {
            padding: 20px 16px !important;
            margin-bottom: 16px !important;
          }
          
          /* Story section mobile */
          .story-section {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 32px !important;
          }
          
          /* Call to action mobile */
          .cta-section {
            margin-top: 32px !important;
            margin-bottom: 32px !important;
          }
          
          /* Button and interactive elements */
          button, .btn {
            padding: 14px 24px !important;
            font-size: 1rem !important;
            width: 100% !important;
            max-width: 280px !important;
            border-radius: 25px !important;
          }
          
          /* Icon containers mobile */
          .icon-container {
            padding: 12px !important;
            width: 60px !important;
            height: 60px !important;
          }
          
          /* Values icons mobile */
          .value-item .icon-container {
            width: 60px !important;
            height: 60px !important;
            padding: 16px !important;
          }
        }

        /* Small mobile devices */
        @media (max-width: 480px) {
          /* Ultra-compact mobile */
          .main-content {
            padding: 0 12px !important;
          }
          
          .hero-section {
            padding: 32px 12px !important;
          }
          
          .card-hover {
            padding: 20px 12px !important;
            margin: 24px auto !important;
            border-radius: 12px !important;
          }
          
          .grid-item, .value-item {
            padding: 16px 12px !important;
            margin-bottom: 12px !important;
            border-radius: 8px !important;
          }
          
          /* Typography for small screens */
          h1 {
            font-size: clamp(1.75rem, 7vw, 2.5rem) !important;
            margin-bottom: 12px !important;
          }
          
          h2 {
            font-size: clamp(1.5rem, 6vw, 2rem) !important;
            margin-bottom: 16px !important;
          }
          
          h3 {
            font-size: 1.125rem !important;
            margin-bottom: 8px !important;
          }
          
          p {
            font-size: clamp(0.9rem, 3.5vw, 1rem) !important;
            line-height: 1.4 !important;
            margin-bottom: 12px !important;
          }
          
          /* Grid adjustments for tiny screens */
          .grid-item {
            min-height: auto !important;
          }
          
          /* Values section compact */
          .values-section {
            padding: 24px 12px !important;
            border-radius: 12px !important;
          }
          
          /* Call to action compact */
          .cta-section {
            margin-top: 24px !important;
            margin-bottom: 24px !important;
          }
          
          .cta-section > div {
            padding: 24px 16px !important;
            border-radius: 16px !important;
          }
        }

        /* Extra small mobile devices */
        @media (max-width: 360px) {
          .main-content {
            padding: 0 8px !important;
          }
          
          .card-hover {
            padding: 16px 8px !important;
            margin: 16px auto !important;
          }
          
          .grid-item, .value-item {
            padding: 12px 8px !important;
            margin-bottom: 8px !important;
          }
          
          h1 {
            font-size: clamp(1.5rem, 6vw, 2rem) !important;
          }
          
          h2 {
            font-size: clamp(1.25rem, 5vw, 1.75rem) !important;
          }
          
          p {
            font-size: clamp(0.85rem, 3vw, 0.95rem) !important;
          }
        }

        /* Tablet adjustments */
        @media (min-width: 769px) and (max-width: 1024px) {
          .main-content {
            padding: 0 32px !important;
          }
          
          .grid-item, .value-item {
            padding: 28px 20px !important;
          }
          
          .card-hover {
            padding: 36px 24px !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .grid-item:hover, .value-item:hover, .card-hover:hover {
            transform: none !important;
          }
          
          .grid-item:active, .value-item:active {
            transform: scale(0.98) !important;
          }
        }

        /* Landscape mobile optimization */
        @media (max-width: 768px) and (orientation: landscape) {
          .hero-section {
            padding: 24px 16px !important;
          }
          
          .card-hover {
            margin: 16px auto !important;
          }
          
          .grid-item, .value-item {
            margin-bottom: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;