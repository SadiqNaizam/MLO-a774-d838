import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import generated pages
import DashboardPage from "./pages/DashboardPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import JointAccountSetupFlowPage from "./pages/JointAccountSetupFlowPage";
import PaymentInitiationPage from "./pages/PaymentInitiationPage";
import SettingsDashboardPage from "./pages/SettingsDashboardPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

// Apply dark theme globally for demonstration purposes if not already handled by a theme provider
// In a real app, this might be handled in index.html or a ThemeProvider component
if (typeof window !== 'undefined') {
  document.documentElement.classList.add('dark'); // Enforce dark mode
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Use the renamed import */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} /> {/* Dashboard as the main entry point */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/account-details/:accountId" element={<AccountDetailsPage />} />
          <Route path="/joint-account-setup" element={<JointAccountSetupFlowPage />} />
          <Route path="/payment" element={<PaymentInitiationPage />} />
          <Route path="/settings" element={<SettingsDashboardPage />} />
          
          {/* Other existing routes can be placed here */}
          
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;