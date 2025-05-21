
import { Menu, Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

const MainHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-4 backdrop-blur-sm md:px-6">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="text-dashboard-text-secondary hover:bg-dashboard-secondary hover:text-dashboard-primary"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1 flex items-center">
        <div className="hidden sm:flex relative max-w-md w-full mr-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-dashboard-text-secondary" />
          <Input 
            placeholder="Search..." 
            className="pl-9 bg-dashboard-background border-gray-200 focus-visible:ring-dashboard-primary"
          />
        </div>
        <h1 className="text-xl font-semibold text-dashboard-text-primary">Restaurant Management</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-dashboard-text-secondary hover:bg-dashboard-secondary hover:text-dashboard-primary">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="h-9 w-9 rounded-full bg-dashboard-primary text-white flex items-center justify-center font-medium shadow-sm">
          RM
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
