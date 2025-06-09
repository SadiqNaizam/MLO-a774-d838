import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface AccountSummaryCardProps {
  accountId: string;
  accountName: string;
  accountType: string;
  balance: number;
  currency?: string;
  onViewDetails?: (accountId: string) => void;
}

const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  accountId,
  accountName,
  accountType,
  balance,
  currency = 'USD',
  onViewDetails,
}) => {
  console.log("Rendering AccountSummaryCard for:", accountName);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{accountName}</CardTitle>
                <CardDescription>{accountType}</CardDescription>
            </div>
            {/* Optional: Status badge or icon */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(balance)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">Available Balance</p>
      </CardContent>
      {onViewDetails && (
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={() => onViewDetails(accountId)}>
            View Details <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AccountSummaryCard;