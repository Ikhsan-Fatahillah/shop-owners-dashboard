
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingBooking, setEditingBooking] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Available dates for dropdown
  const dateOptions = [
    { value: new Date().toISOString().split('T')[0], label: "Today" },
    { 
      value: new Date(Date.now() + 86400000).toISOString().split('T')[0], 
      label: "Tomorrow" 
    },
    { 
      value: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 2 * 86400000).toLocaleDateString() 
    },
    { 
      value: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 3 * 86400000).toLocaleDateString() 
    },
    { 
      value: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0], 
      label: new Date(Date.now() + 4 * 86400000).toLocaleDateString() 
    },
  ];

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
    const matchesDate = !selectedDate || booking.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const handleEditBooking = (booking: any) => {
    setEditingBooking({...booking});
    setIsEditDialogOpen(true);
  };

  const handleCancelBooking = (booking: any) => {
    // In a real application, this would call an API
    toast({
      title: "Booking Canceled",
      description: `Booking for ${booking.customer} has been canceled.`
    });
  };

  const handleSaveEdit = () => {
    // In a real application, this would call an API
    setIsEditDialogOpen(false);
    toast({
      title: "Booking Updated",
      description: `Booking for ${editingBooking.customer} has been updated.`
    });
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800";
      case "canceled":
        return "";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bookings</h1>
        <p className="text-gray-500">Manage your restaurant reservations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Reservations
          </CardTitle>
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
            <Select 
              value={selectedDate} 
              onValueChange={setSelectedDate}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Date" />
              </SelectTrigger>
              <SelectContent>
                {dateOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
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
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{booking.customer}</div>
                          <div className="text-sm text-muted-foreground">{booking.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.time}</TableCell>
                      <TableCell>{booking.tableType}</TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "confirmed" ? "default" : 
                            booking.status === "pending" ? "outline" : "destructive"
                          }
                          className={getStatusBadgeStyle(booking.status)}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditBooking(booking)}>
                              Edit
                            </DropdownMenuItem>
                            {booking.status !== "canceled" && (
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleCancelBooking(booking)}
                              >
                                Cancel
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
          </DialogHeader>
          {editingBooking && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Input 
                  value={editingBooking.customer} 
                  onChange={(e) => setEditingBooking({...editingBooking, customer: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input 
                    value={editingBooking.time} 
                    onChange={(e) => setEditingBooking({...editingBooking, time: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Guests</Label>
                  <Input 
                    type="number" 
                    value={editingBooking.guests} 
                    onChange={(e) => setEditingBooking({...editingBooking, guests: parseInt(e.target.value, 10)})} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Table Type</Label>
                  <Select 
                    value={editingBooking.tableType}
                    onValueChange={(value) => setEditingBooking({...editingBooking, tableType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select table type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Counter">Counter</SelectItem>
                      <SelectItem value="Window Seat">Window Seat</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Private Room">Private Room</SelectItem>
                      <SelectItem value="Tatami">Tatami</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={editingBooking.status}
                    onValueChange={(value) => setEditingBooking({...editingBooking, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input 
                  value={editingBooking.notes} 
                  onChange={(e) => setEditingBooking({...editingBooking, notes: e.target.value})} 
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
