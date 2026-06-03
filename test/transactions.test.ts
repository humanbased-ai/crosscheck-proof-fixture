import { describe, expect, it } from 'vitest'
import { listAccountTransactions, type TransactionStore } from '../src/transactions.js'

describe('listAccountTransactions', () => {
  it('scopes transaction reads to the authenticated user', async () => {
    const queries: unknown[] = []
    const store: TransactionStore = {
      async findMany(query) {
        queries.push(query)
        return []
      },
    }

    await listAccountTransactions(store, { user: { id: 'user_123' } }, 'acct_456')

    expect(queries).toEqual([
      {
        where: {
          accountId: 'acct_456',
          ownerId: 'user_123',
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    ])
  })
})
