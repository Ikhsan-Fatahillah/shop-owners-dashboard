
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock booking data
  const bookingsData = [
    { 
      id: 1, 
      customer: "Tanaka Yuki", 
      phone: "+81 90-1234-5678", 
      time: "18:30-20:00", 
      date: "2025-05-14", 
      guests: 4, 
      tableType: "Window Seat", 
      status: "confirmed",
      notes: "Anniversary dinner, requested quiet corner" 
    },
    { 
      id: 2, 
      customer: "Smith John", 
      phone: "+81 80-9876-5432", 
      time: "19:00-21:00", 
      date: "2025-05-14", 
      guests: 2, 
      tableType: "Counter", 
      status: "confirmed",
      notes: "" 
    },
    { 
      id: 3, 
      customer: "Suzuki Akira", 
      phone: "+81 70-2468-1357", 
      time: "17:30-19:00", 
      date: "2025-05-15", 
      guests: 6, 
      tableType: "Private Room", 
      status: "pending",
      notes: "Birthday celebration, bringing cake" 
    },
    { 
      id: 4, 
      customer: "Lee Min", 
      phone: "+81 90-1357-2468", 
      time: "12:30-14:00", 
      date: "2025-05-15", 
      guests: 3, 
      tableType: "Regular", 
      status: "confirmed",
      notes: "" 
    },
    { 
      id: 5, 
      customer: "Yamada Taro", 
      phone: "+81 80-2468-1357", 
      time: "20:00-22:00", 
      date: "2025-05-16", 
      guests: 2, 
      tableType: "Counter", 
      status: "canceled",
      notes: "Canceled due to illness" 
    },
  ];

  // Filter bookings based on search query, selected date, and status
  const filteredBookings = bookingsData.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.phone.includes(searchQuery);
    const matchesDate = !selectedDate || booking.date === selectedDate.toISOString().split('T')[0];
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-gray-500">Manage your restaurant reservations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3"
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Input 
                placeholder="Search by customer name or phone" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Select 
                value={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found for the selected criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row justify-between mb-2">
                      <h3 className="font-medium">{booking.customer}</h3>
                      <Badge
                        variant={
                          booking.status === "confirmed" ? "default" : 
                          booking.status === "pending" ? "outline" : "destructive"
                        }
                        className={
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                            : ""
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p>{formatDate(booking.date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p>{booking.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Guests</p>
                        <p>{booking.guests} people</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Table</p>
                        <p>{booking.tableType}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="text-sm text-gray-500">Contact</p>
                        <p>{booking.phone}</p>
                      </div>
                      {booking.notes && (
                        <div className="sm:col-span-2">
                          <p className="text-sm text-gray-500">Notes</p>
                          <p>{booking.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      {booking.status !== "canceled" && (
                        <Button variant="destructive" size="sm">Cancel</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookings;
