export const SavedView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen overflow-hidden relative";

  container.innerHTML = `
    <!-- Overlay / Modal style (Full screen) -->
    <div class="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-on-background/40 backdrop-blur-md">
      <!-- Success Modal -->
      <div class="relative bg-surface rounded-xl w-full max-w-sm overflow-hidden shadow-[0_20px_50px_rgba(224,64,160,0.3)] border-4 border-primary-container p-8 text-center flex flex-col items-center">
        <!-- Confetti/Decorative Elements -->
        <div class="absolute top-4 left-4 w-4 h-4 rounded-full bg-tertiary/40"></div>
        <div class="absolute top-12 right-8 w-6 h-6 rounded-lg rotate-12 bg-secondary/30"></div>
        <div class="absolute bottom-20 left-10 w-8 h-2 rounded-full bg-primary/20 rotate-45"></div>
        
        <!-- Joyful Icon Container -->
        <div class="w-32 h-32 mb-8 relative flex items-center justify-center">
          <div class="absolute inset-0 bg-primary-fixed rounded-full animate-pulse opacity-50"></div>
          <div class="relative z-10 w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(224,64,160,0.4)] border-b-8 border-on-primary-fixed-variant">
            <span class="material-symbols-outlined text-6xl" style="font-variation-settings: 'FILL' 1;">music_note</span>
          </div>
          <div class="absolute -bottom-1 -right-1 w-10 h-10 bg-tertiary rounded-full flex items-center justify-center border-4 border-surface shadow-md">
            <span class="material-symbols-outlined text-white text-xl font-bold">check</span>
          </div>
        </div>
        
        <!-- Messaging -->
        <h1 class="text-3xl font-black text-on-background tracking-tight mb-2">Reminder Set!</h1>
        <p class="text-on-surface-variant font-medium text-lg leading-relaxed mb-10">Your future self will thank you for being so organized!</p>
        
        <!-- Action Button -->
        <button id="sweet-btn" class="w-full py-4 bg-primary text-white font-bold text-xl rounded-full shadow-[0_8px_0px_#a02070] active:translate-y-1 active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 hover:scale-105">
          Sweet!
          <span class="material-symbols-outlined">celebration</span>
        </button>
        
        <!-- Fun Visual Background Image -->
        <div class="mt-8 w-full h-32 rounded-lg overflow-hidden relative border-2 border-surface-variant">
          <img class="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXv5xO0UjjjkrwCNFnYC2VeCUn6-7x4owPU-1vZkNc05p7-MfF2UXriHXg6If3HE01fm8F4N8pPqd7nOUlIzwWte0fRP5X8DSlHO42mVBQu_bY89cP-5nqx2_uvYvNwhp2kxNLxXVsOaibeWaFnZezS0xNC11V4Rj47n2fSkR_Pyt5e7ydsEprFcxrwxih5mx-06UePGMpmjbtGQR8ZdxlEsY9Irq3-U47BQdRQPV_qoTY_caAMRByXNwzmHZp25-LTjpKzlQElHI"/>
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#sweet-btn').addEventListener('click', () => {
    import('../main.js').then(module => module.navigateTo('/'));
  });

  return container;
};
