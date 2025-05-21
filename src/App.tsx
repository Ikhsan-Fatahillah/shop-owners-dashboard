
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainSidebar from "@/components/Sidebar";
import MainHeader from "@/components/MainHeader";
import Index from "./pages/Index";
import ShopInfo from "./pages/ShopInfo";
import Bookings from "./pages/Bookings";
import Seating from "./pages/Seating";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full bg-dashboard-background">
            <MainSidebar />
            <div className="flex-1">
              <MainHeader />
              <div className="p-4 md:p-6">
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<ShopInfo />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/seating" element={<Seating />} />
                  <Route path="/account" element={<Account />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
