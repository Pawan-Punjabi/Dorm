const SEED_DATA = [
  {
    id: "seed_1",
    type: "rant",
    title: `"Is it just me or is the attendance policy here actually criminal??"`,
    content: "75% criteria when the professor literally reads off slides that are available online? We're paying for the degree, not the morning commute.",
    timestamp: Date.now() - 120000,
    metrics: { vibe: 142, talk: 24 }
  },
  {
    id: "seed_2",
    type: "news",
    title: "The canteen just hiked prices by 30% again... but the library still has no AC.",
    content: "Reported by: Anon_Junior",
    imgSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYDLjwU6IHLsAKByj7hI_nGW0MYsNo1H3G8hWS0U3hVtGMANSu90eCdjRH4WkQYtxZgH7zhapKGskzVMwhiRi2aLc2ONU03GaY75QUrcUnscWJlQ9Vvun4wufjkylawvSYOPbQPWGAIBOsHJsZO6X5j8SMoDUMhHU9HSco7ZzqP3CGkRMLDQWOJiz0LwSdPkslMtAgApVUaKeYIjNt8G3RFU40aKPttZaorMFg7WQrVmPPl6k2YVtOxu2Rua7uXDMu7jJVtYFggaVt",
    timestamp: Date.now() - 3600000,
    metrics: { strike: 88 }
  },
  {
    id: "seed_3",
    type: "win",
    title: "Finally passed my math backlog! 4 semesters later, I'm free!",
    content: "",
    timestamp: Date.now() - 7200000,
    metrics: { hype: 0 }
  },
  {
    id: "seed_4",
    type: "rant",
    title: `"Why 2AM is the loneliest time in the hostel."`,
    content: "Everyone's either asleep or pretending to study. The silence in the hallway feels heavier than any exam pressure. Just me, some instant noodles, and my thoughts.",
    timestamp: Date.now() - 14400000,
    metrics: { vibe: 512 }
  },
  {
    id: "seed_5",
    type: "news",
    title: "Wi-Fi credentials reset tonight at midnight.",
    content: "Prepare for the 5-minute apocalypse where no one can submit their assignments.",
    timestamp: Date.now() - 86400000,
  },
  {
    id: "seed_6",
    type: "rant",
    title: "Is the gym equipment from 1984? Asking for a friend who wants to lift without tetanus.",
    content: "",
    timestamp: Date.now() - 172800000,
    metrics: { real: 302 }
  }
];

