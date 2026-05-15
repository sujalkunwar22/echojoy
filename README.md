<div align="center">
  
# 🎀 EchoJoy 🎀
**Your Voice, Your Reminders, Your Joy.**

<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDES0z8EDpD3Vby62U5qpUL8WPFpSMndxpzA0UuE8XhBBMI4ERC_i8ka70GGBb9cBQGKbd9mqlb_2emPZIQcPxmdhNbmv3hJi05XJlBXBtrl8wfXAjmxBc2NpZDLVmDu1XqpYzWffc8n1VwpaYJl-WXTawSyGaoYzU74BWFNrXuQQTZ5vjqt9o-y3prbT1UmXuZqeT1KPMOsSQZcQG-h9jg719J90vMqGZwqyWIBNVaNcoRy5Nt1G0swNKB24-WwHE-rISqCJ9ll3Q" width="200" alt="EchoJoy Wand" />

*Capture the magic of your own voice to remind you of the things that matter most.*

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

</div>

<br/>

## ✨ What is EchoJoy?
**EchoJoy** is a modern, immersive, and highly aesthetic Progressive Web App (PWA) that transforms boring text-based reminders into **delightful audio calls**. Instead of an annoying alarm, EchoJoy "calls" you at your scheduled time and plays back your own recorded voice affirmation, reminder, or memo. 

Built with a stunning, vibrant "Candy" design system, EchoJoy blends utility with absolute joy.

---

## 🌟 Dazzling Features

### 🎙️ Dynamic Audio Recording
Experience a buttery-smooth recording interface featuring a **real-time audio waveform** that actively reacts and dances to the frequencies of your voice as you speak.

### 📞 Immersive "Incoming Call" Experience
When it's time for your reminder, EchoJoy doesn't just ping you—it presents a gorgeous full-screen "Incoming Call" UI. Answer the call to hear your memo. 

### 🧑‍🎤 3D Avatar Customization
Personalize your profile! Tap your profile picture anywhere in the app to open a frosted-glass modal and choose from 5 premium, high-fidelity 3D avatars.

### ☁️ Cloud Synced & Reliable
Powered by **Supabase**. Your audio recordings are safely uploaded to Supabase Storage, and your schedules are synced instantly across your devices via PostgreSQL. 

### 🗑️ Smart Archiving (History)
Nothing is lost forever. Soft-deletion logic moves your old or completed reminders into a dedicated **History Feed** where you can replay your past memories or manage your deleted items.

### 📱 PWA Ready
Install EchoJoy directly to your iOS or Android home screen for a seamless, app-like experience without the App Store overhead.

---

## 🎨 The "Candy" Design System
The app features a custom-built Tailwind configuration relying heavily on:
- 🌸 **Vibrant Palettes**: Soft pinks (`primary`), rich purples (`secondary`), and bright blues (`tertiary`).
- 🧊 **Glassmorphism**: Beautiful translucent modals and frosted blurs.
- 💫 **Micro-interactions**: Subtle hover states, bouncy scale animations, and rotating glow rings to make the UI feel alive.

---

## 🚀 Getting Started

Want to run EchoJoy locally and experience the magic?

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A [Supabase](https://supabase.com/) project.

### 1. Clone & Install
```bash
git clone https://github.com/sujalkunwar22/echojoy.git
cd echojoy
npm install
```

### 2. Configure Supabase
Create a `.env` file in the root of your project and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Database Setup:**
Run the following SQL in your Supabase SQL Editor to prepare your tables:
```sql
CREATE TABLE public.reminders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  caller_name TEXT,
  time TEXT NOT NULL,
  audio_url TEXT NOT NULL,
  days TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Remember to create a public storage bucket named "audio-reminders"
```

### 3. Run the App
```bash
npm run dev --host
```
Open the provided `localhost` or local Network IP on your phone to test the microphone and recording features!

---

> [!TIP]
> **Pro-Tip for iOS Users:** To test the microphone, make sure to access your local development server via `https://` or use `localhost`. iOS requires a secure context to request microphone permissions!

<br/>
<div align="center">
  <i>Designed & Developed with 💖 by Sujal Kunwar</i>
</div>
