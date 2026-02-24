'use client';

import { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { mockUserData } from '@/lib/mock-data';
import type { Account, Transaction } from '@/lib/mock-data';

interface AccountsContextType {
  accounts: Account[];
  setAccounts: Dispatch<SetStateAction<Account[]>>;
  handleNewTransaction: (newTransaction: Transaction, targetAccountNumber: string) => void;
}

const AccountsContext = createContext<AccountsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'horizon-bank-data';

export function AccountsProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(mockUserData.accounts);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load state from localStorage on initial client-side render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        setAccounts(JSON.parse(storedData));
      }
    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      // Fallback to mock data if localStorage is corrupt
      setAccounts(mockUserData.accounts);
    }
    setIsInitialized(true);
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    // Only save to localStorage after the initial load is complete
    if (isInitialized) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accounts));
      } catch (error) {
        console.error("Failed to save data to localStorage", error);
      }
    }
  }, [accounts, isInitialized]);

  const handleNewTransaction = (newTransaction: Transaction, fromAccountNumber: string) => {
    setAccounts(prevAccounts =>
      prevAccounts.map(account => {
        if (account.accountNumber === fromAccountNumber) {
          const newBalance = Number(account.balance) + Number(newTransaction.amount);
          return {
            ...account,
            balance: newBalance,
            transactions: [newTransaction, ...account.transactions],
          };
        }
        return account;
      })
    );
  };

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts, handleNewTransaction }}>
      {children}
    </AccountsContext.Provider>
  );
}

export function useAccounts() {
  const context = useContext(AccountsContext);
  if (context === undefined) {
    throw new Error('useAccounts must be used within an AccountsProvider');
  }
  return context;
}
