import { supabase } from '../lib/supabase.js';

export const SetScheduleView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen flex flex-col items-center";
  
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('edit');
  
  container.innerHTML = `
    <!-- TopAppBar -->
    <header class="bg-background flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <button id="back-btn" class="material-symbols-outlined text-primary p-2 hover:bg-primary-fixed rounded-full transition-colors duration-300">
          arrow_back
        </button>
        <h1 class="font-headline text-lg font-bold text-primary">Schedule Call</h1>
      </div>
      <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
        <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB91p-w5f9Jf0RJoEd5vLSVpS_CsoS8CXbq8cFmVu9UkMLyt_eapfEAQRrJnuMZC0el2QWe7k87kuKle4VlsNqurkEKzAz9ILy1C1IDb-xuoehGlMdCpMBvGfTBr7UbzIzsNplGu7Wd5iU0Q4w-y-i3ie8ONKS6mGcOx7PJa_6z6v5Z0PXNmu3aaSh72CWktnj0NX3fDU6uNXYUnR9IoDDt_w-fCPMBrqrNWJPuGIV8EnFlQwqk083-gtfsyiTnfk_aovet0U7O278"/>
      </div>
    </header>
    
    <main class="w-full max-w-md px-6 pt-4 pb-32 flex flex-col gap-8">
      <!-- Hero Illustration -->
      <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary-container shadow-[0_8px_24px_rgba(124,82,170,0.15)] flex items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-tertiary-container/20"></div>
        <img class="w-full h-full object-cover mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmZRP3rwhnaDLmusnpN9czlkXcpHwK-2hQcSGh3nZK_rpkhA5cAQOtS0NnaegNZoCqJgGpNQQFZWNFBxEYuQU9DZQTpCyCcslBUSvPg8SOzl5Mwn--gd6_MXV_Fj9UHjAtxeqhQK87hnIf8EwRYLpPmgOTiGD-9j-pJr_lpuMFRSg9gFADW2TJPTlaetONrnpUFL0QFzp5uBLuB5Ti6nFZsjNYiVU_dtYlkxZgcKuo3vAycaGkgN-9uZxT8oIhnW18NMOA5jtxtRQ"/>
        <div class="relative z-10 flex flex-col items-center">
          <span class="material-symbols-outlined text-6xl text-primary drop-shadow-md" style="font-variation-settings: 'FILL' 1;">
            notifications_active
          </span>
        </div>
      </div>
      
      <!-- Reminder Name & Caller Inputs -->
      <section class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="font-label text-sm font-medium text-on-surface-variant ml-4 px-1">Reminder Name</label>
          <div class="relative">
            <input id="reminder-name" class="w-full h-14 px-6 bg-surface-container-low border-2 border-transparent focus:border-primary focus:ring-0 rounded-full font-body text-on-surface placeholder:text-outline transition-all duration-300 shadow-[0_4px_12px_rgba(224,64,160,0.05)]" placeholder="e.g. Morning Motivation" type="text"/>
            <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant">edit</span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-label text-sm font-medium text-on-surface-variant ml-4 px-1">Caller Name (Optional)</label>
          <div class="relative">
            <input id="caller-name" class="w-full h-14 px-6 bg-surface-container-low border-2 border-transparent focus:border-secondary focus:ring-0 rounded-full font-body text-on-surface placeholder:text-outline transition-all duration-300 shadow-[0_4px_12px_rgba(124,82,170,0.05)]" placeholder="e.g. Mom" type="text"/>
            <span class="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-outline-variant">person</span>
          </div>
        </div>
      </section>
      
      <!-- Playful Time Picker -->
      <section class="bg-surface-container rounded-lg p-8 flex flex-col items-center shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <h2 class="font-headline text-lg font-bold text-secondary mb-8">What time should I call?</h2>
        <div class="flex items-center gap-6 select-none">
          <!-- Hours -->
          <div class="flex flex-col items-center gap-2">
            <button id="hour-up" class="material-symbols-outlined text-secondary hover:bg-secondary-fixed p-2 rounded-full transition-all">expand_less</button>
            <div class="w-24 h-32 bg-white rounded-lg flex items-center justify-center shadow-[0_8px_0_#dcc8e0] border-2 border-outline-variant">
              <span id="hour-display" class="text-6xl font-black text-secondary tracking-tighter">08</span>
            </div>
            <button id="hour-down" class="material-symbols-outlined text-secondary hover:bg-secondary-fixed p-2 rounded-full transition-all">expand_more</button>
          </div>
          <div class="text-4xl font-black text-outline-variant mb-2">:</div>
          <!-- Minutes -->
          <div class="flex flex-col items-center gap-2">
            <button id="min-up" class="material-symbols-outlined text-secondary hover:bg-secondary-fixed p-2 rounded-full transition-all">expand_less</button>
            <div class="w-24 h-32 bg-white rounded-lg flex items-center justify-center shadow-[0_8px_0_#dcc8e0] border-2 border-outline-variant">
              <span id="min-display" class="text-6xl font-black text-secondary tracking-tighter">30</span>
            </div>
            <button id="min-down" class="material-symbols-outlined text-secondary hover:bg-secondary-fixed p-2 rounded-full transition-all">expand_more</button>
          </div>
          <!-- AM/PM -->
          <div class="flex flex-col gap-2 ml-2">
            <button id="am-btn" class="bg-primary text-white font-black py-3 px-4 rounded-full shadow-[0_4px_12px_rgba(224,64,160,0.3)] bouncy-hover bouncy-active text-sm">AM</button>
            <button id="pm-btn" class="bg-secondary-fixed text-on-secondary-fixed font-bold py-3 px-4 rounded-full bouncy-hover bouncy-active text-sm">PM</button>
          </div>
        </div>
      </section>
      
      <!-- Repeat Logic Bento -->
      <section class="grid grid-cols-2 gap-4">
        <div class="bg-tertiary-container/20 border-2 border-tertiary-fixed-dim rounded-lg p-5 flex flex-col gap-2 relative">
          <span class="material-symbols-outlined text-tertiary" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
          <p class="font-bold text-on-tertiary-container">Date / Days</p>
          <input id="days-input" type="text" class="text-xs w-full bg-transparent border-b border-tertiary-fixed-dim focus:outline-none focus:border-tertiary text-on-tertiary-fixed-variant" value="Every Monday, Friday" placeholder="e.g. Every Monday, Friday or 2024-05-20"/>
        </div>
        <div class="bg-secondary-container/20 border-2 border-secondary-fixed-dim rounded-lg p-5 flex flex-col gap-2 hover:scale-[1.02] transition-transform cursor-pointer">
          <span class="material-symbols-outlined text-secondary" style="font-variation-settings: 'FILL' 1;">volume_up</span>
          <p class="font-bold text-on-secondary-container">Voice</p>
          <p class="text-xs text-on-secondary-fixed-variant">My Voice</p>
        </div>
      </section>
    </main>
    
    <!-- Fixed Action Bar -->
    <div class="fixed bottom-0 left-0 w-full bg-surface-container-highest/80 backdrop-blur-md px-6 py-6 border-t-0 flex justify-center z-50">
      <button id="save-btn" class="w-full max-w-md bg-primary text-on-primary py-4 rounded-full font-black text-xl shadow-[0_8px_24px_rgba(224,64,160,0.4)] bouncy-hover bouncy-active transition-all flex items-center justify-center gap-2">
        <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">save</span>
        Save
      </button>
    </div>
  `;

  // Basic JS logic for time picker
  let hour = 8;
  let min = 30;
  let isAm = true;

  const hourDisplay = container.querySelector('#hour-display');
  const minDisplay = container.querySelector('#min-display');
  const amBtn = container.querySelector('#am-btn');
  const pmBtn = container.querySelector('#pm-btn');

  const updateDisplay = () => {
    hourDisplay.textContent = hour.toString().padStart(2, '0');
    minDisplay.textContent = min.toString().padStart(2, '0');
    if (isAm) {
      amBtn.className = "bg-primary text-white font-black py-3 px-4 rounded-full shadow-[0_4px_12px_rgba(224,64,160,0.3)] bouncy-hover bouncy-active text-sm";
      pmBtn.className = "bg-secondary-fixed text-on-secondary-fixed font-bold py-3 px-4 rounded-full bouncy-hover bouncy-active text-sm";
    } else {
      pmBtn.className = "bg-primary text-white font-black py-3 px-4 rounded-full shadow-[0_4px_12px_rgba(224,64,160,0.3)] bouncy-hover bouncy-active text-sm";
      amBtn.className = "bg-secondary-fixed text-on-secondary-fixed font-bold py-3 px-4 rounded-full bouncy-hover bouncy-active text-sm";
    }
  };

  container.querySelector('#hour-up').addEventListener('click', () => { hour = hour === 12 ? 1 : hour + 1; updateDisplay(); });
  container.querySelector('#hour-down').addEventListener('click', () => { hour = hour === 1 ? 12 : hour - 1; updateDisplay(); });
  container.querySelector('#min-up').addEventListener('click', () => { min = min === 59 ? 0 : min + 1; updateDisplay(); });
  container.querySelector('#min-down').addEventListener('click', () => { min = min === 0 ? 59 : min - 1; updateDisplay(); });
  amBtn.addEventListener('click', () => { isAm = true; updateDisplay(); });
  pmBtn.addEventListener('click', () => { isAm = false; updateDisplay(); });

  container.querySelector('#back-btn').addEventListener('click', () => {
    window.history.back();
  });

  const reminderNameInput = container.querySelector('#reminder-name');
  const callerNameInput = container.querySelector('#caller-name');
  const daysInput = container.querySelector('#days-input');
  
  if (editId) {
    supabase.from('reminders').select('*').eq('id', editId).single().then(({ data, error }) => {
      if (!error && data) {
        reminderNameInput.value = data.title;
        callerNameInput.value = data.caller_name || data.title;
        daysInput.value = data.days;
        
        // Parse time: "08:30 AM"
        const [timePart, ampmPart] = data.time.split(' ');
        let [h, m] = timePart.split(':');
        hour = parseInt(h);
        min = parseInt(m);
        isAm = ampmPart === 'AM';
        updateDisplay();
      }
    });
  }

  container.querySelector('#save-btn').addEventListener('click', async () => {
    const saveBtn = container.querySelector('#save-btn');
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<span class="material-symbols-outlined animate-spin" style="font-variation-settings: 'FILL' 1;">sync</span> Saving...`;

    const audioUrl = sessionStorage.getItem('currentAudioUrl');
    const name = reminderNameInput.value.trim() || 'My Reminder';
    const callerName = callerNameInput.value.trim() || name;
    const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${isAm ? 'AM' : 'PM'}`;
    const daysStr = daysInput.value.trim() || 'Every day';
    
    try {
      if (editId) {
        const { error } = await supabase.from('reminders').update({ 
          title: name,
          caller_name: callerName,
          time: timeString,
          days: daysStr
        }).eq('id', editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('reminders').insert([
          { 
            title: name,
            caller_name: callerName,
            time: timeString,
            audio_url: audioUrl,
            days: daysStr,
            is_active: true
          }
        ]);
        if (error) throw error;
      }
      
      sessionStorage.removeItem('currentAudioUrl');
      import('../main.js').then(module => module.navigateTo('/saved'));
    } catch (err) {
      console.error('Failed to save reminder:', err);
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">save</span> Save`;
      alert('Failed to save reminder. Please try again.');
    }
  });

  return container;
};
