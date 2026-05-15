import { BottomNav } from '../components/BottomNav.js';
import { supabase } from '../lib/supabase.js';

export const RecordReminderView = () => {
  const container = document.createElement('div');
  container.className = "bg-background text-on-background min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed";
  
  container.innerHTML = `
    <!-- TopAppBar -->
    <header class="bg-background dark:bg-surface-dim flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <button class="hover:scale-105 transition-transform duration-300 ease-out active:scale-95 text-on-surface-variant">
        <span class="material-symbols-outlined text-2xl" data-icon="settings">settings</span>
      </button>
      <h1 class="font-headline text-lg font-bold text-2xl font-black text-primary dark:text-primary-fixed tracking-tight">EchoJoy</h1>
      <div class="w-10 h-10 rounded-full border-2 border-primary-fixed overflow-hidden hover:scale-105 transition-transform duration-300 ease-out active:scale-95 cursor-pointer">
        <img alt="User profile photo" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY4AzqAC5BZD3XhDBiH2yM9zcuEhK7jJg4xej0UIvV2ji8UhWkOLYAdiQN61DnZV-H6J2iZaK5malfz0W0Ln6gM0dVgGWncw32oDKzIvlaW5I9XcGsSBO6cPQp647HphuJ0K4Y_rT0z3IRyftkYqXUeTP7DCF7cimnzuH0AzzH16-gJrZf0GVX_ITY_EE3L7zMISHc107xqRqKYHj145Ye3Jn21kdc93tzxo8orVDWKWEretMyRz4YgaknafQ7Pu9_AHjpvLrVLe4"/>
      </div>
    </header>
    
    <!-- Main Content Canvas -->
    <main class="flex-grow flex flex-col items-center justify-center px-6 pt-24 pb-32 gap-12 max-w-4xl mx-auto w-full">
      <!-- Status Badge -->
      <div class="bg-primary-fixed text-on-primary-fixed-variant px-6 py-2 rounded-full font-bold text-sm shadow-[0_4px_12px_rgba(224,64,160,0.1)] flex items-center gap-2">
        <span id="recording-pulse" class="w-2 h-2 bg-primary rounded-full"></span>
        <span id="recording-status">Ready to Record</span>
      </div>
      
      <!-- Laptop Warning -->
      <div id="laptop-warning" class="hidden max-w-xs text-center p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-medium flex items-center gap-2">
        <span class="material-symbols-outlined text-sm">info</span>
        Recordings made on a computer may not play on iPhones. Use your phone for best results!
      </div>
      
      <!-- Central Record Button Section -->
      <div class="relative group">
        <!-- Outer Glow Rings -->
        <div class="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-125 opacity-60 group-hover:opacity-80 transition-opacity"></div>
        <div class="absolute inset-0 bg-secondary/10 rounded-full blur-2xl scale-110 opacity-40"></div>
        <!-- Record Button -->
        <button id="record-btn" class="relative w-56 h-56 bg-primary rounded-full flex items-center justify-center shadow-[0_12px_32px_rgba(224,64,160,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 ease-out border-8 border-white/30 group">
          <div id="recording-ring" class="absolute inset-2 border-4 border-dashed border-white/20 rounded-full"></div>
          <span id="record-icon" class="material-symbols-outlined text-white text-7xl drop-shadow-lg" data-icon="mic" style="font-variation-settings: 'FILL' 1;">mic</span>
        </button>
      </div>
      
      <!-- Waveform Visualization -->
      <div class="w-full bg-surface-container rounded-lg p-8 flex flex-col items-center gap-4 shadow-sm opacity-50 transition-opacity duration-300" id="waveform-container">
        <div class="flex items-center justify-center gap-1.5 h-16 w-full overflow-hidden">
          <div class="waveform-bar w-2 bg-tertiary rounded-full" style="animation-delay: 0.1s; height: 12px;"></div>
          <div class="waveform-bar w-2 bg-secondary rounded-full" style="animation-delay: 0.3s; height: 24px;"></div>
          <div class="waveform-bar w-2 bg-primary rounded-full" style="animation-delay: 0.2s; height: 40px;"></div>
          <div class="waveform-bar w-2 bg-tertiary rounded-full" style="animation-delay: 0.5s; height: 18px;"></div>
          <div class="waveform-bar w-2 bg-secondary rounded-full" style="animation-delay: 0.4s; height: 32px;"></div>
          <div class="waveform-bar w-2 bg-primary rounded-full" style="animation-delay: 0.7s; height: 12px;"></div>
          <div class="waveform-bar w-2 bg-tertiary rounded-full" style="animation-delay: 0.6s; height: 48px;"></div>
          <div class="waveform-bar w-2 bg-secondary rounded-full" style="animation-delay: 0.8s; height: 20px;"></div>
          <div class="waveform-bar w-2 bg-primary rounded-full" style="animation-delay: 0.2s; height: 36px;"></div>
          <div class="waveform-bar w-2 bg-tertiary rounded-full" style="animation-delay: 0.4s; height: 14px;"></div>
          <div class="waveform-bar w-2 bg-secondary rounded-full" style="animation-delay: 0.9s; height: 30px;"></div>
          <div class="waveform-bar w-2 bg-primary rounded-full" style="animation-delay: 1.1s; height: 12px;"></div>
          <div class="waveform-bar w-2 bg-tertiary rounded-full" style="animation-delay: 1.3s; height: 24px;"></div>
          <div class="waveform-bar w-2 bg-secondary rounded-full" style="animation-delay: 0.5s; height: 40px;"></div>
          <div class="waveform-bar w-2 bg-primary rounded-full" style="animation-delay: 0.7s; height: 18px;"></div>
        </div>
        <span id="recording-time" class="font-label text-sm text-on-surface-variant font-medium tracking-wide">00:00</span>
      </div>
      
      <!-- Quick Controls -->
      <div class="grid grid-cols-2 gap-4 w-full">
        <button id="next-btn" class="col-span-2 hidden bg-tertiary-container text-on-tertiary-container flex items-center justify-center gap-3 py-4 px-6 rounded-full font-bold hover:scale-[1.03] transition-transform active:scale-95 shadow-[0_4px_16px_rgba(0,150,204,0.15)]">
          <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
          Continue to Schedule
        </button>
      </div>
    </main>
    
    ${BottomNav('record')}
  `;

  const recordBtn = container.querySelector('#record-btn');
  const recordIcon = container.querySelector('#record-icon');
  const statusEl = container.querySelector('#recording-status');
  const pulseEl = container.querySelector('#recording-pulse');
  const ringEl = container.querySelector('#recording-ring');
  const timeEl = container.querySelector('#recording-time');
  const waveformEl = container.querySelector('#waveform-container');
  const nextBtn = container.querySelector('#next-btn');
  const laptopWarning = container.querySelector('#laptop-warning');

  // Show warning if not on iOS
  if (!/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    laptopWarning.classList.remove('hidden');
  }
  
  let isRecording = false;
  let timer;
  let seconds = 0;
  
  let mediaRecorder;
  let audioChunks = [];
  
  let audioContext;
  let analyser;
  let dataArray;
  let animationId;
  const waveformBars = container.querySelectorAll('.waveform-bar');

  const startWaveform = (stream) => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    waveformBars.forEach(bar => {
      bar.style.animation = 'none';
    });

    const draw = () => {
      if (!isRecording) return;
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
      
      waveformBars.forEach((bar, i) => {
        const dataIndex = Math.floor(i * (bufferLength / waveformBars.length));
        const value = dataArray[dataIndex];
        const height = 12 + (value / 255) * 68; // Min 12px, max 80px
        bar.style.height = `${height}px`;
      });
    };
    draw();
  };

  const stopWaveform = () => {
    cancelAnimationFrame(animationId);
    waveformBars.forEach(bar => {
      bar.style.animation = '';
    });
  };

  const updateUIForRecording = (recording) => {
    if (recording) {
      statusEl.textContent = 'Recording...';
      pulseEl.classList.add('animate-pulse', 'bg-error');
      pulseEl.classList.remove('bg-primary');
      recordBtn.classList.add('bg-error');
      recordBtn.classList.remove('bg-primary');
      ringEl.classList.add('animate-[spin_10s_linear_infinite]', 'border-white');
      ringEl.classList.remove('border-white/20');
      waveformEl.classList.remove('opacity-50');
      recordIcon.textContent = 'stop';
      
      timer = setInterval(() => {
        seconds++;
        const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timeEl.textContent = `${mins}:${secs}`;
      }, 1000);
    } else {
      pulseEl.classList.remove('animate-pulse', 'bg-error');
      pulseEl.classList.add('bg-primary');
      recordBtn.classList.remove('bg-error');
      recordBtn.classList.add('bg-primary');
      ringEl.classList.remove('animate-[spin_10s_linear_infinite]', 'border-white');
      ringEl.classList.add('border-white/20');
      waveformEl.classList.add('opacity-50');
      recordIcon.textContent = 'mic';
      clearInterval(timer);
    }
  };

  recordBtn.addEventListener('click', async () => {
    if (!isRecording) {
      // START RECORDING
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          statusEl.textContent = 'Uploading...';
          const mimeType = mediaRecorder.mimeType || 'audio/mp4';
          const audioBlob = new Blob(audioChunks, { type: mimeType });
          const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('webm') ? 'webm' : 'ogg';
          const fileName = `audio_${Date.now()}.${ext}`;
          
          try {
            // Ensure bucket exists in your supabase dashboard: 'audio-reminders'
            const { data, error } = await supabase.storage
              .from('audio-reminders')
              .upload(fileName, audioBlob, {
                cacheControl: '3600',
                upsert: false
              });
              
            if (error) throw error;
            
            const { data: publicUrlData } = supabase.storage
              .from('audio-reminders')
              .getPublicUrl(fileName);
              
            // Save URL to sessionStorage to use in next screen
            sessionStorage.setItem('currentAudioUrl', publicUrlData.publicUrl);
            
            statusEl.textContent = 'Audio Captured!';
            nextBtn.classList.remove('hidden');
          } catch (err) {
            console.error('Upload failed:', err);
            statusEl.textContent = 'Upload failed. Try again.';
          }
        });

        isRecording = true;
        seconds = 0;
        updateUIForRecording(true);
        startWaveform(stream);
        mediaRecorder.start();
        
      } catch (err) {
        console.error("Could not start recording", err);
        statusEl.textContent = "Microphone access denied.";
      }
      
    } else {
      // STOP RECORDING
      isRecording = false;
      updateUIForRecording(false);
      stopWaveform();
      if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop()); // Stop the microphone
      }
    }
  });

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    import('../main.js').then(module => module.navigateTo('/schedule'));
  });

  return container;
};
