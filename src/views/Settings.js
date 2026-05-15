export const SettingsView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-surface min-h-screen pb-32 flex flex-col";
  
  const ringtones = [
    { name: 'Classic Phone', url: 'https://actions.google.com/sounds/v1/alarms/phone_ringing.ogg' },
    { name: 'Digital Watch', url: 'https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg' },
    { name: 'Spaceship Chime', url: 'https://actions.google.com/sounds/v1/alarms/spaceship_alarm.ogg' },
    { name: 'Bugle Tune', url: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg' },
    { name: 'Double Beep', url: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg' }
  ];

  const currentRingtone = localStorage.getItem('echojoy_ringtone') || ringtones[0].url;
  let previewAudio = null;

  container.innerHTML = `
    <!-- Top App Bar -->
    <header class="bg-background flex items-center w-full px-6 py-4 sticky top-0 z-50">
      <button id="back-btn" class="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center transition-all">
        <span class="material-symbols-outlined text-on-surface">arrow_back</span>
      </button>
      <h1 class="ml-4 font-headline text-xl font-bold text-on-surface tracking-tight">Settings</h1>
    </header>
    
    <main class="flex-1 px-6 max-w-md mx-auto w-full mt-4">
      <section class="mb-8">
        <div class="mb-4">
          <h2 class="text-primary font-bold tracking-wide uppercase text-sm">Call Settings</h2>
          <p class="text-on-surface-variant text-xs">Choose the ringtone that plays during an incoming reminder.</p>
        </div>
        
        <div class="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant">
          ${ringtones.map((ringtone, idx) => `
            <div class="ringtone-option p-4 flex items-center justify-between border-b border-outline-variant last:border-b-0 cursor-pointer hover:bg-surface-container-low transition-colors" data-url="${ringtone.url}">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full ${currentRingtone === ringtone.url ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface'} flex items-center justify-center">
                  <span class="material-symbols-outlined">${currentRingtone === ringtone.url ? 'music_note' : 'play_arrow'}</span>
                </div>
                <span class="font-medium text-on-surface text-lg">${ringtone.name}</span>
              </div>
              ${currentRingtone === ringtone.url ? '<span class="material-symbols-outlined text-primary">check_circle</span>' : ''}
            </div>
          `).join('')}
        </div>
      </section>
    </main>
  `;

  // Go back
  container.querySelector('#back-btn').addEventListener('click', () => {
    if (previewAudio) {
      previewAudio.pause();
    }
    import('../main.js').then(module => module.navigateTo('/'));
  });

  // Handle ringtone selection
  const options = container.querySelectorAll('.ringtone-option');
  options.forEach(option => {
    option.addEventListener('click', () => {
      const url = option.getAttribute('data-url');
      localStorage.setItem('echojoy_ringtone', url);
      
      // Stop old preview
      if (previewAudio) {
        previewAudio.pause();
        previewAudio.currentTime = 0;
      }
      
      // Play new preview
      previewAudio = new Audio(url);
      previewAudio.play().catch(e => console.error("Preview play failed:", e));

      // Re-render settings to show checkmark
      const newSettings = SettingsView();
      container.replaceWith(newSettings);
    });
  });

  return container;
};
