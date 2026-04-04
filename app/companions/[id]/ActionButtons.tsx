'use client';

import Link from 'next/link';

interface ActionButtonsProps {
  companionId: string;
}

export default function ActionButtons({ companionId }: ActionButtonsProps) {
  const handleStartSession = () => {
    console.log('Starting session with companion:', companionId);
    alert('Session starting soon! Feature coming in next update.');
  };

  const handleEdit = () => {
    console.log('Editing companion:', companionId);
    // Navigate to edit page or show coming soon
    alert('Edit feature coming soon!');
  };

  return (
    <div className="space-y-3">
      <button 
        onClick={handleStartSession}
        className="w-full py-3 px-4 bg-[#fe5933] text-white rounded-lg font-medium hover:bg-[#e54d2b] transition-colors active:scale-95 transform"
        type="button"
      >
        Start Session
      </button>
      <button 
        onClick={handleEdit}
        className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors active:scale-95 transform"
        type="button"
      >
        Edit Companion
      </button>
      <Link 
        href="/companions"
        className="block w-full py-3 px-4 text-center text-gray-500 hover:text-gray-700 transition-colors"
      >
        ← Back to Library
      </Link>
    </div>
  );
}