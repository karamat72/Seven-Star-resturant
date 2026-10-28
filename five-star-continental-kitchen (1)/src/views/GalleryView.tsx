import React, { useState } from 'react';
import { X, ZoomIn, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Interior' | 'Food' | 'Bar' | 'Kitchen';
  url: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Main Dining Salon & Velvet Lounges',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-2',
    title: 'Artisan Truffle Tagliatelle with Shaved Parmesan',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-3',
    title: 'Prime Wagyu Steak with Confit Shallots',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-4',
    title: 'Wood-fired Sourdough Hearth & Pizza Station',
    category: 'Kitchen',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-5',
    title: 'Private Dining Suite for Intimate Celebrations',
    category: 'Interior',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-6',
    title: 'Chef Finishing Plating with Microgreens',
    category: 'Kitchen',
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-7',
    title: 'Norwegian Grilled Salmon with Asparagus',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-8',
    title: 'Curated Cellar & Vintage Wine Bar',
    category: 'Bar',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'g-9',
    title: 'Molten Belgian Chocolate Lava Souffle',
    category: 'Food',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80'
  }
];

export const GalleryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Interior' | 'Food' | 'Bar' | 'Kitchen'>('All');
  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filtered = selectedCategory === 'All' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c5a059] uppercase block">
            VISUAL EXPERIENCES
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Five Star Gallery
          </h1>
          <p className="text-stone-300 text-sm font-light">
            A glimpse into our candlelit dining spaces, culinary craftsmanship, and convivial atmosphere.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {['All', 'Interior', 'Food', 'Bar', 'Kitchen'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#c5a059] text-black shadow-md'
                    : 'bg-[#15191c] text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                {cat === 'All' ? 'All Photographs' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden border border-[#24292e] bg-stone-900 aspect-[4/3] cursor-pointer shadow-xl hover:border-[#c5a059]/60 transition-all duration-300"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider">
                  {photo.category}
                </span>
                <p className="font-serif text-base font-bold text-white mt-0.5">
                  {photo.title}
                </p>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          onClick={() => setLightboxPhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#c5a059] p-2 cursor-pointer transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.title}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-stone-800"
            />

            <div className="mt-4 text-center">
              <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest block">
                {lightboxPhoto.category}
              </span>
              <h3 className="font-serif text-lg font-bold text-white mt-1">
                {lightboxPhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
