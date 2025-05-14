
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Booking {
  id: number;
  customer: string;
  phone: string;
  time: string;
  date: string;
  guests: number;
  tableType: string;
  status: string;
  notes: string;
}

interface BookingsTableProps {
  bookings: Booking[];
  onEditBooking: (booking: Booking) => void;
  onCancelBooking: (booking: Booking) => void;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ 
  bookings, 
  onEditBooking, 
  onCancelBooking 
}) => {
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
          {bookings.map((booking) => (
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
                    <DropdownMenuItem onClick={() => onEditBooking(booking)}>
                      Edit
                    </DropdownMenuItem>
                    {booking.status !== "canceled" && (
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => onCancelBooking(booking)}
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
  );
};

export default BookingsTable;
