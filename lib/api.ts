import { Group, Expense, SettlementSummary } from '../types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

class APIClient {
  private getHeaders(guestSessionId?: string): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (guestSessionId) headers['x-guest-session-id'] = guestSessionId
    return headers
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options?.headers },
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(err.error || `HTTP ${res.status}`)
    }
    return res.json()
  }

  // Groups
  async getGroups(guestSessionId: string): Promise<Group[]> {
    return this.request<Group[]>('/groups', {
      headers: this.getHeaders(guestSessionId),
    })
  }

  async getGroup(groupId: string): Promise<Group> {
    return this.request<Group>(`/groups/${groupId}`)
  }

  async createGroup(
    data: Partial<Group>,
    guestSessionId: string,
  ): Promise<Group> {
    return this.request<Group>('/groups', {
      method: 'POST',
      headers: this.getHeaders(guestSessionId),
      body: JSON.stringify(data),
    })
  }

  async updateGroup(groupId: string, data: Partial<Group>): Promise<Group> {
    return this.request<Group>(`/groups/${groupId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteGroup(groupId: string): Promise<void> {
    return this.request<void>(`/groups/${groupId}`, { method: 'DELETE' })
  }

  // Expenses
  async getExpenses(groupId: string): Promise<Expense[]> {
    return this.request<Expense[]>(`/expenses?groupId=${groupId}`)
  }

  async createExpense(
    data: Partial<Expense>,
    guestSessionId: string,
  ): Promise<Expense> {
    return this.request<Expense>('/expenses', {
      method: 'POST',
      headers: this.getHeaders(guestSessionId),
      body: JSON.stringify(data),
    })
  }

  async updateExpense(
    expenseId: string,
    data: Partial<Expense>,
  ): Promise<Expense> {
    return this.request<Expense>(`/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteExpense(expenseId: string): Promise<void> {
    return this.request<void>(`/expenses/${expenseId}`, { method: 'DELETE' })
  }

  // Settlements
  async calculateSettlements(groupId: string): Promise<SettlementSummary> {
    return this.request<SettlementSummary>(
      `/settlements/calculate?groupId=${groupId}`,
    )
  }

  async recordSettlement(
    data: {
      groupId: string
      fromMemberId: string
      fromMemberName: string
      toMemberId: string
      toMemberName: string
      amount: number
      upiTransactionId?: string
    },
    guestSessionId: string,
  ): Promise<void> {
    return this.request('/settlements/record', {
      method: 'POST',
      headers: this.getHeaders(guestSessionId),
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new APIClient()
