// ===== frontend/src/pages/Blog.jsx =====
import { Clock } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 px-6 pt-28 flex flex-col md:flex-row items-center justify-center gap-12">
      {/* Left section (icon + text) */}
      <div className="text-center md:text-left max-w-lg">
        <div className="flex justify-center md:justify-start mb-6">
          <Clock className="w-14 h-14 md:w-20 md:h-20 text-orange-500 animate-pulse" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
          Blog Coming Soon 🚀
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
          We’re working on something exciting!  
          This page will be updated with fresh content soon.
        </p>
        <button className="px-5 py-2 md:px-7 md:py-3 rounded-full bg-orange-500 text-white font-medium hover:bg-orange-600 transition">
          Back to Home
        </button>
      </div>

      {/* Right section (card placeholder or image) */}
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-md text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
          Stay Tuned ✨
        </h2>
        <p className="text-gray-500">
          We’re curating amazing food stories, recipes, and tips.  
          Check back soon for updates!
        </p>
      </div>
    </div>
  );
};

export default Blog;