// Time formatter
function timeAgo(ms) {
  const seconds = Math.floor((Date.now() - ms) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.masonry-grid');
  if (!grid) return; // Exit if not on index.html

  // Initialize LocalStorage if empty
  if (!localStorage.getItem('dorm_posts')) {
    localStorage.setItem('dorm_posts', JSON.stringify(SEED_DATA));
  }

  // Bind global render function
  window.renderFeed = function() {
    const posts = JSON.parse(localStorage.getItem('dorm_posts') || '[]');
    const userLikedPosts = JSON.parse(localStorage.getItem('user_liked_posts') || '{}');
    grid.innerHTML = ''; // Clear grid

    posts.forEach((post, index) => {
      let html = '';
      const timeStr = timeAgo(post.timestamp);
      // Randomly rotate stickers slightly for organics
      const rotateClass = `sticker-rotate-${(index % 3) + 1}`;

      if (post.type === 'rant') {
        const vibeCount = post.metrics?.vibe || 0;
        const isLiked = !!userLikedPosts[post.id];
        const btnStyle = isLiked 
          ? "bg-[#CCFF00] text-black" 
          : "bg-transparent text-[#CCFF00]";

        html = `
          <div class="masonry-item bg-surface-container border-2 border-white p-6 relative shadow-[6px_6px_0px_0px_#CCFF00]">
            <div class="flex justify-between items-start mb-4">
              <span class="bg-error text-on-error font-label font-bold uppercase text-[10px] px-2 py-1 ${rotateClass} ${post.tag ? 'hidden' : ''}">CRITICAL RANT</span>
              ${post.tag ? `<span class="bg-surface-container-highest text-white border border-outline font-label font-bold uppercase text-[10px] px-2 py-1 ${rotateClass}">${post.tag}</span>` : ''}
              <span class="font-label text-xs text-on-surface-variant uppercase">${timeStr}</span>
            </div>
            <h3 class="font-headline font-black text-2xl mb-4 leading-tight">${post.title}</h3>
            ${post.content ? `<p class="text-on-surface-variant mb-6 leading-relaxed">${post.content}</p>` : ''}
            <div class="flex gap-4 pt-4 border-t-2 border-outline-variant">
              <button onclick="window.handleVibeCheck('${post.id}', this, ${vibeCount})" class="cursor-pointer transition-colors px-2 py-1 flex items-center gap-1 font-label text-xs font-bold hover:underline ${btnStyle}">
                <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">favorite</span>
                <span>VIBE CHECK (${vibeCount})</span>
              </button>
            </div>
          </div>
        `;
      } else if (post.type === 'win') {
        html = `
          <div class="masonry-item bg-[#CCFF00] border-4 border-black p-8 relative shadow-[8px_8px_0px_0px_#000000]">
            <div class="absolute -top-4 -right-2 bg-tertiary text-on-tertiary-container font-black px-4 py-2 border-2 border-black ${rotateClass} uppercase text-lg shadow-[4px_4px_0px_0px_#000000]">
              Passed!
            </div>
            <div class="flex items-center gap-3 mb-4">
              <span class="material-symbols-outlined text-black scale-150">stars</span>
              <span class="font-label font-bold uppercase text-black text-xs tracking-widest">SMALL WIN</span>
            </div>
            <h3 class="font-headline font-black text-3xl text-black mb-4 leading-none">${post.title}</h3>
            ${post.content ? `<p class="text-black mb-6 leading-relaxed">${post.content}</p>` : ''}
            <div class="flex gap-4 pt-4 border-t-2 border-black/20">
              <button class="bg-black text-[#CCFF00] font-label font-bold px-4 py-1 text-xs uppercase border-2 border-black">HYPE THEM UP</button>
            </div>
          </div>
        `;
      } else if (post.type === 'news') {
        if (post.imgSrc) {
          html = `
            <div class="masonry-item bg-surface-container-high border-2 border-secondary p-0 relative shadow-[6px_6px_0px_0px_#000000]">
              <img alt="News Image" class="w-full h-48 object-cover grayscale contrast-125 border-b-2 border-secondary" src="${post.imgSrc}" />
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <span class="bg-secondary text-on-secondary font-label font-bold uppercase text-[10px] px-2 py-1 ${rotateClass}">CAMPUS NEWS</span>
                  <span class="font-label text-xs text-on-surface-variant uppercase">${timeStr}</span>
                </div>
                <h3 class="font-headline font-black text-xl mb-3 leading-tight uppercase">${post.title}</h3>
                <p class="text-sm text-on-surface-variant mb-6 italic">${post.content}</p>
              </div>
            </div>
          `;
        } else {
          html = `
            <div class="masonry-item bg-secondary-container border-2 border-black p-6 shadow-[6px_6px_0px_0px_#000000]">
              <div class="flex items-center gap-2 mb-4">
                <span class="material-symbols-outlined text-white">campaign</span>
                <span class="font-label text-xs font-bold uppercase text-white">OFFICIAL UPDATE?</span>
              </div>
              <h3 class="font-headline font-black text-xl text-white mb-2 leading-tight uppercase">${post.title}</h3>
              <p class="text-secondary-fixed-dim font-label text-sm mb-4">${post.content}</p>
            </div>
          `;
        }
      } else if (post.type === 'poll') {
        let pollOptionsHtml = post.options.map((opt, i) => `
          <div class="flex items-center gap-3 w-full bg-white text-black p-3 border-2 border-black font-label text-sm uppercase cursor-pointer hover:bg-[#CCFF00] hover:-translate-y-1 transition-all">
            <span class="font-black bg-black text-white px-2 py-1">${String.fromCharCode(65 + i)}</span>
            ${opt}
          </div>
        `).join('');

        html = `
          <div class="masonry-item bg-[#131313] border-4 border-black p-6 relative shadow-[8px_8px_0px_0px_#CCFF00]">
            <div class="absolute -top-3 -left-3 bg-[#CCFF00] text-black font-label font-bold text-[10px] px-2 py-0.5 border-2 border-black uppercase ${rotateClass}">COMMUNITY POLL</div>
             <span class="font-label text-xs text-outline-variant uppercase absolute top-4 right-4">${timeStr}</span>
            <h3 class="font-headline font-black text-2xl text-white mb-4 mt-2 leading-tight uppercase">${post.title}</h3>
            ${post.content ? `<p class="text-on-surface-variant mb-6 leading-relaxed">${post.content}</p>` : ''}
            
            <div class="flex flex-col gap-2 mt-4 border-t-2 border-dashed border-outline-variant pt-4">
              ${pollOptionsHtml}
            </div>
            
            <p class="text-xs font-label text-outline uppercase text-center mt-4 tracking-widest">0 Votes Total</p>
          </div>
        `;
      }
      
      grid.innerHTML += html;
    });
  };

  // Initial Render
  window.renderFeed();
});
