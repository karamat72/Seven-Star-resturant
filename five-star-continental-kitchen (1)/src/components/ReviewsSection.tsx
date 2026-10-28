import React, { useState } from 'react';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReviewsSection: React.FC = () => {
  const { reviews, addReview, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [dishName, setDishName] = useState('');
  const [comment, setComment] = useState('');

  const approvedReviews = reviews.filter((r) => r.isApproved);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) return;

    addReview({
      authorName: name.trim(),
      authorEmail: email.trim() || 'guest@dining.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating,
      dishName: dishName.trim() || undefined,
      comment: comment.trim(),
      source: 'Verified Guest'
    });

    setComment('');
    setDishName('');
    setIsModalOpen(false);
  };

  return (
    <section className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Heading matching screenshot */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
              WHAT OUR GUESTS SAY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#141618] tracking-tight leading-tight">
              A Place <br />
              People Love
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Every dining experience at Bellagio is curated to deliver memories that linger long after the last course.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Right Column - Review Cards matching Bellagio layout */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {approvedReviews.slice(0, 3).map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 hover:border-stone-400 transition-colors flex flex-col justify-between shadow-sm"
              >
                <div>
                  <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed mb-6 font-light">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                      alt={rev.authorName}
                      className="w-8 h-8 rounded-full object-cover border border-stone-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-stone-900 leading-tight">
                        {rev.authorName}
                      </p>
                      {rev.dishName && (
                        <p className="text-[10px] text-stone-500 truncate max-w-[110px]">
                          {rev.dishName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <div className="flex items-center text-[#c5a059] text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'fill-[#c5a059]' : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white border border-stone-200 w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-stone-900">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">Share Your Experience</h3>
            <p className="text-xs text-stone-500 mb-5">
              Your feedback inspires our culinary team and assists fellow diners.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'fill-[#c5a059] text-[#c5a059]'
                            : 'text-stone-300'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-stone-600 font-medium ml-2">
                    {rating} of 5 stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Mehta"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-900 focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Dish Enjoyed (Optional)
                </label>
                <input
                  type="text"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  placeholder="e.g. Truffle Alfredo or Grilled Salmon"
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-900 focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Review & Impressions *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the flavours, ambience, and hospitality..."
                  className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3.5 py-2 text-sm text-stone-900 focus:border-[#c5a059] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#181a18] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
