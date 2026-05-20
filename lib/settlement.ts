import { Balance, Transaction, Expense, Member } from '../types';

export function computeBalances(members: Member[], expenses: Expense[]): Balance[] {
  const map = new Map<string, Balance>();
  members.forEach(m => map.set(m.id, { memberId: m.id, memberName: m.name, balance: 0 }));

  for (const expense of expenses) {
    const payer = map.get(expense.paidBy);
    if (payer) payer.balance += expense.amount;
    for (const split of expense.splits) {
      const debtor = map.get(split.memberId);
      if (debtor) debtor.balance -= split.amount;
    }
  }
  return Array.from(map.values()).map(b => ({ ...b, balance: Math.round(b.balance * 100) / 100 }));
}

export function minimizeTransactions(balances: Balance[]): Transaction[] {
  const transactions: Transaction[] = [];
  const creditors = balances.filter(b => b.balance > 0.01).sort((a, b) => b.balance - a.balance);
  const debtors = balances.filter(b => b.balance < -0.01).sort((a, b) => a.balance - b.balance);

  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    const c = { ...creditors[i] };
    const d = { ...debtors[j] };
    const amount = Math.round(Math.min(c.balance, -d.balance) * 100) / 100;
    if (amount > 0.01) {
      transactions.push({ fromMemberId: d.memberId, fromMemberName: d.memberName, toMemberId: c.memberId, toMemberName: c.memberName, amount });
    }
    creditors[i].balance -= amount;
    debtors[j].balance += amount;
    if (creditors[i].balance < 0.01) i++;
    if (Math.abs(debtors[j].balance) < 0.01) j++;
  }
  return transactions;
}

export function calculateEqualSplits(amount: number, members: Member[]) {
  const perPerson = Math.round((amount / members.length) * 100) / 100;
  const remainder = Math.round((amount - perPerson * members.length) * 100) / 100;
  return members.map((m, i) => ({
    memberId: m.id, memberName: m.name,
    amount: i === 0 ? perPerson + remainder : perPerson,
  }));
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

export function getMemberBalance(memberId: string, expenses: Expense[]): number {
  let balance = 0;
  for (const e of expenses) {
    if (e.paidBy === memberId) balance += e.amount;
    const split = e.splits.find(s => s.memberId === memberId);
    if (split) balance -= split.amount;
  }
  return Math.round(balance * 100) / 100;
}
