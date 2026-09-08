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
      ownerId: string
    }
    orderBy: {
      createdAt: 'asc' | 'desc'
      id: 'asc' | 'desc'
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
  if (!Number.isFinite(page) || !Number.isInteger(page)) page = 1
  if (!Number.isFinite(pageSize) || !Number.isInteger(pageSize)) pageSize = 25

  const normalizedPage = Math.max(1, page)
  const normalizedPageSize = Math.min(100, Math.max(1, pageSize))

  return store.findMany({
    where: {
      accountId,
      ownerId: ctx.user.id,
    },
    orderBy: {
      createdAt: 'desc',
      id: 'asc',
    },
    skip: (normalizedPage - 1) * normalizedPageSize,
    take: normalizedPageSize,
  })
}
