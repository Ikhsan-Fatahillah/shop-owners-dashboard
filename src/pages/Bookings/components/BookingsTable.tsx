
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
        return "";
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Tables</TableHead>
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
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4 text-blue-400" />
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
