
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-line" style={{ width: '75%', marginBottom: '1rem' }}></div>
      <div className="skeleton-line medium" style={{ marginBottom: '0.5rem' }}></div>
      <div className="skeleton-line short" style={{ marginBottom: '1rem' }}></div>
      <div className="skeleton-footer">
        <div className="skeleton-line skeleton-price"></div>
        <div className="skeleton-line skeleton-button"></div>
      </div>
    </div>
  </div>
);

export default SkeletonCard;