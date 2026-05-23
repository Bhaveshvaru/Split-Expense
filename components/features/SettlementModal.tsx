'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeSettlement } from '../../store/slices/uiSlice';
import type { AppDispatch } from '../../store';
import type { Group, Transaction, Balance } from '../../types';
import { formatCurrency } from '../../lib/settlement';
import { generateUPILink, generateUPIQRCode, copyUPILink, isValidUPIId } from '../../lib/upi';
import toast from 'react-hot-toast';

interface Props {
  group: Group;
  transactions: Transaction[];
  balances: Balance[];
  onClose: () => void;
}

export function SettlementModal({ group, transactions, balances, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [settledIds, setSettledIds] = useState<Set<number>>(new Set());
  const [activeQR, setActiveQR] = useState<number | null>(null);
  const [qrDataUrl, setQRDataUrl] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const close = () => { dispatch(closeSettlement()); onClose(); };

  const handleMarkPaid = (tx: Transaction, idx: number) => {
    const updated = new Set(settledIds);
    updated.add(idx);
    setSettledIds(updated);
    toast.success(`${tx.fromMemberName} → ${tx.toMemberName} marked as paid ✓`);

    if (updated.size === transactions.length) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }
  };

  const handleShowQR = async (tx: Transaction, idx: number) => {
    const toMember = group.members.find(m => m.id === tx.toMemberId);
    if (!toMember?.upiId) {
      toast.error('No UPI ID set for ' + tx.toMemberName);
      return;
    }
    setActiveQR(idx === activeQR ? null : idx);
    if (idx !== activeQR) {
      const url = await generateUPIQRCode({
        upiId: toMember.upiId,
        name: tx.toMemberName,
        amount: tx.amount,
        note: `SplitEase: ${group.name}`,
      });
      setQRDataUrl(url);
    }
  };

  const handleCopyUPI = async (tx: Transaction) => {
    const toMember = group.members.find(m => m.id === tx.toMemberId);
    if (!toMember?.upiId) { toast.error('No UPI ID for ' + tx.toMemberName); return; }
    const ok = await copyUPILink({ upiId: toMember.upiId, name: tx.toMemberName, amount: tx.amount, note: group.name });
    if (ok) toast.success('UPI link copied! 📋');
  };

  const allSettled = settledIds.size === transactions.length;

  return (
    <>
      {showConfetti && <ConfettiEffect />}
      <div className="overlay" onClick={close} role="presentation" />
      <div className="bottom-sheet max-w-lg mx-auto" role="dialog" aria-modal aria-label="Settle up">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">{allSettled ? '🎉 All Settled!' : '💸 Settle Up'}</h2>
            <p className="text-xs text-slate-500">{transactions.length} payment{transactions.length !== 1 ? 's' : ''} · {group.name}</p>
          </div>
          <button onClick={close} className="btn-ghost px-2 text-xl text-slate-500">×</button>
        </div>

        {allSettled ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎊</div>
            <h3 className="text-xl font-bold text-white mb-2">All done!</h3>
            <p className="text-slate-400 text-sm">Everyone is settled up. Enjoy!</p>
            <button onClick={close} className="btn-primary mt-6 px-8">Close</button>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto max-h-[65vh] pr-1">
            {transactions.map((tx, i) => {
              const toMember = group.members.find(m => m.id === tx.toMemberId);
              const hasUPI = !!toMember?.upiId && isValidUPIId(toMember.upiId);
              const isSettled = settledIds.has(i);
              const upiLink = hasUPI ? generateUPILink({ upiId: toMember!.upiId!, name: tx.toMemberName, amount: tx.amount, note: group.name }) : null;

              return (
                <div key={i} className={`card p-4 transition-all ${isSettled ? 'opacity-50 border-brand-500/20' : ''}`}>
                  {/* Transaction row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ background: group.members.find(m => m.id === tx.fromMemberId)?.color || '#ef4444' }}>
                        {tx.fromMemberName[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                          <span className="text-red-300">{tx.fromMemberName}</span>
                          <span className="text-slate-500 mx-1">→</span>
                          <span className="text-emerald-300">{tx.toMemberName}</span>
                        </div>
                        {toMember?.upiId && <div className="text-xs text-slate-500 truncate">{toMember.upiId}</div>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold text-white tabular-nums">{formatCurrency(tx.amount, group.currency)}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  {!isSettled ? (
                    <div className="flex gap-2 flex-wrap">
                      {hasUPI && (
                        <>
                          <a href={upiLink!} className="btn-primary text-xs px-3 py-2 flex-1 text-center" target="_blank" rel="noopener noreferrer">
                            📱 Pay via UPI
                          </a>
                          <button onClick={() => handleShowQR(tx, i)} className="btn-secondary text-xs px-3 py-2">
                            {activeQR === i ? '✕' : '📷'} QR
                          </button>
                          <button onClick={() => handleCopyUPI(tx)} className="btn-secondary text-xs px-3 py-2">
                            📋
                          </button>
                        </>
                      )}
                      {!hasUPI && (
                        <div className="text-xs text-slate-500 bg-surface-700 rounded-lg px-3 py-2 flex-1">
                          No UPI ID · Ask {tx.toMemberName} to add their UPI ID in group settings
                        </div>
                      )}
                      <button onClick={() => handleMarkPaid(tx, i)}
                        className="btn-secondary text-xs px-3 py-2 text-brand-400 border-brand-500/20 hover:bg-brand-500/10">
                        ✓ Mark Paid
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-brand-400">
                      <span className="w-4 h-4 rounded-full bg-brand-500/20 flex items-center justify-center">✓</span>
                      Marked as paid
                    </div>
                  )}

                  {/* QR Code */}
                  {activeQR === i && qrDataUrl && (
                    <div className="mt-3 flex flex-col items-center gap-2 animate-scale-in">
                      <div className="p-3 bg-white rounded-xl">
                        <img src={qrDataUrl} alt={`UPI QR for ${tx.toMemberName}`} width={180} height={180} />
                      </div>
                      <p className="text-xs text-slate-500">Scan with any UPI app</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

function ConfettiEffect() {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('react-confetti').then(({ default: Confetti }) => {
      // Confetti is rendered via the component below
    });
  }, []);

  return (
    <div className="confetti-canvas" aria-hidden>
      <ConfettiComponent />
    </div>
  );
}

function ConfettiComponent() {
  const [dims, setDims] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setDims({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  if (!dims.width) return null;

  // We use a simple CSS animation as a fallback
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute w-2 h-2 rounded-sm animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            background: ['#22c55e','#6366f1','#ec4899','#f97316','#eab308'][i % 5],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }} />
      ))}
    </div>
  );
}
