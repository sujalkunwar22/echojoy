export const BottomNav = (activeTab = 'reminders') => {
  const isRecord = activeTab === 'record';
  const isReminders = activeTab === 'reminders';
  const isHistory = activeTab === 'history';

  const navStr = `
    <nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface-container dark:bg-surface-container-highest border-t-0 shadow-[0_-4px_16px_rgba(224,64,160,0.15)] z-50 rounded-t-lg">
      
      <!-- Record Tab -->
      <a href="/record" data-link class="flex flex-col items-center justify-center ${isRecord ? 'bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed shadow-[0_4px_12px_rgba(224,64,160,0.3)]' : 'text-on-surface-variant dark:text-outline-variant hover:bg-primary-fixed dark:hover:bg-secondary-container'} rounded-full px-5 py-1.5 transition-colors duration-300 active:scale-110 transition-transform duration-200 cubic-bezier(0.34,1.56,0.64,1)">
        <span class="material-symbols-outlined mb-1" ${isRecord ? `style="font-variation-settings: 'FILL' 1;"` : ''}>mic</span>
        <span class="font-label text-xs font-medium">Record</span>
      </a>
      
      <!-- Reminders Tab -->
      <a href="/" data-link class="flex flex-col items-center justify-center ${isReminders ? 'bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed shadow-[0_4px_12px_rgba(224,64,160,0.3)]' : 'text-on-surface-variant dark:text-outline-variant hover:bg-primary-fixed dark:hover:bg-secondary-container'} rounded-full px-5 py-1.5 transition-colors duration-300 active:scale-110 transition-transform duration-200 cubic-bezier(0.34,1.56,0.64,1)">
        <span class="material-symbols-outlined mb-1" ${isReminders ? `style="font-variation-settings: 'FILL' 1;"` : ''}>alarm</span>
        <span class="font-label text-xs font-medium">Reminders</span>
      </a>
      
      <!-- History Tab -->
      <a href="/history" data-link class="flex flex-col items-center justify-center ${isHistory ? 'bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed shadow-[0_4px_12px_rgba(224,64,160,0.3)]' : 'text-on-surface-variant dark:text-outline-variant hover:bg-primary-fixed dark:hover:bg-secondary-container'} rounded-full px-5 py-1.5 transition-colors duration-300 active:scale-110 transition-transform duration-200 cubic-bezier(0.34,1.56,0.64,1)">
        <span class="material-symbols-outlined mb-1" ${isHistory ? `style="font-variation-settings: 'FILL' 1;"` : ''}>history</span>
        <span class="font-label text-xs font-medium">History</span>
      </a>
      
    </nav>
  `;
  return navStr;
};
