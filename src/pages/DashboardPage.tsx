import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import MainBottomTabBar from '@/components/layout/MainBottomTabBar';
import AccountSummaryCard from '@/components/AccountSummaryCard';
import AnimatedFinancialChart from '@/components/AnimatedFinancialChart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Send } from 'lucide-react';

const placeholderChartData = [
  { name: 'Jan', value: 3200 },
  { name: 'Feb', value: 4500 },
  { name: 'Mar', value: 3800 },
  { name: 'Apr', value: 5200 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 6100 },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  console.log('DashboardPage loaded');

  const handleViewDetails = (accountId: string) => {
    navigate(`/account-details/${accountId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title="Dashboard" />
      <ScrollArea className="flex-grow app-content-height-subtract-header-footer">
        <main className="container mx-auto px-4 py-6 space-y-6">
          <section aria-labelledby="welcome-message">
            <h1 id="welcome-message" className="text-2xl font-semibold">Welcome Back, User!</h1>
            <p className="text-muted-foreground">Here's your financial overview.</p>
          </section>

          <section aria-labelledby="account-summaries" className="space-y-4">
            <h2 id="account-summaries" className="text-xl font-semibold">Your Accounts</h2>
            <AccountSummaryCard
              accountId="acc_primary_001"
              accountName="Primary Checking"
              accountType="Checking Account"
              balance={10580.75}
              currency="USD"
              onViewDetails={handleViewDetails}
            />
            <AccountSummaryCard
              accountId="acc_savings_002"
              accountName="High-Yield Savings"
              accountType="Savings Account"
              balance={25300.20}
              currency="USD"
              onViewDetails={handleViewDetails}
            />
             <AccountSummaryCard
              accountId="acc_joint_003"
              accountName="Joint Account with Jane"
              accountType="Joint Savings"
              balance={7200.50}
              currency="USD"
              onViewDetails={handleViewDetails}
            />
          </section>

          <section aria-labelledby="financial-chart">
            <h2 id="financial-chart" className="sr-only">Financial Chart</h2>
            <AnimatedFinancialChart data={placeholderChartData} title="6-Month Spending Trend" lineColor="hsl(var(--primary))" />
          </section>
          
          <section aria-labelledby="quick-actions" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <h2 id="quick-actions" className="text-xl font-semibold col-span-full">Quick Actions</h2>
            <Button size="lg" onClick={() => navigate('/payment')} className="w-full">
              <Send className="mr-2 h-5 w-5" /> Make a Payment
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/joint-account-setup')} className="w-full">
              <PlusCircle className="mr-2 h-5 w-5" /> Open New Account
            </Button>
          </section>
        </main>
      </ScrollArea>
      <MainBottomTabBar />
      <style jsx global>{`
        .app-content-height-subtract-header-footer {
          height: calc(100vh - 56px - 64px); /* 56px for header, 64px for bottom tab bar */
        }
        @media (min-width: 768px) { /* md breakpoint */
          .app-content-height-subtract-header-footer {
             height: calc(100vh - 56px); /* Only header height on desktop, as tab bar is hidden */
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;