'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Transaction } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

interface TransactionHistoryProps {
  title?: string;
  description?: string;
  transactions?: Transaction[];
}

export function TransactionHistory({
  title = 'Recent Transactions',
  description = 'A log of recent activity on your accounts.',
  transactions = [],
}: TransactionHistoryProps) {
  const formatDate = (dateString: string) => {
    // The dateString is in 'YYYY-MM-DD' format.
    // Parsing it as is can lead to timezone issues between server and client.
    // Appending 'T00:00:00Z' treats it as midnight UTC, ensuring consistency.
    const date = new Date(`${dateString}T00:00:00Z`);
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    // Return in MM/DD/YYYY format for consistency across all environments.
    return `${String(month).padStart(2, '0')}/${String(day).padStart(
      2,
      '0'
    )}/${year}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
            {transactions.slice(0, 5).map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'hidden h-8 w-8 items-center justify-center rounded-full sm:flex',
                        txn.type === 'credit'
                          ? 'bg-green-100 dark:bg-green-900/50'
                          : 'bg-red-100 dark:bg-red-900/50'
                      )}
                    >
                      {txn.type === 'credit' ? (
                        <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="font-medium">{txn.description}</div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {txn.category}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge
                    className="text-xs"
                    variant={
                      txn.status === 'Completed' ? 'default' : 'secondary'
                    }
                  >
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(txn.date)}
                </TableCell>
                <TableCell
                  className={cn('text-right font-medium', {
                    'text-green-600 dark:text-green-400':
                      txn.type === 'credit',
                    'text-red-600 dark:text-red-400': txn.type === 'debit',
                  })}
                >
                  {txn.type === 'credit' ? '+' : ''}
                  {txn.amount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
