export const AVATARS = [
  "https://lh3.googleusercontent.com/aida/ADBb0ug9oeLOVtkzXb2dvmmTkhVP8iO67URlxOaLE55cKci6U6l5Tt56hZNepgsTeL6j_f_zRsFSbU1Zzd1AWt7-Nc4rzIumxA-92pfaZPWJFevv7fMGaS_Y9r38EEIO-OOvFvlIUcw3iYdsInCsN6ngwZThIbNqjyA2hoFGt75eO6VbkmBK5iqMdNyoKfiQAz9lwo8t0qS_hDGkLnUXYfxybNBbYretchmTFT7ze1MgduP6mrcjzB5NO6T9zKI",
  "https://lh3.googleusercontent.com/aida/ADBb0ugc0XmL58lDIXQxKmOqVSewSgK7ozvYth_44UaE_YgOnxjPJ5Yqk7GKM_vk1ToIZtBQdEnJApDIn4GiYaLs7YcQuQF0Xf6cUIduJ82uik4sq87Lx6vnFQhHwyjf13gxJQXwp62h2E8W6KWzJSAD3zQE1blrn1c9APueRhJk4I2nLOp3GJmCQWaHaddiLflHgfwoA804xhEnOG5Z9DMbmEAu1Skm1MBrjZnq-NB-rQFdtmGnRiHfVP0qyzM",
  "https://lh3.googleusercontent.com/aida/ADBb0uhdz-iHTMyFLDSCelj1JDl9E5YeTi3JrsROcRv3Lt8qqcQnqcbubzwoT6cvzceQnKQWNcUJYAfY7TPd2uuZXuL7q1h7iLAs_vot4WSrR3-rbhfa58yOiFPCGO-8pdBKZeaLQm3nwOoWjv7qZssxnoRRYrybkrQ-2-mh5xMmxcG6Cp8KKiq4J6PGZpCWUDQEs_l4BWXfZvU3QJTcldP4mFpByw9ovDb3GyospZ3xk2PKRmqHyOGj8DsbbZs",
  "https://lh3.googleusercontent.com/aida/ADBb0ugiOMejL1K74Bi2OwDA48LDHpnx68rbJBYNf9dAHBtXuQd19nwtu_xIGDm1xVnQaBs6nU23BCgYxsYgsGR9j3zpknhmaiFk61W2lY2XGVJswgihpQ6_n8AlQtWJLby0b4dhPFGBDDnnQEfTWWdOqrM_zuT7ZR97OAvJNpV7fML4H4SP0s6YG_s_nE_asN9bh6P01k_wXf4Kr2_1VQK-5CLPtaREjqegO_IVRw975FU-MM-kZIPfabBaK5U",
  "https://lh3.googleusercontent.com/aida/ADBb0uiLgXlRAiqY9Z79TP0zqXODsxSEo85LoO4jjFyBc4XepU4F07F8TW1a9TTjRm10BrWtR8yhgkkSOo79mkYXkVkAkE0exCXnZklcb4zj9bpBbC4d77GQ9rgpzeYgGJ961Zl9HN-J0YyFNKzZx64JorkY2ppxYCuHqOyX4R-w3x0r91n576Ml3OiWGIO0e90kXFsirSJOkRmw7fVd-zeq55fJNXEqKjvDFxtmtt2bajpQeQxw3oiD5vHLA4k"
];

export const getSavedAvatar = () => {
  return localStorage.getItem('echojoy_avatar') || AVATARS[0];
};

export const setupAvatarPicker = () => {
  // Update all profile images on screen to the saved one
  const updateImages = () => {
    const currentAvatar = getSavedAvatar();
    document.querySelectorAll('img[alt*="Profile"], img[alt*="profile"]').forEach(img => {
      img.src = currentAvatar;
    });
  };

  updateImages();

  // Find the profile container
  const profileImgs = document.querySelectorAll('img[alt*="Profile"], img[alt*="profile"]');
  profileImgs.forEach(img => {
    const btn = img.closest('div.rounded-full');
    if (!btn) return;
    
    // Remove old listener if any to prevent duplicates
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    
    newBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPickerModal();
    });
  });
};

const showPickerModal = () => {
  if (document.getElementById('avatar-picker-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'avatar-picker-modal';
  modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-surface/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]";
  
  const currentSaved = getSavedAvatar();
  
  const avatarGrid = AVATARS.map((url, i) => `
    <div class="relative group cursor-pointer" data-index="${i}">
      <div class="w-16 h-16 rounded-full overflow-hidden border-4 ${url === currentSaved ? 'border-primary shadow-lg scale-110' : 'border-transparent hover:border-primary/50'} transition-all">
        <img src="${url}" class="w-full h-full object-cover pointer-events-none" />
      </div>
      ${url === currentSaved ? '<div class="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-6 h-6 flex items-center justify-center border-2 border-surface"><span class="material-symbols-outlined text-sm">check</span></div>' : ''}
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="bg-surface-container-lowest p-8 rounded-2xl w-full max-w-sm shadow-[0_16px_40px_rgba(224,64,160,0.15)] animate-[slideUp_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-on-surface">Choose Avatar</h3>
        <button id="close-picker" class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-variant transition-colors text-on-surface-variant">
          <span class="material-symbols-outlined text-xl">close</span>
        </button>
      </div>
      <div class="grid grid-cols-3 gap-4 place-items-center mb-6">
        ${avatarGrid}
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#close-picker').addEventListener('click', () => {
    modal.remove();
  });

  // Handle outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  // Handle avatar selection
  modal.querySelectorAll('[data-index]').forEach(el => {
    el.addEventListener('click', () => {
      const idx = el.getAttribute('data-index');
      localStorage.setItem('echojoy_avatar', AVATARS[idx]);
      setupAvatarPicker(); // Update images
      modal.remove();
    });
  });
};

// Add basic animations if not exists
if (!document.getElementById('picker-styles')) {
  const style = document.createElement('style');
  style.id = 'picker-styles';
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;
  document.head.appendChild(style);
}
