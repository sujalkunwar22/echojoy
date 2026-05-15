import { BottomNav } from '../components/BottomNav.js';
import { supabase } from '../lib/supabase.js';

export const DeleteConfirmView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen flex flex-col";

  // Parse ID from query params
  const urlParams = new URLSearchParams(window.location.search);
  const reminderId = urlParams.get('id');

  container.innerHTML = `
    <!-- TopAppBar -->
    <header class="bg-background flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <div class="flex items-center gap-4">
        <button id="back-btn" class="hover:scale-105 transition-transform duration-300 ease-out active:scale-95 text-primary">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 class="font-headline text-lg font-bold text-primary tracking-tight">EchoJoy</h1>
      </div>
      <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed hover:scale-105 transition-transform duration-300 ease-out cursor-pointer shadow-md shadow-primary/20">
        <img alt="User profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAjxo8Y_4MPnI9k3Hfc_ak24iL3Qe9rNDcgTC9mzJrjYcHMxbf0cmurdSKvdb3NdrRGjU06aVBnb7wkmpqkFnIlSXr3B94YLrNooUYLPDk4y_AFRXNN6_IHoWs-GKOFjYY_LHZpC-t_k4XNvDRzRK9u8iyxxP6QQTgV_LGEEAH74qxVs5kpouVxxgoEEbAnaAUfX5qbQJY__v5MK7I-qNLenSIasDCmYXtm7-c_TeVGA8r4mHnCC58aBh2A7P9zvuCp8xs09l0DCc"/>
      </div>
    </header>

    <!-- Main Canvas -->
    <main class="flex-grow flex items-center justify-center px-6 pt-24 pb-32">
      <div class="max-w-md w-full relative">
        <div class="absolute -top-12 -left-12 w-48 h-48 bg-primary-fixed/40 rounded-full blur-3xl -z-10"></div>
        <div class="absolute -bottom-12 -right-12 w-48 h-48 bg-tertiary-fixed/40 rounded-full blur-3xl -z-10"></div>
        
        <div class="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_50px_rgba(224,64,160,0.1)] border border-surface-container-high text-center">
          <div class="mb-6 relative inline-block">
            <div class="w-24 h-24 bg-primary-fixed rounded-full flex items-center justify-center shadow-lg shadow-primary/10">
              <span class="material-symbols-outlined text-primary text-5xl" style="font-variation-settings: 'FILL' 0;">mic</span>
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-md shadow-secondary/30">
              <span class="material-symbols-outlined text-white text-xl">water_drop</span>
            </div>
          </div>
          
          <h2 class="font-headline text-3xl font-extrabold text-on-background mb-3 tracking-tight">Let it go?</h2>
          <p class="text-on-surface-variant leading-relaxed mb-10 text-lg">
            This voice will be lost in the echo. <br class="hidden sm:block"/> Are you sure?
          </p>
          
          <div class="flex flex-col gap-4">
            <button id="keep-btn" class="bg-primary text-on-primary font-bold py-4 px-8 rounded-full shadow-[0_8px_20px_rgba(224,64,160,0.3)] hover:scale-[1.03] transition-all duration-300 ease-out active:scale-95 text-lg">
              Keep It
            </button>
            <button id="delete-btn" class="bg-transparent text-secondary font-medium py-3 px-8 rounded-full border-2 border-secondary/20 hover:bg-secondary/5 hover:border-secondary/40 transition-all duration-300 ease-out active:scale-95 text-base">
              Delete
            </button>
          </div>
        </div>
        
        <div id="reminder-info" class="mt-4 grid grid-cols-2 gap-4 hidden">
          <div class="bg-surface-container-low p-4 rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined text-tertiary">timer</span>
            <div class="text-left">
              <p class="text-[10px] uppercase font-bold text-outline tracking-wider">Time</p>
              <p id="info-time" class="text-sm font-bold text-on-surface">--:--</p>
            </div>
          </div>
          <div class="bg-surface-container-low p-4 rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined text-secondary">calendar_today</span>
            <div class="text-left">
              <p class="text-[10px] uppercase font-bold text-outline tracking-wider">Days</p>
              <p id="info-days" class="text-sm font-bold text-on-surface">---</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    ${BottomNav('reminders')}
  `;

  // Fetch info
  if (reminderId) {
    supabase.from('reminders').select('*').eq('id', reminderId).single().then(({ data, error }) => {
      if (!error && data) {
        container.querySelector('#info-time').textContent = data.time;
        container.querySelector('#info-days').textContent = data.days;
        container.querySelector('#reminder-info').classList.remove('hidden');
      }
    });
  }

  container.querySelector('#back-btn').addEventListener('click', () => {
    window.history.back();
  });

  container.querySelector('#keep-btn').addEventListener('click', () => {
    import('../main.js').then(module => module.navigateTo('/'));
  });

  container.querySelector('#delete-btn').addEventListener('click', async () => {
    if (!reminderId) return;
    try {
      const { error } = await supabase
        .from('reminders')
        .update({ is_active: false })
        .eq('id', reminderId);
        
      if (error) throw error;
      import('../main.js').then(module => module.navigateTo('/deleted'));
    } catch (err) {
      console.error(err);
      alert('Failed to delete. Please try again.');
    }
  });

  return container;
};
