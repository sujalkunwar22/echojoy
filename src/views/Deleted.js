export const DeletedView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen flex flex-col";

  container.innerHTML = `
    <!-- TopAppBar -->
    <header class="bg-background dark:bg-surface-dim flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <div class="flex items-center gap-4">
        <button class="text-primary dark:text-primary-fixed-dim hover:scale-105 transition-transform duration-300 ease-out active:scale-95" id="back-settings">
          <span class="material-symbols-outlined">settings</span>
        </button>
      </div>
      <h1 class="text-2xl font-black text-primary dark:text-primary-fixed tracking-tight font-headline">EchoJoy</h1>
      <div class="flex items-center">
        <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed hover:scale-105 transition-transform duration-300 ease-out cursor-pointer active:scale-95">
          <img alt="User profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9eRKVCCcOtbT6m00ttJPXLnWsBnuu5kHn_W_1Sd2wqNyhpZBey9QhtjzWsXBxU8ZdTK2pJe7zZHsHiTP4zWusrwhYl5ok6HCyuGHZZmcFIzmEP7e14wdVE3OXV3HMZI8SsJxw9fuVlKsmSQWjweKuyRts0XYAlpsexCii9aBl8Bmu91H6NwgUT5Bi1PMdf9SohokU14Jmo9HPE1-7-wIFMaPxmfLUqaBLOI-2Hn4K8EhAXk_awVKIMtSXDTj3xyY37-qliUp6CjE"/>
        </div>
      </div>
    </header>

    <!-- Main Canvas: Success Message Section -->
    <main class="flex-grow flex items-center justify-center px-6 pt-24 pb-32">
      <div class="max-w-md w-full text-center space-y-8 bg-surface-container-low p-10 rounded-xl shadow-[0_8px_32px_rgba(224,64,160,0.1)] relative overflow-hidden">
        <!-- Abstract Background Shapes -->
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-secondary-fixed-dim opacity-20 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-8 -left-8 w-24 h-24 bg-tertiary-fixed-dim opacity-30 rounded-full blur-xl"></div>
        
        <!-- Success Visual -->
        <div class="relative inline-block">
          <div class="w-32 h-32 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_4px_20px_rgba(224,64,160,0.2)]">
            <span class="material-symbols-outlined text-primary text-6xl" style="font-variation-settings: 'FILL' 1;">cloud_done</span>
          </div>
          <span class="material-symbols-outlined absolute -top-2 -right-2 text-tertiary text-2xl animate-pulse">auto_awesome</span>
          <span class="material-symbols-outlined absolute bottom-4 -left-4 text-secondary text-xl">colors_spark</span>
        </div>
        
        <!-- Text Content -->
        <div class="space-y-3 relative z-10">
          <h2 class="text-3xl font-black text-on-surface tracking-tight font-display">Gone with the Wind!</h2>
          <p class="text-on-surface-variant font-medium text-lg leading-relaxed">
            Reminder successfully removed. Your schedule is now as light as a feather!
          </p>
        </div>
        
        <!-- Action Button -->
        <div class="pt-6 relative z-10">
          <button id="home-btn" class="bg-primary text-on-primary font-bold text-lg px-10 py-4 rounded-full shadow-[0_4px_16px_rgba(224,64,160,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto w-full md:w-auto">
            <span class="material-symbols-outlined">home</span>
            Back to Home
          </button>
        </div>
        
        <!-- Decorative Asset -->
        <div class="mt-8 rounded-lg overflow-hidden border-4 border-surface-container-high shadow-inner">
          <img alt="Playful scenery" class="w-full h-40 object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLQujeJucPvSDtW2Xy-xtceVtxHN5pFujRlarIFzJmfaKQPTVInWUcg76PN2JegwNCbLO5WCCm7o2pdyryEbOiM_7WASRwEICj87eTK4xX0U8UyKhq_j1ZnKBeuEVFETKBzvCE9bEPDCqF3CH1jzEqasK-FGt2BeIcD9262POoFxVvjrWkK6aO6PGP7IEc0i2papxOIkwD6xhqPYDnSTUUcqYQuwo1DYeFJiUUfXk2MQIRhZQ2ZEEVDp0M_-MgU3qHSiDHAt-sMGc"/>
        </div>
      </div>
    </main>
  `;

  container.querySelector('#home-btn').addEventListener('click', () => {
    import('../main.js').then(module => module.navigateTo('/'));
  });

  return container;
};
