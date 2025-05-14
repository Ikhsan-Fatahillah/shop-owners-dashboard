
import React, { useState } from "react";
import { BookOpen, Calendar, UserCheck, Clock, ToggleLeft, ToggleRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [aiEnabled, setAiEnabled] = useState(false);
  
  const toggleAi = () => {
    setAiEnabled(!aiEnabled);
    toast({
      title: aiEnabled ? "AI Assistant Disabled" : "AI Assistant Enabled",
      description: aiEnabled 
        ? "Voice reservation system is now offline" 
        : "Voice reservation system is now accepting calls",
    });
  };
  
  // Mock data for demonstration
  const recentBookings = [
    { id: 1, customer: "Tanaka Yuki", time: "18:30-20:00", date: "2025-05-14", guests: 4, status: "confirmed" },
    { id: 2, customer: "Smith John", time: "19:00-21:00", date: "2025-05-14", guests: 2, status: "confirmed" },
    { id: 3, customer: "Suzuki Akira", time: "17:30-19:00", date: "2025-05-15", guests: 6, status: "pending" },
    { id: 4, customer: "Lee Min", time: "12:30-14:00", date: "2025-05-15", guests: 3, status: "confirmed" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={toggleAi}
              >
                AI Assistant: {aiEnabled ? "On" : "Off"}
                {aiEnabled ? 
                  <ToggleRight className="h-5 w-5 text-green-500" /> : 
                  <ToggleLeft className="h-5 w-5 text-gray-400" />
                }
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-grow">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="shop">Shop Information</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="seating">Seating</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">4</span>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  +2 from yesterday
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Today's Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">12</span>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  +5 from yesterday
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl font-bold">68%</span>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  +12% from last week
                </CardFooter>
              </Card>
            </section>

            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>
                  View and manage your latest reservations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                  <div className="grid grid-cols-5 font-semibold py-2 px-4 bg-gray-50">
                    <div>Customer</div>
                    <div>Date</div>
                    <div>Time</div>
                    <div>Guests</div>
                    <div>Status</div>
                  </div>
                  <Separator />
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="grid grid-cols-5 py-3 px-4 hover:bg-gray-50">
                      <div>{booking.customer}</div>
                      <div>{booking.date}</div>
                      <div>{booking.time}</div>
                      <div>{booking.guests}</div>
                      <div>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "outline"}
                          className={
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                          }
                        >
                          {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline">View All Bookings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="shop">
            <Card>
              <CardHeader>
                <CardTitle>Shop Information</CardTitle>
                <CardDescription>Update your restaurant details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Configure your restaurant details, operating hours, and upload your menu here.</p>
                <Button>Edit Shop Information</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Manage Bookings</CardTitle>
                <CardDescription>View and manage your reservations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Search, filter, and manage all your bookings in one place.</p>
                <Button>View Calendar</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seating">
            <Card>
              <CardHeader>
                <CardTitle>Seating Management</CardTitle>
                <CardDescription>Configure your restaurant seating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Manage table types, seating capacity, and block time slots for special events.</p>
                <Button>Configure Seating</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Update your email address and change your password.</p>
                <Button>Edit Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-500 text-center">
            Restaurant Management System © 2025
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
