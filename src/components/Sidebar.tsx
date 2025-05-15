
import {
  Book,
  Calendar,
  LayoutDashboard,
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
} from "@/components/ui/sidebar";

const MainSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
    <Sidebar>
      <SidebarContent>
        <div className="px-3 py-4">
          <h2 className="mb-6 flex items-center px-2 text-lg font-semibold tracking-tight text-primary">
            FoodBooker
          </h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Restaurant Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    tooltip={item.title}
                    className={`${location.pathname === item.path ? 'bg-primary/10 text-primary' : ''}`}
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
