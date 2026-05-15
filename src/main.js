import { MyRemindersView } from './views/MyReminders.js';
import { RecordReminderView } from './views/RecordReminder.js';
import { SetScheduleView } from './views/SetSchedule.js';
import { IncomingCallView } from './views/IncomingCall.js';
import { HistoryView } from './views/History.js';
import { DeleteConfirmView } from './views/DeleteConfirm.js';
import { DeletedView } from './views/Deleted.js';
import { SavedView } from './views/Saved.js';
import { SettingsView } from './views/Settings.js';
import { supabase } from './lib/supabase.js';
import { setupAvatarPicker } from './components/AvatarPicker.js';

// Global Audio Player for iOS Safari Compatibility
window.playAudioSafely = (url) => {
  const audio = new Audio();
  audio.src = url;
  audio.crossOrigin = "anonymous";
  audio.playsInline = true;
  audio.load();
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.error("Audio playback error:", error);
      alert("Playback failed. Ensure your iPhone's physical SILENT SWITCH on the side of the phone is OFF and volume is up! Error: " + error.name);
    });
  }
  return audio;
};

const routes = {
  '/': MyRemindersView,
  '/record': RecordReminderView,
  '/schedule': SetScheduleView,
  '/call': IncomingCallView,
  '/history': HistoryView,
  '/delete-confirm': DeleteConfirmView,
  '/deleted': DeletedView,
  '/saved': SavedView,
  '/settings': SettingsView,
};

const app = document.getElementById('app');

export const navigateTo = (path) => {
  window.history.pushState({}, path, window.location.origin + path);
  render();
};

const render = () => {
  const path = window.location.pathname;
  const ViewComponent = routes[path] || routes['/'];
  
  // Clear the app
  app.innerHTML = '';
  
  // Render new view
  const viewElement = ViewComponent();
  app.appendChild(viewElement);
  
  // Setup avatar picker after DOM is updated
  setTimeout(() => setupAvatarPicker(), 0);
};

window.addEventListener('popstate', render);

// Intercept link clicks for SPA routing
document.addEventListener('click', e => {
  const target = e.target.closest('a');
  if (target && target.hasAttribute('data-link')) {
    e.preventDefault();
    navigateTo(target.getAttribute('href'));
  }
});

// Run initial render
render();


// --- REMINDER DAEMON ---
const triggeredReminders = new Set(); // Prevent triggering the same reminder multiple times in a minute

const formatCurrentTime = () => {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12; // the hour '0' should be '12'
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
};

const checkReminders = async () => {
  // If we are already on the call screen, don't interrupt
  if (window.location.pathname === '/call') return;

  try {
    const { data: reminders, error } = await supabase
      .from('reminders')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;
    if (!reminders) return;

    const currentTimeString = formatCurrentTime();

    for (const reminder of reminders) {
      // Check if time matches and we haven't triggered it yet
      if (reminder.time === currentTimeString && !triggeredReminders.has(reminder.id)) {
        
        // Mark as triggered so it doesn't loop
        triggeredReminders.add(reminder.id);
        
        // Pass data via sessionStorage to the call view
        sessionStorage.setItem('currentCallData', JSON.stringify(reminder));
        
        // Route to the incoming call screen!
        navigateTo('/call');
        break; // Only trigger one at a time
      }
    }
  } catch (err) {
    console.error("Daemon error checking reminders:", err);
  }
};

// Check every 15 seconds
setInterval(checkReminders, 15000);
// Run once on boot
checkReminders();

// Clear triggered cache every hour to allow daily repeats
setInterval(() => {
  triggeredReminders.clear();
}, 60 * 60 * 1000);
