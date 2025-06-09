import React from 'react';
import { format } from 'date-fns';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'; // Icons for credit/debit

interface TransactionRowProps {
  date: Date | string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  currency?: string;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  date,
  description,
  amount,
  type,
  currency = 'USD',
}) => {
  console.log("Rendering TransactionRow:", description);
  const formattedDate = typeof date === 'string' ? format(new Date(date), 'MMM dd, yyyy') : format(date, 'MMM dd, yyyy');
  const isCredit = type === 'credit';
  const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
  const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;

  return (
    <div className="flex items-center justify-between py-3 px-1 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
          <Icon className={`h-4 w-4 ${isCredit ? 'text-green-700' : 'text-red-700'}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{description}</p>
          <p className="text-xs text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className={`text-sm font-semibold ${amountColor}`}>
        {isCredit ? '+' : '-'}
        {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(Math.abs(amount))}
      </div>
    </div>
  );
};

export default TransactionRow;