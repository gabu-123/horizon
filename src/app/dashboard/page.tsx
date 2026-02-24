'use client';

import { AccountSummary } from '@/components/dashboard/account-summary';
import { CardManagement } from '@/components/dashboard/card-management';
import { FinancialInsights } from '@/components/dashboard/financial-insights';
import { P2PTransfer } from '@/components/dashboard/p2p-transfer';
import { TransactionHistory } from '@/components/dashboard/transaction-history';
import { useAccounts } from '@/contexts/accounts-context';

export default function DashboardPage() {
  const { accounts } = useAccounts();
  
  const checkingAccount = accounts.find((acc) => acc.type === 'Checking');

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
                 <P2PTransfer />
            </div>
            <TransactionHistory transactions={checkingAccount?.transactions ?? []} />
        </div>
      </div>
    </div>
  );
}
