import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import MainBottomTabBar from '@/components/layout/MainBottomTabBar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Shield, UserCircle, Bell, Palette, FileText, LifeBuoy, LogOut } from 'lucide-react';

const SettingsDashboardPage = () => {
  const navigate = useNavigate();
  console.log('SettingsDashboardPage loaded');

  // Example states for switches - in a real app, these would come from user preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const [enableMFA, setEnableMFA] = useState(true);

  const handleLogout = () => {
    console.log("User logging out...");
    // Add actual logout logic here (clear tokens, redirect to login)
    navigate('/'); // Assuming '/' is login or public homepage after logout
  };


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header title="Settings" />
      <ScrollArea className="flex-grow app-content-height-subtract-header-footer">
        <main className="container mx-auto px-4 py-6">
          <Accordion type="multiple" defaultValue={['profile', 'security']} className="w-full space-y-4">
            
            <AccordionItem value="profile" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <UserCircle className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Profile Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Demo User" disabled />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="demo.user@example.com" disabled />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">Edit Profile</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Security Settings</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mfa-switch" className="flex flex-col space-y-0.5">
                    <span>Multi-Factor Authentication (MFA)</span>
                    <span className="text-xs text-muted-foreground">Enhance account security.</span>
                  </Label>
                  <Switch id="mfa-switch" checked={enableMFA} onCheckedChange={setEnableMFA} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="biometrics-switch" className="flex flex-col space-y-0.5">
                     <span>Enable Biometric Login</span>
                     <span className="text-xs text-muted-foreground">Use fingerprint or face ID.</span>
                  </Label>
                  <Switch id="biometrics-switch" checked={enableBiometrics} onCheckedChange={setEnableBiometrics} />
                </div>
                <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                <Button variant="outline" className="w-full sm:w-auto">Manage Connected Devices</Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="notifications" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Notification Preferences</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="appearance" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">App Appearance</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <p className="text-sm text-muted-foreground">Currently using default dark theme. More themes coming soon!</p>
                 {/* Example: Dark mode toggle if not system-wide
                 <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch id="dark-mode" checked={true} disabled />
                </div> 
                */}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legal" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Legal Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-2">
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => console.log("Navigate to Terms")}>Terms of Service</Button><br/>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => console.log("Navigate to Privacy")}>Privacy Policy</Button>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="support" className="border rounded-lg">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center space-x-3">
                  <LifeBuoy className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Help & Support</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2 space-y-2">
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => console.log("Navigate to FAQ")}>FAQ</Button><br/>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => console.log("Navigate to Contact Us")}>Contact Support</Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-5 w-5" /> Log Out
            </Button>
          </div>
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

export default SettingsDashboardPage;