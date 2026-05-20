'use client';

interface Props {
  onClick: () => void;
}

export function FloatingAddButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-20 w-14 h-14 rounded-2xl bg-brand-500 text-white shadow-glow-green hover:bg-brand-400 active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl font-light"
      aria-label="Add expense"
      style={{ boxShadow: '0 4px 24px rgba(34,197,94,0.35), 0 1px 4px rgba(0,0,0,0.3)' }}
    >
      +
    </button>
  );
}
