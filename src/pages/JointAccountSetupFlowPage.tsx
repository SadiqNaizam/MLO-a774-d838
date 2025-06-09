import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import StepperIndicator from '@/components/StepperIndicator';
import JointAccountControls, { MemberPermissions } from '@/components/JointAccountControls';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // Using shadcn Form

const steps = ['Introduction', 'Invite Partner', 'Set Permissions', 'Review & Confirm'];

const invitePartnerSchema = z.object({
  partnerEmail: z.string().email({ message: "Invalid email address." }),
});

const initialPermissions: MemberPermissions = {
  fullAccess: false,
  viewOnly: true,
  transactionApprovalRequired: false,
  spendingLimit: undefined,
};

const JointAccountSetupFlowPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [invitationSent, setInvitationSent] = useState(false);
  const [partnerAccepted, setPartnerAccepted] = useState(false); // Simulate partner acceptance
  const [userPermissions, setUserPermissions] = useState<MemberPermissions>({...initialPermissions, fullAccess: true, viewOnly: false });
  const [partnerPermissions, setPartnerPermissions] = useState<MemberPermissions>(initialPermissions);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const navigate = useNavigate();
  console.log('JointAccountSetupFlowPage loaded, current step:', currentStep);

  const form = useForm<z.infer<typeof invitePartnerSchema>>({
    resolver: zodResolver(invitePartnerSchema),
    defaultValues: {
      partnerEmail: "",
    },
  });

  const handleNext = () => {
    if (currentStep === 1 && !partnerAccepted) { // After sending invite
        // Simulate time for partner to accept or manual trigger
        // For now, let's auto-accept for flow progression
        setTimeout(() => {
            setPartnerAccepted(true);
            // console.log("Partner 'accepted' invitation.");
            // alert("Partner has accepted the invitation! You can now set permissions.");
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
        }, 1000); // Simulate delay
    } else {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const onInviteSubmit = (values: z.infer<typeof invitePartnerSchema>) => {
    console.log('Sending invitation to:', values.partnerEmail);
    setInvitationSent(true);
    // In a real app, an API call would be made here.
    // For now, automatically proceed to "partner accepted" simulation after a delay.
    handleNext();
  };

  const handleCreateAccount = () => {
    console.log('Creating joint account with permissions:', { user: userPermissions, partner: partnerPermissions });
    setShowConfirmationDialog(true);
  };
  
  const stepTitles = [
    "Open a Joint Account",
    "Invite Your Partner",
    "Configure Permissions",
    "Review and Confirm"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title={stepTitles[currentStep]} showBackButton={currentStep > 0} onBackButtonClick={handleBack} />
      <div className="p-4 border-b">
        <StepperIndicator steps={steps} currentStep={currentStep} />
      </div>
      <ScrollArea className="flex-grow app-content-height-subtract-header-stepper">
        <main className="container mx-auto px-4 py-6">
          {currentStep === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Share Your Finances, Simply</CardTitle>
                <CardDescription>Open a joint account to easily manage shared expenses, save for common goals, and get a clearer view of your combined finances.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Seamlessly pool funds with your partner.</li>
                  <li>Track shared spending in one place.</li>
                  <li>Set individual permissions and limits.</li>
                  <li>Transparent and secure.</li>
                </ul>
                <Button onClick={handleNext} size="lg" className="w-full bg-brand-blue hover:bg-brand-blue/90">Start Setup</Button>
              </CardContent>
            </Card>
          )}

          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Invite Your Partner</CardTitle>
                <CardDescription>Enter the email address of the person you want to share this account with. They will receive an invitation to join.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onInviteSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="partnerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partner's Email</FormLabel>
                          <FormControl>
                            <Input placeholder="partner@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={invitationSent && !partnerAccepted}>
                      {invitationSent && !partnerAccepted ? 'Invitation Sent (Waiting...)' : 'Send Invitation'}
                    </Button>
                  </form>
                </Form>
                {invitationSent && partnerAccepted && (
                  <p className="mt-4 text-sm text-green-600">Partner has accepted! Proceed to set permissions.</p>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && partnerAccepted && (
            <div className="space-y-6">
              <JointAccountControls
                memberName="Your Permissions"
                permissions={userPermissions}
                onPermissionsChange={setUserPermissions}
              />
              <JointAccountControls
                memberName="Partner's Permissions (e.g., Jane Doe)"
                permissions={partnerPermissions}
                onPermissionsChange={setPartnerPermissions}
              />
              <Button onClick={handleNext} size="lg" className="w-full">Continue to Review</Button>
            </div>
          )}
           {currentStep === 2 && !partnerAccepted && (
             <div className="text-center p-8">
                <p className="text-muted-foreground">Waiting for partner to accept the invitation. Once accepted, you can set up permissions.</p>
                {/* Optionally add a manual "Check Status" or "Resend Invite" button */}
             </div>
           )}


          {currentStep === 3 && partnerAccepted && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Joint Account Setup</CardTitle>
                <CardDescription>Please review the details before creating the account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Your Permissions:</h3>
                  <pre className="p-2 bg-muted rounded-md text-sm overflow-x-auto">{JSON.stringify(userPermissions, null, 2)}</pre>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Partner's Permissions:</h3>
                  <pre className="p-2 bg-muted rounded-md text-sm overflow-x-auto">{JSON.stringify(partnerPermissions, null, 2)}</pre>
                </div>
                <Button onClick={handleCreateAccount} size="lg" className="w-full bg-brand-blue hover:bg-brand-blue/90">Create Joint Account</Button>
              </CardContent>
            </Card>
          )}
        </main>
      </ScrollArea>

      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Joint Account Created!</DialogTitle>
            <DialogDescription>
              Your new joint account has been successfully set up. You can now view it on your dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => { setShowConfirmationDialog(false); navigate('/dashboard'); }}>Go to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .app-content-height-subtract-header-stepper {
          /* Header height (56px) + Stepper area height (approx 80-100px, let's use 88px for stepper+padding) */
          height: calc(100vh - 56px - 88px); 
        }
      `}</style>
    </div>
  );
};

export default JointAccountSetupFlowPage;