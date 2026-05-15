import { BottomNav } from '../components/BottomNav.js';
import { supabase } from '../lib/supabase.js';

export const HistoryView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen pb-32";
  
  container.innerHTML = `
    <!-- Top App Bar -->
    <header class="bg-background dark:bg-surface-dim flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <div class="hover:scale-105 transition-transform duration-300 ease-out active:scale-95 transition-all duration-200">
        <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">settings</span>
      </div>
      <h1 class="font-headline text-lg font-bold text-primary dark:text-primary-fixed-dim text-2xl font-black text-primary dark:text-primary-fixed tracking-tight">EchoJoy</h1>
      <div class="hover:scale-105 transition-transform duration-300 ease-out active:scale-95 transition-all duration-200">
        <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border-2 border-primary">
          <img alt="User profile photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_DYr0lpBIMNRni1w6aMonTWFCjcNs2Sn4CV18k4GUH3WuU3DH2nv8b6TiMsdYBpwZfL51z9wvbjgu0SIpSbkKfvn9EV_NDvNb14f1E77uaBeDZHOUwtM9IC06dx2vLIDmBpSB9NURLbb3C7u47BBccGzs-cIa5GV2u08QJTfQ3VIkkI9-Sofqvz188PpsIz54g0RHDYF9ji_GlIOWyq61YZ9HKI5uSp8ROhdAmUrA8bjiJxNruGwsY_VbHcRu1nhay-nNYfs-1ws"/>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="pt-24 px-6 max-w-2xl mx-auto">
      <!-- Header Section -->
      <section class="mb-8">
        <h2 class="text-3xl font-black text-on-background tracking-tight mb-2">Past Voices</h2>
        <p class="text-on-surface-variant font-medium">Relisten to your moments of joy and mindfulness.</p>
      </section>
      
      <!-- Reminder List Container -->
      <div id="history-list" class="grid grid-cols-1 gap-6">
        <div class="flex justify-center p-8">
           <span class="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
        </div>
      </div>
    </main>
    
    ${BottomNav('history')}
  `;

  // Fetch from Supabase
  const loadHistory = async () => {
    const listEl = container.querySelector('#history-list');
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('is_active', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        listEl.innerHTML = `
          <div class="text-center p-8 bg-surface-container rounded-lg">
            <p class="text-on-surface-variant">No history yet. Deleted reminders will appear here.</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = data.map((reminder, index) => {
        const colors = ['primary', 'secondary', 'tertiary'];
        const color = colors[index % colors.length];

        return `
          <div class="bg-surface-container-lowest rounded-lg p-5 shadow-[0_4px_16px_rgba(124,82,170,0.15)] flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300 ease-out border border-${color}-fixed">
            <div class="w-12 h-12 bg-${color}-fixed rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-${color}" style="font-variation-settings: 'FILL' 1;">history</span>
            </div>
            <div class="flex-grow">
              <h3 class="font-bold text-on-background">${reminder.caller_name || reminder.title}</h3>
              <p class="text-xs text-on-surface-variant">${reminder.time} &bull; ${reminder.days}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="w-2 h-2 rounded-full bg-${color}"></span>
                <span class="text-[10px] font-bold text-${color} uppercase">Archived</span>
              </div>
            </div>
            <button class="w-10 h-10 bg-${color} text-on-${color} rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all" onclick="event.stopPropagation(); const audio = new Audio('${reminder.audio_url}'); audio.play();">
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </button>
          </div>
        `;
      }).join('');

    } catch (err) {
      console.error('Error fetching history:', err);
      listEl.innerHTML = `
        <div class="text-center p-8 bg-error-container text-on-error-container rounded-lg">
          <p>Failed to load history. Please try again.</p>
        </div>
      `;
    }
  };

  loadHistory();

  return container;
};
