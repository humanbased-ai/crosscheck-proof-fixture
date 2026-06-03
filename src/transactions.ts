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
    }
  }): Promise<Transaction[]>
}

export async function listAccountTransactions(
  store: TransactionStore,
  ctx: UserContext,
  accountId: string,
): Promise<Transaction[]> {
  return store.findMany({
    where: {
      accountId,
      ownerId: ctx.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
