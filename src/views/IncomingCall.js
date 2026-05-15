export const IncomingCallView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen flex flex-col overflow-hidden";
  
  const callDataStr = sessionStorage.getItem('currentCallData');
  const callData = callDataStr ? JSON.parse(callDataStr) : {
    title: 'Unknown Reminder',
    audio_url: '',
    time: 'Unknown Time'
  };

  container.innerHTML = `
    <!-- Main Interaction Canvas -->
    <main class="flex-1 flex flex-col items-center justify-between py-16 px-8 bg-candy-gradient relative h-full">
      <!-- Top Header / Branding Anchor -->
      <header class="w-full flex flex-col items-center gap-2 z-10">
        <div class="flex items-center gap-2 mb-4">
          <span class="text-primary material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
          <span class="text-2xl font-black text-primary tracking-tight">EchoJoy</span>
        </div>
        <div class="bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/60 shadow-sm">
          <p class="text-secondary font-bold text-sm tracking-widest uppercase">Incoming Reminder</p>
        </div>
      </header>
      
      <!-- Caller ID / Bento-ish Central Visual -->
      <section class="flex flex-col items-center gap-8 w-full max-w-md z-10">
        <div class="relative group mt-8">
          <!-- Pulse effect circles -->
          <div class="absolute inset-0 bg-primary/20 rounded-full animate-ping scale-150 opacity-20" id="pulse-bg"></div>
          <div class="absolute inset-0 bg-secondary/10 rounded-full animate-pulse scale-125 opacity-30"></div>
          <!-- Profile Avatar Container -->
          <div class="relative h-48 w-48 rounded-full border-4 border-white shadow-[0_8px_32px_rgba(224,64,160,0.25)] overflow-hidden bg-surface-container-highest">
            <img alt="Voice Recording Avatar" class="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZvzX7NSl-DOw8Ft5ILoKvj7Aj0ZHRZkbLcCTEHcyaLuOXzznf3bnGJE4oQBDU8pjpbOg9L15vqWOPJhS-Fx2WL5CXeQ1ZV5Z9ufUvhfG6E3sGKmm3Qlzx6WoKkOXv56Vy7TNZeKpa3guAqyaQ-0V9uV6T4e-yv5svP_mXSQibQrRaX3oipGqFnfYctRMSsl8ICz8dciuA9R3YK8HHWTtlKrJrq_0abJfgfx_wjo-pLTIzdCrLsWko5YwnHCrFq6H3ZiCDAO9YHX4"/>
          </div>
        </div>
        <div class="text-center">
          <h1 class="text-4xl font-extrabold text-on-surface tracking-tight mb-2">${callData.caller_name || callData.title}</h1>
          <p class="text-on-surface-variant text-lg font-medium">${callData.title} &bull; ${callData.time}</p>
        </div>
        
        <!-- Context Tag -->
        <div class="bg-tertiary-container/30 text-on-tertiary-container px-4 py-1.5 rounded-full flex items-center gap-2 border border-tertiary-container/50">
          <span class="material-symbols-outlined text-lg">label</span>
          <span class="text-xs font-bold uppercase tracking-wider">Priority: High</span>
        </div>
      </section>
      
      <!-- Action Buttons Cluster -->
      <section class="w-full max-w-sm grid grid-cols-2 gap-12 z-10 px-4 mt-8" id="actions-section">
        <!-- Decline Button -->
        <div class="flex flex-col items-center gap-4">
          <button id="decline-btn" class="h-20 w-20 rounded-full bg-error flex items-center justify-center text-white shadow-[0_8px_24px_rgba(229,62,62,0.3)] bouncy-hover bouncy-active">
            <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'wght' 600;">call_end</span>
          </button>
          <span class="text-on-surface-variant font-bold text-sm tracking-wide">Decline</span>
        </div>
        <!-- Accept Button -->
        <div class="flex flex-col items-center gap-4">
          <button id="accept-btn" class="h-20 w-20 rounded-full bg-[#4ade80] flex items-center justify-center text-white shadow-[0_8px_24px_rgba(74,222,128,0.3)] bouncy-hover bouncy-active">
            <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'wght' 600;">play_arrow</span>
          </button>
          <span class="text-on-surface-variant font-bold text-sm tracking-wide">Accept</span>
        </div>
      </section>

      <!-- Now Playing Section (Hidden Initially) -->
      <section class="w-full max-w-sm z-10 px-4 mt-8 hidden" id="playing-section">
        <div class="grid grid-cols-3 gap-6 place-items-center mb-10 w-full max-w-xs mx-auto">
          <!-- Mute -->
          <button class="flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
             <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface">
               <span class="material-symbols-outlined text-2xl">mic_off</span>
             </div>
             <span class="text-xs font-medium text-on-surface">Mute</span>
          </button>
          <!-- Keypad -->
          <button class="flex flex-col items-center gap-2 opacity-50 cursor-not-allowed">
             <div class="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface">
               <span class="material-symbols-outlined text-2xl">dialpad</span>
             </div>
             <span class="text-xs font-medium text-on-surface">Keypad</span>
          </button>
          <!-- Speaker -->
          <button id="speaker-btn" class="flex flex-col items-center gap-2 bouncy-active">
             <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary shadow-md transition-colors" id="speaker-icon-bg">
               <span class="material-symbols-outlined text-2xl" id="speaker-icon" style="font-variation-settings: 'FILL' 1;">volume_up</span>
             </div>
             <span class="text-xs font-medium text-on-surface">Speaker</span>
          </button>
        </div>

        <div class="flex justify-center">
          <div class="flex flex-col items-center gap-4">
            <button id="end-call-btn" class="h-20 w-20 rounded-full bg-error flex items-center justify-center text-white shadow-[0_8px_24px_rgba(229,62,62,0.3)] bouncy-hover bouncy-active">
              <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'wght' 600;">call_end</span>
            </button>
            <span class="text-on-surface-variant font-bold text-sm tracking-wide">End Call</span>
          </div>
        </div>
      </section>
      
    </main>
  `;

  const declineBtn = container.querySelector('#decline-btn');
  const acceptBtn = container.querySelector('#accept-btn');
  const endCallBtn = container.querySelector('#end-call-btn');
  const actionsSection = container.querySelector('#actions-section');
  const playingSection = container.querySelector('#playing-section');
  const pulseBg = container.querySelector('#pulse-bg');
  const speakerBtn = container.querySelector('#speaker-btn');
  const speakerIconBg = container.querySelector('#speaker-icon-bg');
  const speakerIcon = container.querySelector('#speaker-icon');
  
  let audio = null;
  let isSpeakerOn = true;
  
  const ringtoneUrl = localStorage.getItem('echojoy_ringtone') || 'https://actions.google.com/sounds/v1/alarms/phone_ringing.ogg';
  const ringtoneAudio = new Audio(ringtoneUrl);
  ringtoneAudio.loop = true;
  // Try to play ringtone immediately
  ringtoneAudio.play().catch(e => console.log('Autoplay blocked:', e));

  declineBtn.addEventListener('click', () => {
    ringtoneAudio.pause();
    sessionStorage.removeItem('currentCallData');
    import('../main.js').then(module => module.navigateTo('/'));
  });

  acceptBtn.addEventListener('click', () => {
    ringtoneAudio.pause();
    if (!callData.audio_url) {
      alert("No audio found for this reminder.");
      return;
    }

    // Switch UI
    actionsSection.classList.add('hidden');
    playingSection.classList.remove('hidden');
    pulseBg.classList.replace('animate-ping', 'animate-pulse');
    pulseBg.classList.add('scale-110');

    // Play Audio
    audio = new Audio(callData.audio_url);
    audio.play();

    audio.onended = () => {
      sessionStorage.removeItem('currentCallData');
      import('../main.js').then(module => module.navigateTo('/'));
    };
  });

  endCallBtn.addEventListener('click', () => {
    ringtoneAudio.pause();
    if (audio) {
      audio.pause();
    }
    sessionStorage.removeItem('currentCallData');
    import('../main.js').then(module => module.navigateTo('/'));
  });

  speakerBtn?.addEventListener('click', () => {
    isSpeakerOn = !isSpeakerOn;
    if (isSpeakerOn) {
      speakerIconBg.classList.add('bg-white', 'text-primary', 'shadow-md');
      speakerIconBg.classList.remove('bg-surface-container-highest', 'text-on-surface');
      speakerIcon.textContent = 'volume_up';
      if (audio) audio.volume = 1.0;
    } else {
      speakerIconBg.classList.remove('bg-white', 'text-primary', 'shadow-md');
      speakerIconBg.classList.add('bg-surface-container-highest', 'text-on-surface');
      speakerIcon.textContent = 'phone_in_talk';
      // Simulate earpiece mode by drastically lowering the volume
      if (audio) audio.volume = 0.15;
    }
  });

  return container;
};
