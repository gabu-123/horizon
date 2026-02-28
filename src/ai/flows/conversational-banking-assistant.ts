'use server';
/**
 * @fileOverview An AI-powered financial assistant for Horizon Bank customers.
 *
 * - conversationalBankingAssistant - A function that handles natural language queries about banking services.
 * - ConversationalBankingAssistantInput - The input type for the conversationalBankingAssistant function.
 * - ConversationalBankingAssistantOutput - The return type for the conversationalBankingAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationalBankingAssistantInputSchema = z.object({
  query: z
    .string()
    .describe('The natural language query from the customer.'),
});
export type ConversationalBankingAssistantInput = z.infer<
  typeof ConversationalBankingAssistantInputSchema
>;

const ConversationalBankingAssistantOutputSchema = z.object({
  response: z.string().describe('The AI financial assistant\'s answer.'),
});
export type ConversationalBankingAssistantOutput = z.infer<
  typeof ConversationalBankingAssistantOutputSchema
>;

// Mock data for demonstration purposes
const mockAccountBalances = {
  checking: 1542.75,
  savings: 8765.20,
};

type MockTransaction = {
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
};

const mockTransactionHistory: {
  checking: MockTransaction[];
  savings: MockTransaction[];
} = {
  checking: [
    {date: '2023-10-26', description: 'Grocery Store', amount: -75.30, type: 'debit'},
    {date: '2023-10-25', description: 'Paycheck', amount: 1500.00, type: 'credit'},
    {date: '2023-10-24', description: 'Coffee Shop', amount: -5.50, type: 'debit'},
  ],
  savings: [
    {date: '2023-10-20', description: 'Interest Payment', amount: 8.70, type: 'credit'},
    {date: '2023-10-15', description: 'Transfer from Checking', amount: 500.00, type: 'credit'},
  ],
};

/**
 * Retrieves the current balance for a specified account type.
 */
const getAccountBalanceTool = ai.defineTool(
  {
    name: 'getAccountBalance',
    description: 'Retrieves the current balance for a specified account type (e.g., \'checking\', \'savings\').',
    inputSchema: z.object({
      accountType: z
        .enum(['checking', 'savings'])
        .describe('The type of account (e.g., \'checking\', \'savings\').'),
    }),
    outputSchema: z.number().describe('The current balance of the account.'),
  },
  async input => {
    // In a real application, this would call a banking service API.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const balance = mockAccountBalances[input.accountType];
    if (balance === undefined) {
      throw new Error(`Account type ${input.accountType} not found.`);
    }
    return balance;
  }
);

/**
 * Retrieves the recent transaction history for a specified account type.
 */
const getTransactionHistoryTool = ai.defineTool(
  {
    name: 'getTransactionHistory',
    description: 'Retrieves the recent transaction history for a specified account type (e.g., \'checking\', \'savings\'). Can specify a limit for the number of transactions.',
    inputSchema: z.object({
      accountType: z
        .enum(['checking', 'savings'])
        .describe('The type of account (e.g., \'checking\', \'savings\').'),
      limit: z
        .number()
        .optional()
        .describe('Optional: The maximum number of transactions to retrieve.'),
    }),
    outputSchema: z.array(
      z.object({
        date: z.string().describe('The date of the transaction (YYYY-MM-DD).'),
        description: z.string().describe('A description of the transaction.'),
        amount: z.number().describe('The amount of the transaction.'),
        type: z
          .enum(['credit', 'debit'])
          .describe('The type of transaction (credit or debit).'),
      })
    ),
  },
  async (input) => {
    // In a real application, this would call a banking service API.
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    const history = mockTransactionHistory[input.accountType];
    if (!history) {
      throw new Error(`Account type ${input.accountType} not found.`);
    }
    return input.limit ? history.slice(0, input.limit) : history;
  }
);

const conversationalBankingAssistantPrompt = ai.definePrompt({
  name: 'conversationalBankingAssistantPrompt',
  input: {schema: ConversationalBankingAssistantInputSchema},
  output: {schema: ConversationalBankingAssistantOutputSchema},
  tools: [getAccountBalanceTool, getTransactionHistoryTool],
  prompt: `You are Horizon Bank's AI Financial Assistant, designed to help customers with their banking queries. You can answer questions about their account balance, transaction history, or general banking services.

Be polite, helpful, and concise. If you need more information to answer a question (e.g., which account type for a balance inquiry), ask clarifying questions.

If the user asks for account balance or transaction history, use the appropriate tools available to you. Otherwise, answer to the best of your knowledge about general banking services at Horizon Bank.

Customer Query: {{{query}}}`,
});

const conversationalBankingAssistantFlow = ai.defineFlow(
  {
    name: 'conversationalBankingAssistantFlow',
    inputSchema: ConversationalBankingAssistantInputSchema,
    outputSchema: ConversationalBankingAssistantOutputSchema,
  },
  async input => {
    const {output} = await conversationalBankingAssistantPrompt(input);
    return output!;
  }
);

export async function conversationalBankingAssistant(
  input: ConversationalBankingAssistantInput
): Promise<ConversationalBankingAssistantOutput> {
  return conversationalBankingAssistantFlow(input);
}