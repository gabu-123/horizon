'use client';

import { AccountSummary } from '@/components/dashboard/account-summary';
import { CardManagement } from '@/components/dashboard/card-management';
import { FinancialInsights } from '@/components/dashboard/financial-insights';
import { P2PTransfer } from '@/components/dashboard/p2p-transfer';
import { TransactionHistory } from '@/components/dashboard/transaction-history';
import { mockUserData } from '@/lib/mock-data';
import type { Transaction, Account } from '@/lib/mock-data';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [accounts, setAccounts] = useState<Account[]>(mockUserData.accounts);
  const [checkingTransactions, setCheckingTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setCheckingTransactions(accounts.find((acc) => acc.type === 'Checking')?.transactions || [])
  }, [accounts]);

  const handleNewTransfer = (newTransaction: Transaction) => {
    setCheckingTransactions((prev) => [newTransaction, ...prev]);

    // P2P transfers are from checking account by default
    setAccounts(prevAccounts => 
        prevAccounts.map(account => {
            if(account.type === 'Checking') {
                return {
                    ...account,
                    balance: account.balance + newTransaction.amount // amount is negative
                }
            }
            return account;
        })
    )
  };
  
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <AccountSummary accounts={accounts} />
        <CardManagement />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                 <FinancialInsights />
                 <P2PTransfer onTransferSuccess={handleNewTransfer} />
            </div>
            <TransactionHistory transactions={checkingTransactions} />
        </div>
      </div>
    </div>
  );
}
