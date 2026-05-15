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

// Notification Support
let swRegistration = null;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    swRegistration = reg;
  });
}

const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  }
};

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

// --- iOS Ringtone Autoplay Hack ---
window.globalRingtonePlayer = new Audio();
window.globalRingtonePlayer.loop = true;
window.globalRingtonePlayer.playsInline = true;
window.globalRingtonePlayer.style.display = 'none';
document.body.appendChild(window.globalRingtonePlayer);

document.body.addEventListener('click', () => {
  if (!window.globalRingtonePlayer.src || window.globalRingtonePlayer.src.startsWith('data:')) {
    // Play a tiny silent WAV file to unlock the audio element
    window.globalRingtonePlayer.src = 'https://assets.mixkit.co/active_storage/sfx/1358/1358-preview.mp3';
    window.globalRingtonePlayer.volume = 0;
    window.globalRingtonePlayer.play().then(() => {
      window.globalRingtonePlayer.pause();
      window.globalRingtonePlayer.volume = 1;
      console.log("Audio unlocked successfully");
    }).catch(e => console.log("Audio unlock failed:", e));
  }
}, { once: true });

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

// Re-render when app regains focus to ensure fresh data
window.addEventListener('focus', () => {
  console.log("App focused, refreshing...");
  render();
});


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
      if (reminder.time === currentTimeString && !triggeredReminders.has(reminder.id)) {
        triggeredReminders.add(reminder.id);
        sessionStorage.setItem('currentCallData', JSON.stringify(reminder));
        
        // Handle Background vs Foreground
        if (document.visibilityState === 'hidden') {
          // 1. Play Ringtone immediately (if audio was unlocked)
          // This is the best way to alert the user on iOS background
          const settings = JSON.parse(localStorage.getItem('echojoy_settings') || '{}');
          const ringtones = {
            'default': 'https://assets.mixkit.co/active_storage/sfx/1358/1358-preview.mp3',
            'digital': 'https://assets.mixkit.co/active_storage/sfx/1359/1359-preview.mp3',
            'bell': 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3',
            'harp': 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
            'space': 'https://assets.mixkit.co/active_storage/sfx/1360/1360-preview.mp3'
          };
          window.globalRingtonePlayer.src = ringtones[settings.ringtone] || ringtones.default;
          window.globalRingtonePlayer.play().catch(e => console.log("Background ringtone blocked:", e));

          // 2. Try to send notification as fallback
          if ('Notification' in window && Notification.permission === 'granted') {
            const notifTitle = 'Incoming Call from ' + (reminder.caller_name || 'EchoJoy');
            if (swRegistration && swRegistration.showNotification) {
              swRegistration.showNotification(notifTitle, {
                body: 'Tap to answer your voice reminder',
                icon: '/icons/icon-192x192.png',
                tag: 'call-' + reminder.id,
                requireInteraction: true
              });
            } else {
              new Notification(notifTitle);
            }
          }
        }
        
        // Always navigate (will be visible when user opens the app)
        navigateTo('/call');
        break;
      }
    }
  } catch (err) {
    console.error("Daemon error checking reminders:", err);
  }
};

// Auto-request permission on first boot
document.addEventListener('click', () => {
  requestNotificationPermission();
}, { once: true });

// Check every 15 seconds
setInterval(checkReminders, 15000);
// Run once on boot
checkReminders();

// Clear triggered cache every hour to allow daily repeats
setInterval(() => {
  triggeredReminders.clear();
}, 60 * 60 * 1000);
