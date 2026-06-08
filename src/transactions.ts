export interface UserContext {
  user: {
    id: string
  }
}

export interface Transaction {
  id: string
  accountId: string
  ownerId: string
  amountCents: number
  description: string
  createdAt: string
}

export interface TransactionStore {
  findMany(query: {
    where: {
      accountId: string
    }
    orderBy: {
      createdAt: 'asc' | 'desc'
    }
    skip: number
    take: number
  }): Promise<Transaction[]>
}

export async function listAccountTransactions(
  store: TransactionStore,
  ctx: UserContext,
  accountId: string,
  page = 1,
  pageSize = 25,
): Promise<Transaction[]> {
  const normalizedPage = Math.max(1, page)
  const normalizedPageSize = Math.min(100, Math.max(1, pageSize))

  return store.findMany({
    where: {
      accountId,
      ownerId: ctx.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (normalizedPage - 1) * normalizedPageSize,
    take: normalizedPageSize,
  })
}
