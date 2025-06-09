import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import MainBottomTabBar from '@/components/layout/MainBottomTabBar';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import TransactionRow from '@/components/TransactionRow';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRightLeft, FileText, Users } from 'lucide-react';

// Placeholder data
const accountsData: { [key: string]: any } = {
  acc_primary_001: {
    accountId: 'acc_primary_001',
    accountName: 'Primary Checking',
    accountType: 'Checking Account',
    balance: 10580.75,
    currency: 'USD',
    accountNumber: '**** **** **** 1234',
    sortCode: '00-11-22',
    isJoint: false,
    transactions: [
      { date: '2024-07-28', description: 'Salary Deposit', amount: 3500, type: 'credit' },
      { date: '2024-07-27', description: 'Grocery Shopping', amount: -75.50, type: 'debit' },
      { date: '2024-07-25', description: 'Online Subscription', amount: -12.99, type: 'debit' },
    ],
  },
  acc_savings_002: {
    accountId: 'acc_savings_002',
    accountName: 'High-Yield Savings',
    accountType: 'Savings Account',
    balance: 25300.20,
    currency: 'USD',
    accountNumber: '**** **** **** 5678',
    sortCode: '11-22-33',
    isJoint: false,
    transactions: [
      { date: '2024-07-15', description: 'Initial Deposit', amount: 25000, type: 'credit' },
      { date: '2024-07-20', description: 'Interest Earned', amount: 300.20, type: 'credit' },
    ],
  },
    acc_joint_003: {
    accountId: 'acc_joint_003',
    accountName: 'Joint Account with Jane',
    accountType: 'Joint Savings',
    balance: 7200.50,
    currency: 'USD',
    accountNumber: '**** **** **** 9012',
    sortCode: '22-33-44',
    isJoint: true,
    members: [{name: 'You'}, {name: 'Jane Doe'}],
    transactions: [
      { date: '2024-07-25', description: 'Contribution from Jane', amount: 3000, type: 'credit' },
      { date: '2024-07-26', description: 'Home Depot Purchase', amount: -250.00, type: 'debit' },
    ],
  }
};

const AccountDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const navigate = useNavigate();
  console.log('AccountDetailsPage loaded for accountId:', accountId);

  if (!accountId || !accountsData[accountId]) {
    // Handle account not found, perhaps redirect or show an error
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header title="Error" showBackButton={true} />
        <main className="flex-grow container mx-auto px-4 py-6 text-center">
          <p>Account not found.</p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </main>
        <MainBottomTabBar />
      </div>
    );
  }

  const account = accountsData[accountId];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title={account.accountName} showBackButton={true} />
      <ScrollArea className="flex-grow app-content-height-subtract-header-footer">
        <main className="container mx-auto px-4 py-6 space-y-6">
          <AccountSummaryCard {...account} />

          <div className="flex space-x-2">
            <Button className="flex-1" onClick={() => navigate('/payment', { state: { fromAccountId: account.accountId } })}>
              <ArrowRightLeft className="mr-2 h-4 w-4" /> Make a Transfer
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" /> View Statements
            </Button>
          </div>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              {account.isJoint && <TabsTrigger value="members">Manage Members</TabsTrigger>}
            </TabsList>
            <TabsContent value="transactions">
              <Card>
                <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {account.transactions.length > 0 ? (
                    account.transactions.map((tx: any, index: number) => (
                      <TransactionRow key={index} {...tx} currency={account.currency} />
                    ))
                  ) : (
                    <p className="text-muted-foreground">No transactions yet.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details">
              <Card>
                <CardHeader><CardTitle>Account Information</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span>{account.accountName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Number:</span>
                    <span>{account.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sort Code:</span>
                    <span>{account.sortCode}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency:</span>
                    <span>{account.currency}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {account.isJoint && (
              <TabsContent value="members">
                <Card>
                  <CardHeader><CardTitle>Joint Account Members</CardTitle></CardHeader>
                  <CardContent className="space-y-3">
                    {account.members.map((member: {name: string}, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                            <p>{member.name}</p>
                            {/* Placeholder for actual permission management UI */}
                            <Button variant="outline" size="sm">View Permissions</Button>
                        </div>
                    ))}
                    <Button className="w-full mt-4" onClick={() => navigate(`/joint-account-setup?accountId=${account.accountId}&flow=managePermissions`)}>
                      <Users className="mr-2 h-4 w-4" /> Manage Permissions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </main>
      </ScrollArea>
      <MainBottomTabBar />
      <style jsx global>{`
        .app-content-height-subtract-header-footer {
          height: calc(100vh - 56px - 64px);
        }
        @media (min-width: 768px) {
          .app-content-height-subtract-header-footer {
             height: calc(100vh - 56px);
          }
        }
      `}</style>
    </div>
  );
};

export default AccountDetailsPage;