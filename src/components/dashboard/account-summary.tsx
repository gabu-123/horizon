import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockUserData } from '@/lib/mock-data';
import type { Account } from '@/lib/mock-data';
import { DollarSign, Wallet } from 'lucide-react';

export function AccountSummary({ accounts }: { accounts: Account[] }) {
  const checkingAccount = accounts.find(
    (acc) => acc.type === 'Checking'
  );
  const savingsAccount = accounts.find(
    (acc) => acc.type === 'Savings'
  );

  return (
    <>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle>Welcome back, {mockUserData.name.split(' ')[0]}!</CardTitle>
          <CardDescription>
            Here&apos;s a summary of your accounts.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-4 sm:flex-row">
            <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Checking</p>
                    <p className="text-2xl font-semibold">
                    {checkingAccount
                        ? checkingAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                        : '$0.00'}
                    </p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Savings</p>
                    <p className="text-2xl font-semibold">
                    {savingsAccount
                        ? savingsAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                        : '$0.00'}
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>
    </>
  );
}
