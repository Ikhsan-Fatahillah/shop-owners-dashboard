
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BadgeCheck, Calendar, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data for dashboard
  const todaysBookings = 12;
  const todaysCustomers = 38;
  const recentBookings = [
    { id: 1, customer: "Tanaka Yuki", time: "18:30", endTime: "19:30", tableType: "Window Seat", status: "confirmed", rating: 4.8 },
    { id: 2, customer: "Smith John", time: "19:00", endTime: "20:00", tableType: "Counter", status: "confirmed", rating: 5.0 },
    { id: 3, customer: "Suzuki Akira", time: "17:30", endTime: "18:30", tableType: "Private Room", status: "pending", rating: 4.6 },
  ];
  
  const [aiActivated, setAiActivated] = React.useState(true);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your restaurant management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Today's Bookings */}
        <Card className="rounded-xl shadow-sm border-0 overflow-hidden">
          <div className="h-2 bg-dashboard-accent-yellow"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-dashboard-accent-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysBookings}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-status-success mr-1">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Today's Customers */}
        <Card className="rounded-xl shadow-sm border-0 overflow-hidden">
          <div className="h-2 bg-dashboard-primary"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Customers</CardTitle>
            <BadgeCheck className="h-4 w-4 text-dashboard-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysCustomers}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-status-success mr-1">+8</span> from yesterday
            </p>
          </CardContent>
        </Card>

        {/* AI Activation */}
        <Card className="rounded-xl shadow-sm border-0 overflow-hidden">
          <div className="h-2 bg-dashboard-accent-lime"></div>
          <CardHeader>
            <CardTitle className="text-sm font-medium">AI Activation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Switch 
              id="ai-activation" 
              checked={aiActivated}
              onCheckedChange={setAiActivated}
              className="data-[state=checked]:bg-dashboard-primary"
            />
            <Label htmlFor="ai-activation">
              {aiActivated ? "AI Assistant is active" : "AI Assistant is inactive"}
            </Label>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="rounded-xl shadow-sm border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bookings</CardTitle>
          <Button variant="ghost" size="sm" className="text-dashboard-primary">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{booking.customer}</p>
                    <Badge variant={booking.status === "confirmed" ? "lime" : "yellow"} className="capitalize">
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">Today at {booking.time} - {booking.endTime}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium">{booking.tableType}</div>
                  <div className="flex items-center justify-end mt-1">
                    <Star className="h-3 w-3 fill-dashboard-accent-yellow text-dashboard-accent-yellow mr-1" />
                    <span className="text-sm">{booking.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
