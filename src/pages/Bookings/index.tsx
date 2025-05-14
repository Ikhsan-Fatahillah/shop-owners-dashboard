
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import BookingFilters from "./components/BookingFilters";
import BookingsTable, { Booking } from "./components/BookingsTable";
import EditBookingDialog from "./components/EditBookingDialog";
import { generateDateOptions, mockBookingsData } from "./utils/bookingData";

const Bookings = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Date options for dropdown
  const dateOptions = generateDateOptions();

  // Filter bookings based on search query, selected date, and status
  const filteredBookings = mockBookingsData.filter(booking => {
    const matchesSearch = booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          booking.phone.includes(searchQuery);
    const matchesDate = !selectedDate || booking.date === selectedDate;
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    
    return matchesSearch && matchesDate && matchesStatus;
  });

  const handleEditBooking = (booking: Booking) => {
    setEditingBooking({...booking});
    setIsEditDialogOpen(true);
  };

  const handleCancelBooking = (booking: Booking) => {
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
      description: `Booking for ${editingBooking?.customer} has been updated.`
    });
  };

  const handleBookingChange = (updatedBooking: Partial<Booking>) => {
    if (editingBooking) {
      setEditingBooking({...editingBooking, ...updatedBooking});
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
          <BookingFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            dateOptions={dateOptions}
          />
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No bookings found for the selected criteria</p>
            </div>
          ) : (
            <BookingsTable 
              bookings={filteredBookings}
              onEditBooking={handleEditBooking}
              onCancelBooking={handleCancelBooking}
            />
          )}
        </CardContent>
      </Card>

      <EditBookingDialog
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        booking={editingBooking}
        onSave={handleSaveEdit}
        onBookingChange={handleBookingChange}
      />
    </div>
  );
};

export default Bookings;
