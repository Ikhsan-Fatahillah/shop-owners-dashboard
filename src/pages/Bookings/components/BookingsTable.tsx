
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
import { Edit } from "lucide-react";

export interface TableReservation {
  id: string;
  tableType: string;
  tableNumber: number;
}

export interface Booking {
  id: number;
  customer: string;
  phone: string;
  time: string;
  endTime?: string;
  date: string;
  guests: number;
  tables: TableReservation[];
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
  onEditBooking
}) => {
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800";
      default:
        return "";
    }
  };

  const formatTableList = (tables: TableReservation[]) => {
    if (!tables || tables.length === 0) return "No tables";
    
    return tables.map(table => 
      `${table.tableType} ${table.tableNumber}`
    ).join(", ");
  };

  const formatTimeRange = (startTime: string, endTime?: string) => {
    if (!endTime) return startTime;
    return `${startTime} - ${endTime}`;
  };

  return (
    <div className="rounded-md border border-blue-100/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-soft-blue-50">
          <TableRow className="hover:bg-soft-blue-100/50">
            <TableHead className="font-medium">Customer</TableHead>
            <TableHead className="font-medium">Time</TableHead>
            <TableHead className="font-medium">Tables</TableHead>
            <TableHead className="font-medium">Guests</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="text-right font-medium">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="hover:bg-soft-blue-50/30 transition-colors">
              <TableCell>
                <div>
                  <div className="font-medium">{booking.customer}</div>
                  <div className="text-sm text-muted-foreground">{booking.phone}</div>
                </div>
              </TableCell>
              <TableCell>{formatTimeRange(booking.time, booking.endTime)}</TableCell>
              <TableCell>{formatTableList(booking.tables)}</TableCell>
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
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onEditBooking(booking)}
                  className="h-8 w-8 p-0 hover:bg-soft-purple-100 transition-colors"
                >
                  <Edit className="h-4 w-4 text-soft-purple-400" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
