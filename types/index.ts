export interface Member {
  id: string;
  name: string;
  upiId?: string;
  color: string;
}

export interface Split {
  memberId: string;
  memberName: string;
  amount: number;
  percentage?: number;
}

export interface Expense {
  expenseId: string;
  groupId: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  paidBy: string;
  paidByName: string;
  splitType: 'equal' | 'exact' | 'percentage';
  splits: Split[];
  category: ExpenseCategory;
  date: string;
  isSettled: boolean;
  createdAt: string;
}

export interface Group {
  groupId: string;
  name: string;
  description?: string;
  category: GroupCategory;
  members: Member[];
  currency: string;
  totalExpenses: number;
  createdAt: string;
  updatedAt: string;
}

export interface Balance {
  memberId: string;
  memberName: string;
  balance: number;
}

export interface Transaction {
  fromMemberId: string;
  fromMemberName: string;
  toMemberId: string;
  toMemberName: string;
  toUpiId?: string;
  amount: number;
}

export interface Settlement {
  settlementId: string;
  groupId: string;
  fromMemberId: string;
  fromMemberName: string;
  toMemberId: string;
  toMemberName: string;
  amount: number;
  currency: string;
  isPaid: boolean;
  paidAt?: string;
  upiTransactionId?: string;
}

export interface SettlementSummary {
  balances: Balance[];
  transactions: Transaction[];
  totalExpenses: number;
  currency: string;
}

export type GroupCategory = 'trip' | 'roommates' | 'wedding' | 'food' | 'other';
export type ExpenseCategory = 'food' | 'transport' | 'accommodation' | 'entertainment' | 'shopping' | 'utilities' | 'general' | 'other';
export type SplitType = 'equal' | 'exact' | 'percentage';
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface AppUser {
  type: 'guest' | 'user';
  guestSessionId?: string;
  userId?: string;
  name?: string;
  email?: string;
}

export interface RootState {
  user: UserState;
  groups: GroupsState;
  expenses: ExpensesState;
  ui: UIState;
}

export interface UserState {
  type: 'guest' | 'user';
  guestSessionId: string;
  userId?: string;
  name?: string;
  email?: string;
  darkMode: boolean;
}

export interface GroupsState {
  groups: Group[];
  currentGroupId: string | null;
  loading: boolean;
  error: string | null;
}

export interface ExpensesState {
  expenses: Record<string, Expense[]>; // groupId -> expenses
  loading: boolean;
  error: string | null;
}

export interface UIState {
  showAddExpense: boolean;
  showAddGroup: boolean;
  showSettlement: boolean;
  activeModal: string | null;
}
