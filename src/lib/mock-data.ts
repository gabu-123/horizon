export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category: string;
  status: 'Completed' | 'Pending' | 'Failed';
};

export type Account = {
  id: string;
  type: 'Checking' | 'Savings';
  accountNumber: string;
  balance: number;
  transactions: Transaction[];
};

export type Card = {
  id: string;
  type: 'Virtual' | 'Physical';
  provider: 'Visa' | 'Mastercard';
  lastFour: string;
  expiryDate: string;
  isFrozen: boolean;
};

export type InvestmentHolding = {
  id: string;
  name: string;
  ticker: string;
  shares: number;
  price: number;
  value: number;
  changePercent: number;
};

export type InvestmentPortfolio = {
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  holdings: InvestmentHolding[];
  history: { date: string; value: number }[];
};

export type UserData = {
  name: string;
  email: string;
  accounts: Account[];
  cards: Card[];
  investments: InvestmentPortfolio;
};

const MOCK_DATE_NOW = new Date('2023-10-27T12:00:00.000Z').getTime();

export const mockUserData: UserData = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  accounts: [
    {
      id: 'acc_chk_1',
      type: 'Checking',
      accountNumber: '**** **** **** 1234',
      balance: 115567.87,
      transactions: [
        {
          id: 'txn_1',
          date: new Date(MOCK_DATE_NOW - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Netflix Subscription',
          amount: -15.99,
          type: 'debit',
          category: 'Entertainment',
          status: 'Completed',
        },
        {
          id: 'txn_2',
          date: new Date(MOCK_DATE_NOW - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Salary Deposit',
          amount: 3500.0,
          type: 'credit',
          category: 'Income',
          status: 'Completed',
        },
        {
          id: 'txn_3',
          date: new Date(MOCK_DATE_NOW - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Whole Foods Market',
          amount: -124.5,
          type: 'debit',
          category: 'Groceries',
          status: 'Completed',
        },
        {
          id: 'txn_4',
          date: new Date(MOCK_DATE_NOW - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'P2P from Jane Smith',
          amount: 50.0,
          type: 'credit',
          category: 'Transfers',
          status: 'Completed',
        },
        {
          id: 'txn_5',
          date: new Date(MOCK_DATE_NOW - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Gas Station',
          amount: -45.25,
          type: 'debit',
          category: 'Transport',
          status: 'Completed',
        },
      ],
    },
    {
      id: 'acc_sav_1',
      type: 'Savings',
      accountNumber: '**** **** **** 5678',
      balance: 28750.0,
      transactions: [
        {
          id: 'txn_6',
          date: new Date(MOCK_DATE_NOW - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Monthly Interest',
          amount: 35.80,
          type: 'credit',
          category: 'Interest',
          status: 'Completed',
        },
        {
          id: 'txn_7',
          date: new Date(MOCK_DATE_NOW - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: 'Transfer to Checking',
          amount: -500.0,
          type: 'debit',
          category: 'Transfers',
          status: 'Completed',
        },
      ],
    },
  ],
  cards: [
    {
      id: 'card_1',
      type: 'Physical',
      provider: 'Visa',
      lastFour: '1234',
      expiryDate: '12/26',
      isFrozen: false,
    },
    {
      id: 'card_2',
      type: 'Virtual',
      provider: 'Mastercard',
      lastFour: '9876',
      expiryDate: '06/25',
      isFrozen: true,
    },
  ],
  investments: {
    totalValue: 75320.45,
    totalGainLoss: 12820.45,
    totalGainLossPercent: 20.5,
    holdings: [
        { id: 'inv_1', name: 'Apple Inc.', ticker: 'AAPL', shares: 50, price: 195.50, value: 9775.00, changePercent: 1.2 },
        { id: 'inv_2', name: 'Tesla, Inc.', ticker: 'TSLA', shares: 30, price: 250.10, value: 7503.00, changePercent: -0.8 },
        { id: 'inv_3', name: 'Vanguard S&P 500 ETF', ticker: 'VOO', shares: 100, price: 450.42, value: 45042.45, changePercent: 0.5 },
        { id: 'inv_4', name: 'Microsoft Corp.', ticker: 'MSFT', shares: 40, price: 325.00, value: 13000.00, changePercent: 0.9 },
    ],
    history: [
        { date: 'Jan', value: 60000 },
        { date: 'Feb', value: 62000 },
        { date: 'Mar', value: 65000 },
        { date: 'Apr', value: 68000 },
        { date: 'May', value: 71000 },
        { date: 'Jun', value: 75320.45 },
    ]
  },
};
