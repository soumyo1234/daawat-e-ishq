import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, Calendar } from 'lucide-react';

const ReviewCard = ({ name = "Anonymous", review, rating = 5, date = "2 days ago", likes = 12, avatar }) => {
 const [liked, setLiked] = useState(false);
 const [showComments, setShowComments] = useState(false);
 const [newComment, setNewComment] = useState('');
 const [comments, setComments] = useState([
   { user: "Admin", text: "Thank you for your feedback!", time: "1 day ago" },
   { user: "John D.", text: "I totally agree!", time: "6 hours ago" }
 ]);

 // Generate initials from name with fallback
 const getInitials = (name) => {
   if (!name || typeof name !== 'string') return 'A';
   return name.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
 };

 const handleReply = () => {
   if (newComment.trim() === '') return;
   setComments([
     ...comments,
     { user: 'You', text: newComment, time: 'Just now' }
   ]);
   setNewComment('');
 };

 return (
   <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
     {/* Header */}
     <div className="flex items-center gap-3 mb-4">
       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
         <span className="text-white font-semibold text-sm">
           {getInitials(name)}
         </span>
       </div>
       <div className="flex-1">
         <h4 className="font-semibold text-gray-900">{name}</h4>
         <div className="flex items-center gap-2 text-sm text-gray-500">
           <Calendar className="w-3 h-3" />
           <span>{date}</span>
         </div>
       </div>
       <div className="flex items-center gap-1">
         {[...Array(5)].map((_, i) => (
           <Star 
             key={i} 
             size={14} 
             className={`${i < rating ? 'text-yellow-500 fill-yellow-400' : 'text-gray-300'}`} 
           />
         ))}
       </div>
     </div>

     {/* Review Text */}
     <p className="text-gray-700 mb-4 leading-relaxed">"{review}"</p>

     {/* Actions */}
     <div className="flex items-center justify-between border-t pt-3">
       <button 
         onClick={() => setLiked(!liked)}
         className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
           liked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
         }`}
       >
         <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
         {likes + (liked ? 1 : 0)}
       </button>
       
       <button 
         onClick={() => setShowComments(!showComments)}
         className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm transition-colors"
       >
         <MessageCircle className="w-4 h-4" />
         {comments.length} replies
       </button>
     </div>

     {/* Comments Section */}
     {showComments && (
       <div className="mt-4 pt-4 border-t space-y-3">
         {comments.map((comment, i) => (
           <div key={i} className="flex gap-2 text-sm">
             <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
               <span className="text-xs font-medium">{comment.user[0]}</span>
             </div>
             <div className="flex-1">
               <span className="font-medium text-gray-900">{comment.user}</span>
               <span className="text-gray-600 ml-2">{comment.text}</span>
               <p className="text-xs text-gray-400 mt-1">{comment.time}</p>
             </div>
           </div>
         ))}
         
         {/* Add Comment */}
         <div className="flex gap-2 mt-3">
           <input
             value={newComment}
             onChange={(e) => setNewComment(e.target.value)}
             placeholder="Add a reply..."
             className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
           <button 
             className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
             onClick={handleReply}
           >
             Reply
           </button>
         </div>
       </div>
     )}
   </div>
 );
};

export default ReviewCard;