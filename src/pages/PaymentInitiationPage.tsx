import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const paymentSchema = z.object({
  fromAccountId: z.string().min(1, "Please select a source account."),
  recipientName: z.string().min(2, "Recipient name is required."),
  recipientAccount: z.string().min(5, "Recipient account number is required."), // Simplified validation
  amount: z.coerce.number().positive("Amount must be positive."),
  reference: z.string().optional(),
  scheduleDate: z.string().optional(), // For simplicity, using string. Could be Date.
});

type PaymentFormData = z.infer<typeof paymentSchema>;

// Placeholder accounts for the select dropdown
const userAccounts = [
  { id: 'acc_primary_001', name: 'Primary Checking (Balance: $10,580.75)' },
  { id: 'acc_savings_002', name: 'High-Yield Savings (Balance: $25,300.20)' },
  { id: 'acc_joint_003', name: 'Joint Account (Balance: $7,200.50)' },
];

const PaymentInitiationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [submittedData, setSubmittedData] = useState<PaymentFormData | null>(null);

  // Pre-fill source account if passed from AccountDetailsPage
  const initialFromAccountId = location.state?.fromAccountId || "";

  console.log('PaymentInitiationPage loaded');

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      fromAccountId: initialFromAccountId,
      recipientName: "",
      recipientAccount: "",
      amount: undefined,
      reference: "",
      scheduleDate: "",
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    console.log('Payment submitted:', data);
    setSubmittedData(data);
    // In a real app, an API call would be made here
    // After successful API call:
    setShowConfirmationDialog(true);
  };

  const handleDialogClose = () => {
    setShowConfirmationDialog(false);
    navigate('/dashboard'); // Or to account details page
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title="Make a Payment" showBackButton={true} />
      <ScrollArea className="flex-grow app-content-height-subtract-header">
        <main className="container mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Funds</CardTitle>
              <CardDescription>Securely send money to another account.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fromAccountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Account</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source account" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {userAccounts.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipient Account Number</FormLabel>
                        <FormControl><Input placeholder="Enter account number or identifier" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (USD)</FormLabel>
                        <FormControl><Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference (Optional)</FormLabel>
                        <FormControl><Input placeholder="e.g., Rent payment" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="scheduleDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Schedule Date (Optional)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormDescription>Leave blank to send immediately.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Dialog>
                    <DialogTrigger asChild>
                       <Button type="button" size="lg" className="w-full" 
                         // A bit of a hack to trigger validation before opening dialog
                         onClick={async () => {
                           const isValid = await form.trigger();
                           if (isValid) {
                             setSubmittedData(form.getValues());
                           } else {
                             // Prevent dialog open if form is not valid
                             // This relies on DialogTrigger not opening if we don't click it effectively
                             // A better way would be to control Dialog open state manually
                           }
                         }}
                         // Disable dialog trigger if form is invalid, needs manual open control for Dialog
                       >Review Payment</Button>
                    </DialogTrigger>
                     {/* Conditional rendering of DialogContent might be better, controlled by a state variable */}
                    {submittedData && form.formState.isValid && ( 
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Payment</DialogTitle>
                          <DialogDescription>
                            Please review the payment details before confirming.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-2 text-sm">
                          <p><strong>From:</strong> {userAccounts.find(a => a.id === submittedData.fromAccountId)?.name.split(' (')[0]}</p>
                          <p><strong>To:</strong> {submittedData.recipientName} ({submittedData.recipientAccount})</p>
                          <p><strong>Amount:</strong> ${submittedData.amount.toFixed(2)}</p>
                          {submittedData.reference && <p><strong>Reference:</strong> {submittedData.reference}</p>}
                          {submittedData.scheduleDate && <p><strong>Scheduled for:</strong> {new Date(submittedData.scheduleDate).toLocaleDateString()}</p>}
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setSubmittedData(null)}>Cancel</Button>
                           {/* This button is the one that actually submits the form data */}
                          <Button onClick={() => form.handleSubmit(onSubmit)()} className="bg-brand-blue hover:bg-brand-blue/90">Confirm & Send</Button>
                        </DialogFooter>
                      </DialogContent>
                    )}
                  </Dialog>

                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </ScrollArea>
      
      {/* Separate dialog for final success confirmation */}
      <Dialog open={showConfirmationDialog} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Successful!</DialogTitle>
            <DialogDescription>
              Your payment has been initiated. Amount: ${submittedData?.amount?.toFixed(2)}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleDialogClose}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .app-content-height-subtract-header {
          height: calc(100vh - 56px); 
        }
      `}</style>
    </div>
  );
};

export default PaymentInitiationPage;