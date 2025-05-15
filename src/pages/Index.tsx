
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BadgeCheck, Calendar } from "lucide-react";

const Index = () => {
  // Mock data for dashboard
  const todaysBookings = 12;
  const todaysCustomers = 38;
  const recentBookings = [
    { id: 1, customer: "Tanaka Yuki", time: "18:30", endTime: "19:30", tableType: "Window Seat", status: "confirmed" },
    { id: 2, customer: "Smith John", time: "19:00", endTime: "20:00", tableType: "Counter", status: "confirmed" },
    { id: 3, customer: "Suzuki Akira", time: "17:30", endTime: "18:30", tableType: "Private Room", status: "pending" },
  ];
  
  const [aiActivated, setAiActivated] = React.useState(true);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back to your restaurant management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Bookings */}
        <Card className="rounded-lg shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-blue-300" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysBookings}</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        {/* Today's Customers */}
        <Card className="rounded-lg shadow-sm border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Today's Customers</CardTitle>
            <BadgeCheck className="h-4 w-4 text-pink-200" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +8 from yesterday
            </p>
          </CardContent>
        </Card>

        {/* AI Activation */}
        <Card className="rounded-lg shadow-sm border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium">AI Activation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Switch 
              id="ai-activation" 
              checked={aiActivated}
              onCheckedChange={setAiActivated}
            />
            <Label htmlFor="ai-activation">
              {aiActivated ? "AI Assistant is active" : "AI Assistant is inactive"}
            </Label>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="rounded-lg shadow-sm border-0">
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{booking.customer}</p>
                  <p className="text-sm text-gray-500">Today at {booking.time} - {booking.endTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{booking.tableType}</p>
                  <p className="text-sm capitalize text-gray-500">{booking.status}</p>
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
