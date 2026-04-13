document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('speakout-modal');
  const triggers = document.querySelectorAll('.trigger-speakout');
  const closeBtn = document.getElementById('close-modal');
  const typeButtons = document.querySelectorAll('.type-btn');
  const pollContainer = document.getElementById('poll-container');
  const optionsList = document.getElementById('poll-options');
  const addOptionBtn = document.getElementById('add-option-btn');
  const tagSelectorContainer = document.getElementById('tag-selector-container');
  const tagButtons = document.querySelectorAll('.tag-opt-btn');

  // --- Global Vibe Check Logic ---
  window.handleVibeCheck = function(postId, buttonElement, originalCount) {
    let userLikedPosts = JSON.parse(localStorage.getItem('user_liked_posts') || '{}');
    
    // We update the data structure
    let posts = JSON.parse(localStorage.getItem('dorm_posts') || '[]');
    let targetPostIndex = posts.findIndex(p => p.id === postId);
    
    if (targetPostIndex !== -1) {
      if (!posts[targetPostIndex].metrics) posts[targetPostIndex].metrics = { vibe: originalCount };
      
      // Determine if action is Like or Unlike
      if (userLikedPosts[postId]) {
        // Unlike
        delete userLikedPosts[postId];
        posts[targetPostIndex].metrics.vibe -= 1;
        // Update styling visually
        buttonElement.classList.remove('bg-[#CCFF00]', 'text-black');
        buttonElement.classList.add('text-[#CCFF00]', 'bg-transparent');
      } else {
        // Like
        userLikedPosts[postId] = true;
        posts[targetPostIndex].metrics.vibe += 1;
        // Update styling visually
        buttonElement.classList.add('bg-[#CCFF00]', 'text-black');
        buttonElement.classList.remove('text-[#CCFF00]', 'bg-transparent');
      }
      
      // Save State
      localStorage.setItem('user_liked_posts', JSON.stringify(userLikedPosts));
      localStorage.setItem('dorm_posts', JSON.stringify(posts));
      
      // Update text visually
      const textSpan = buttonElement.querySelector('span:last-child');
      if (textSpan) {
         // Some are 'VIBE CHECK (14)', some are 'REAL TALK' 
         textSpan.textContent = `VIBE CHECK (${posts[targetPostIndex].metrics.vibe})`;
      } else {
         // Fallback if structure changes
         buttonElement.innerHTML = `<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">favorite</span> VIBE CHECK (${posts[targetPostIndex].metrics.vibe})`;
      }
    }
  };

  const resetModal = () => {
    // Reset inputs
    const inputs = modal.querySelectorAll('input:not([type="button"]), textarea');
    inputs.forEach(input => input.value = '');

    // Reset type buttons to Rant default
    typeButtons.forEach(b => {
      b.classList.remove('bg-[#CCFF00]', 'text-black', 'border-black');
      b.classList.add('bg-transparent', 'text-white', 'border-white', 'hover:bg-white', 'hover:text-black');
    });
    const rantBtn = Array.from(typeButtons).find(b => b.dataset.type === 'rant');
    if (rantBtn) {
      rantBtn.classList.remove('bg-transparent', 'text-white', 'border-white', 'hover:bg-white', 'hover:text-black');
      rantBtn.classList.add('bg-[#CCFF00]', 'text-black', 'border-black');
    }

    // Hide poll container, show tag container
    if (pollContainer) {
      pollContainer.classList.add('hidden');
      pollContainer.classList.remove('flex');
    }
    if (tagSelectorContainer) {
      tagSelectorContainer.classList.remove('hidden');
      tagSelectorContainer.classList.add('flex');
    }
    
    // Reset tags
    if (tagButtons) {
      tagButtons.forEach(b => {
        b.classList.remove('bg-[#CCFF00]', 'text-black', 'border-black');
        b.classList.add('bg-transparent', 'text-white', 'border-white');
      });
    }

    // Reset poll options back to strictly 2 inputs
    if (optionsList) {
      optionsList.innerHTML = `
        <input type="text" placeholder="Option A..." class="w-full bg-white text-black p-3 border-2 border-outline focus:border-[#CCFF00] focus:ring-0 font-label outline-none" />
        <input type="text" placeholder="Option B..." class="w-full bg-white text-black p-3 border-2 border-outline focus:border-[#CCFF00] focus:ring-0 font-label outline-none" />
      `;
    }
    
    // Show add option button
    if (addOptionBtn) {
      addOptionBtn.classList.remove('hidden');
    }
  };

  // Open / Close modal
  const toggleModal = (show) => {
    if (show) {
      modal.classList.remove('hidden');
      // small delay to allow display flex to apply before opacity transition
      setTimeout(() => {
        modal.classList.remove('opacity-0');
      }, 10);
    } else {
      modal.classList.add('opacity-0');
      setTimeout(() => {
        modal.classList.add('hidden');
        resetModal();
      }, 200); // match transition duration
    }
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleModal(true);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => toggleModal(false));

  // Close when clicking strictly on the backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      toggleModal(false);
    }
  });
  
  // Handle Tag Selection
  if (tagButtons) {
    tagButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Reset all tags
        tagButtons.forEach(b => {
          b.classList.remove('bg-[#CCFF00]', 'text-black', 'border-black');
          b.classList.add('bg-transparent', 'text-white', 'border-white');
        });
        
        // Select clicked
        e.currentTarget.classList.remove('bg-transparent', 'text-white', 'border-white');
        e.currentTarget.classList.add('bg-[#CCFF00]', 'text-black', 'border-black');
      });
    });
  }

  // Handle Post Type switches
  typeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Reset all buttons
      typeButtons.forEach(b => {
        b.classList.remove('bg-[#CCFF00]', 'text-black', 'border-black');
        b.classList.add('bg-transparent', 'text-white', 'border-white', 'hover:bg-white', 'hover:text-black');
      });

      // Set active state on clicked button
      const clickedBtn = e.currentTarget;
      clickedBtn.classList.remove('bg-transparent', 'text-white', 'border-white', 'hover:bg-white', 'hover:text-black');
      clickedBtn.classList.add('bg-[#CCFF00]', 'text-black', 'border-black');
      
      const type = clickedBtn.dataset.type;

      // Toggle Poll UI vs Tag UI
      if (type === 'poll') {
        if (pollContainer) { pollContainer.classList.remove('hidden'); pollContainer.classList.add('flex'); }
        if (tagSelectorContainer) { tagSelectorContainer.classList.add('hidden'); tagSelectorContainer.classList.remove('flex'); }
      } else if (type === 'rant') {
        if (pollContainer) { pollContainer.classList.add('hidden'); pollContainer.classList.remove('flex'); }
        if (tagSelectorContainer) { tagSelectorContainer.classList.remove('hidden'); tagSelectorContainer.classList.add('flex'); }
      } else {
        // News / Win
        if (pollContainer) { pollContainer.classList.add('hidden'); pollContainer.classList.remove('flex'); }
        if (tagSelectorContainer) { tagSelectorContainer.classList.add('hidden'); tagSelectorContainer.classList.remove('flex'); }
      }
    });
  });

  // Handle Adding Poll Options
  if (addOptionBtn) {
    addOptionBtn.addEventListener('click', () => {
      if (!optionsList) return;
      const currentOptions = optionsList.querySelectorAll('input').length;
      if (currentOptions < 4) {
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.placeholder = `Option ${String.fromCharCode(65 + currentOptions)}...`;
        newOption.className = 'w-full bg-white text-black p-3 border-2 border-outline focus:border-[#CCFF00] focus:ring-0 font-label outline-none';
        
        optionsList.appendChild(newOption);

        if (currentOptions + 1 >= 4) {
          addOptionBtn.classList.add('hidden');
        }
      }
    });
  }

  // Handle Post Record
  const postBtn = Array.from(modal.querySelectorAll('button')).find(b => b.textContent && b.textContent.trim() === 'POST RECORD');
  if (postBtn) {
    postBtn.addEventListener('click', () => {
      // Get title and content
      const titleEl = modal.querySelector('input[type="text"]');
      const contentEl = modal.querySelector('textarea');
      const titleInput = titleEl ? titleEl.value.trim() : '';
      const contentInput = contentEl ? contentEl.value.trim() : '';
      
      if (!titleInput) {
        alert("Please enter a title/topic.");
        return;
      }

      // Get type
      const activeBtn = Array.from(typeButtons).find(b => b.classList.contains('bg-[#CCFF00]'));
      const postType = activeBtn ? activeBtn.dataset.type : 'rant';

      // Get tag
      let selectedTag = '';
      if (postType === 'rant') {
         const activeTagBtn = Array.from(tagButtons).find(b => b.classList.contains('bg-[#CCFF00]'));
         if (activeTagBtn) {
           selectedTag = activeTagBtn.dataset.tag;
         }
      }

      // Get poll options if applicable
      const pollOptions = [];
      if (postType === 'poll') {
        const optionInputs = optionsList ? optionsList.querySelectorAll('input') : [];
        optionInputs.forEach(input => {
          if (input.value.trim()) {
            pollOptions.push(input.value.trim());
          }
        });
        if (pollOptions.length < 2) {
          alert("A poll needs at least two options.");
          return;
        }
      }

      // Create new record
      const record = {
        id: 'post_' + Math.random().toString(36).substr(2, 9),
        type: postType,
        title: titleInput,
        content: contentInput,
        tag: selectedTag,
        options: pollOptions,
        metrics: { vibe: 0, talk: 0, real: 0 },
        timestamp: Date.now()
      };

      // Save to localStorage
      const savedPosts = JSON.parse(localStorage.getItem('dorm_posts') || '[]');
      savedPosts.unshift(record); // put at start
      localStorage.setItem('dorm_posts', JSON.stringify(savedPosts));

      // Close Modal array
      toggleModal(false);

      // Render or Redirect
      if (window.renderRantFeed && window.location.pathname.includes('rant.html')) {
        window.renderRantFeed(); // We are compiling rant rendering
      } else if (window.renderFeed && window.location.pathname.includes('index.html')) {
        window.renderFeed(); // If we are on index.html, update grid instantly
      } else {
        // Redirect to wherever makes sense. For rant posts, maybe rant.html?
        if (postType === 'rant') {
          window.location.href = 'rant.html';
        } else {
          window.location.href = 'index.html';
        }
      }
    });
  }
});
