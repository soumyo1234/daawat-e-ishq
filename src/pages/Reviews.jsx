import React, { useState } from 'react';
import ReviewCard from '../components/ReviewCard';
import { Star, Send } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState([
    { 
      name: 'John Doe', 
      review: 'Amazing food and great service! The biryani was absolutely delicious. Will definitely come back again.', 
      rating: 5, 
      date: '2 days ago', 
      likes: 12 
    },
    { 
      name: 'Sarah Johnson', 
      review: 'Loved the ambiance and the butter chicken was perfect. Staff was very friendly and attentive.', 
      rating: 4, 
      date: '1 day ago', 
      likes: 8 
    },
    { 
      name: 'Mike Chen', 
      review: 'Authentic Indian flavors! The tandoori dishes were cooked to perfection. Highly recommended!', 
      rating: 5, 
      date: '3 days ago', 
      likes: 15 
    }
  ]);

  const [newReview, setNewReview] = useState({ 
    name: '', 
    review: '', 
    rating: 5 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.review.trim()) return;
    
    const reviewToAdd = {
      ...newReview,
      name: newReview.name.trim(),
      review: newReview.review.trim(),
      date: 'Just now',
      likes: 0
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: '', review: '', rating: 5 });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h1>
          <p className="text-gray-600 text-lg">Share your experience with us</p>
        </div>

        {/* New Review Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={newReview.name}
                  onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= newReview.rating 
                            ? 'text-yellow-500 fill-yellow-400' 
                            : 'text-gray-300'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                placeholder="Share your experience with our food and service..."
                value={newReview.review}
                onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
              >
                <Send size={18} />
                Submit Review
              </button>
            </div>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
