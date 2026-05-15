import { BottomNav } from '../components/BottomNav.js';
import { supabase } from '../lib/supabase.js';

export const MyRemindersView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-surface min-h-screen pb-32";
  
  container.innerHTML = `
    <!-- Top App Bar -->
    <header class="bg-background dark:bg-surface-dim flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <div class="flex items-center gap-4">
        <button class="hover:scale-105 transition-transform duration-300 ease-out active:scale-95 transition-all duration-200" onclick="import('../main.js').then(module => module.navigateTo('/settings'))">
          <span class="material-symbols-outlined text-primary dark:text-primary-fixed-dim">settings</span>
        </button>
        <h1 class="font-headline text-lg font-bold text-primary dark:text-primary-fixed-dim tracking-tight">EchoJoy</h1>
      </div>
      <div class="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border-2 border-primary hover:scale-105 transition-transform duration-300 ease-out cursor-pointer shadow-[0_4px_12px_rgba(224,64,160,0.2)]">
        <img alt="User Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpjHqiADKBQKWNiT2zqFAoSpvND6UN_4fSomn5_Vxt773JaEVVvR8TuGWuOYR7HKk2aE5KP4MnRSeEOLUkkTlmDZHBWkkRi5pJp7RL4aQs-wBn-gcj8BeNeVhKk6HTwibfsgXE4rLT3OussEpcRt6zayH0Nnghacmmm3GensK9nA2_wATbWusNCXDqyCPUbab8C_2xidZOr0aCNgtD0NCPGOwG4YrsUxiFbWlUpUQrDAtsxCauC53Z4RJSNcmKrPnvzc38IvI02UM"/>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="pt-24 px-6 max-w-2xl mx-auto">
      <div class="mb-8">
        <h2 class="text-3xl font-black text-on-surface mb-2">Upcoming Voices</h2>
        <p class="text-on-surface-variant font-medium">Your schedule for a joyful day</p>
      </div>
      
      <!-- Reminder List Container -->
      <div id="reminders-list" class="grid gap-6">
        <div class="flex justify-center p-8">
           <span class="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
        </div>
      </div>

      <!-- Illustrative Card -->
      <div class="mt-8 p-8 rounded-lg bg-primary-container/20 border-2 border-dashed border-primary/30 flex flex-col items-center text-center gap-4">
        <img class="w-32 h-32" data-alt="A whimsical digital 3D illustration of a floating pink and purple magic wand surrounded by sparkling gold stars and soft pastel clouds." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDES0z8EDpD3Vby62U5qpUL8WPFpSMndxpzA0UuE8XhBBMI4ERC_i8ka70GGBb9cBQGKbd9mqlb_2emPZIQcPxmdhNbmv3hJi05XJlBXBtrl8wfXAjmxBc2NpZDLVmDu1XqpYzWffc8n1VwpaYJl-WXTawSyGaoYzU74BWFNrXuQQTZ5vjqt9o-y3prbT1UmXuZqeT1KPMOsSQZcQG-h9jg719J90vMqGZwqyWIBNVaNcoRy5Nt1G0swNKB24-WwHE-rISqCJ9ll3Q"/>
        <div>
          <h4 class="text-lg font-bold text-on-primary-container">Capture more joy!</h4>
          <p class="text-sm text-on-surface-variant px-4">Recording daily affirmations increases positive outlook by 40%.</p>
        </div>
        <a href="/record" data-link class="bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-[0_4px_16px_rgba(224,64,160,0.3)] hover:scale-105 active:scale-95 transition-all inline-block">
          Add New Voice
        </a>
      </div>
    </main>
    
    ${BottomNav('reminders')}
  `;

  // Fetch from Supabase
  const loadReminders = async () => {
    const listEl = container.querySelector('#reminders-list');
    try {
      const { data, error } = await supabase
        .from('reminders')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        listEl.innerHTML = `
          <div class="text-center p-8 bg-surface-container rounded-lg">
            <p class="text-on-surface-variant">No reminders yet. Create your first one!</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = data.map((reminder, index) => {
        // Alternate colors for aesthetic
        const colors = ['primary', 'secondary', 'tertiary'];
        const color = colors[index % colors.length];

        return `
          <div class="bouncy-hover cursor-pointer bg-surface-container-lowest p-6 rounded-lg shadow-[0_8px_24px_rgba(224,64,160,0.12)] flex items-center gap-5 border-l-8 border-${color} relative overflow-hidden" onclick="window.location.href='/call'">
            <div class="absolute top-0 right-0 w-24 h-24 bg-${color}/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            <button class="w-14 h-14 rounded-full bg-${color} text-on-${color} flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:scale-110 active:scale-95 transition-all" onclick="event.stopPropagation(); const audio = new Audio('${reminder.audio_url}'); audio.play();">
              <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">play_arrow</span>
            </button>
            <div class="flex-1">
              <p class="text-xs font-bold text-${color} uppercase tracking-wider mb-1">${reminder.days} at ${reminder.time}</p>
              <h3 class="text-xl font-bold text-on-surface">${reminder.caller_name || reminder.title}</h3>
              <div class="flex items-center gap-2 mt-2">
                <span class="w-2 h-2 rounded-full bg-${color}"></span>
                <span class="text-sm text-on-surface-variant">${reminder.caller_name && reminder.caller_name !== reminder.title ? reminder.title + ' • ' : ''}Voice Recording</span>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <button class="w-10 h-10 rounded-full bg-surface-container hover:bg-primary-container text-primary hover:text-on-primary-container flex items-center justify-center transition-all" onclick="event.stopPropagation(); window.location.href='/schedule?edit=${reminder.id}'">
                <span class="material-symbols-outlined text-xl">edit</span>
              </button>
              <button class="w-10 h-10 rounded-full bg-surface-container hover:bg-error text-error hover:text-on-error flex items-center justify-center transition-all delete-btn" data-id="${reminder.id}">
                <span class="material-symbols-outlined text-xl">delete</span>
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Add routing for onclick elements inside the dynamically generated HTML
      const linkElements = listEl.querySelectorAll('.bouncy-hover[onclick]');
      linkElements.forEach(el => {
        el.removeAttribute('onclick');
        el.addEventListener('click', (e) => {
          e.preventDefault();
          // We don't route to '/call' randomly when clicking the card. Let's make it do nothing or play audio
        });
      });

      // Edit buttons routing
      const editBtns = listEl.querySelectorAll('button[onclick^="event.stopPropagation(); window.location.href="]');
      editBtns.forEach(btn => {
        const id = btn.getAttribute('onclick').match(/'\/schedule\?edit=(.*)'/)[1];
        btn.removeAttribute('onclick');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          import('../main.js').then(module => module.navigateTo('/schedule?edit=' + id));
        });
      });

      // Delete buttons
      const deleteBtns = listEl.querySelectorAll('.delete-btn');
      deleteBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const id = btn.getAttribute('data-id');
          // Navigate to a new Delete Confirmation view or show alert. 
          // Since the user asked for the delete confirmation page design, we will navigate to it.
          import('../main.js').then(module => module.navigateTo('/delete-confirm?id=' + id));
        });
      });

    } catch (err) {
      console.error('Error fetching reminders:', err);
      listEl.innerHTML = `
        <div class="text-center p-8 bg-error-container text-on-error-container rounded-lg">
          <p>Failed to load reminders. Please try again.</p>
        </div>
      `;
    }
  };

  loadReminders();

  return container;
};
