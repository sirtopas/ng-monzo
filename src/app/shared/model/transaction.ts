import { Merchant } from './merchant';

export class Transaction {
    account_balance: number;
    amount: number;
    category: string;
    created: Date;
    currency: string;
    description: string;
    id: string;
    merchant: Merchant;
    metadata: string[];
    notes: string;
    is_load: boolean;
    settled: Date;
}
