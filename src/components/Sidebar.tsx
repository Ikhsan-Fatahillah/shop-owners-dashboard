
import {
  Book,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const MainSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar } = useSidebar();
  
  // Define menu items
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Shop Information",
      path: "/shop",
      icon: Book,
    },
    {
      title: "Bookings",
      path: "/bookings",
      icon: Calendar,
    },
    {
      title: "Seating",
      path: "/seating",
      icon: Users,
    },
    {
      title: "Account",
      path: "/account",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="flex items-center justify-between px-4 py-6">
          <h2 className="text-xl font-bold tracking-tight text-white">
            FoodBooker
          </h2>
          <button 
            onClick={toggleSidebar}
            className="h-8 w-8 rounded-md p-1.5 text-sidebar-foreground hover:bg-dashboard-primary/30 hover:text-white transition-colors md:hidden"
            aria-label="Toggle sidebar"
          >
            {state === 'expanded' ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Restaurant Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                    className={`hover:bg-dashboard-primary/20 hover:text-white ${location.pathname === item.path 
                      ? 'bg-dashboard-primary text-white font-medium' 
                      : 'text-sidebar-foreground'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default MainSidebar;
