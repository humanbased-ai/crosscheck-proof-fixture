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
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: 0,
        take: 25,
      },
    ])
  })

  it('supports paginated reads', async () => {
    const queries: unknown[] = []
    const store: TransactionStore = {
      async findMany(query) {
        queries.push(query)
        return []
      },
    }

    await listAccountTransactions(store, { user: { id: 'user_123' } }, 'acct_456', 3, 10)

    expect(queries).toEqual([
      {
        where: {
          accountId: 'acct_456',
          ownerId: 'user_123',
        },
        orderBy: {
          createdAt: 'desc',
          id: 'asc',
        },
        skip: 20,
        take: 10,
      },
    ])
  })
})
