export interface UPIParams {
  upiId: string;
  name: string;
  amount: number;
  note?: string;
  transactionId?: string;
}

/**
 * Generate a UPI deep link
 * Works with Google Pay, PhonePe, Paytm, BHIM, etc.
 */
export function generateUPILink({ upiId, name, amount, note, transactionId }: UPIParams): string {
  const params = new URLSearchParams({
    pa: upiId,
    pn: name,
    am: amount.toFixed(2),
    cu: 'INR',
  });
  if (note) params.set('tn', note.slice(0, 100));
  if (transactionId) params.set('tr', transactionId);
  return `upi://pay?${params.toString()}`;
}

/**
 * Generate a UPI QR code data URL
 */
export async function generateUPIQRCode(params: UPIParams): Promise<string> {
  const QRCode = (await import('qrcode')).default;
  const upiLink = generateUPILink(params);
  return QRCode.toDataURL(upiLink, {
    width: 256,
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  });
}

/**
 * Generate GPay intent link
 */
export function generateGPayLink(params: UPIParams): string {
  return generateUPILink(params).replace('upi://pay', 'gpay://upi/pay');
}

/**
 * Generate PhonePe intent link
 */
export function generatePhonePeLink(params: UPIParams): string {
  const base = generateUPILink(params);
  return `phonepe://${base.replace('upi://', '')}`;
}

/**
 * Validate UPI ID format
 */
export function isValidUPIId(upiId: string): boolean {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  return pattern.test(upiId.trim());
}

/**
 * Copy UPI link to clipboard
 */
export async function copyUPILink(params: UPIParams): Promise<boolean> {
  try {
    const link = generateUPILink(params);
    await navigator.clipboard.writeText(link);
    return true;
  } catch {
    return false;
  }
}
