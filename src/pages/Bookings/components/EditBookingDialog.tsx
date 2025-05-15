
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Booking, TableReservation } from "./BookingsTable";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface EditBookingDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  booking: Booking | null;
  onSave: () => void;
  onBookingChange: (updatedBooking: Partial<Booking>) => void;
}

const EditBookingDialog: React.FC<EditBookingDialogProps> = ({
  isOpen,
  setIsOpen,
  booking,
  onSave,
  onBookingChange
}) => {
  const [newTableType, setNewTableType] = useState("");
  const [tableNumber, setTableNumber] = useState(1);
  
  if (!booking) return null;
  
  const tableTypes = ["Counter", "Window Seat", "Regular", "Private Room", "Tatami"];

  const handleAddTable = () => {
    if (!newTableType) return;
    
    const availableTableNumbers = Array.from(
      { length: 10 }, 
      (_, i) => i + 1
    ).filter(num => 
      !booking.tables.some(t => t.tableType === newTableType && t.tableNumber === num)
    );
    
    if (availableTableNumbers.length === 0) return;
    
    const newTable: TableReservation = {
      id: `${Date.now()}`,
      tableType: newTableType,
      tableNumber: tableNumber
    };
    
    onBookingChange({
      ...booking,
      tables: [...booking.tables, newTable]
    });
    
    setNewTableType("");
    setTableNumber(1);
  };

  const handleRemoveTable = (tableId: string) => {
    onBookingChange({
      ...booking,
      tables: booking.tables.filter(table => table.id !== tableId)
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Booking</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Customer</Label>
            <Input 
              id="customer"
              value={booking.customer} 
              onChange={(e) => onBookingChange({...booking, customer: e.target.value})} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                value={booking.time} 
                onChange={(e) => onBookingChange({...booking, time: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input 
                id="guests"
                type="number" 
                value={booking.guests} 
                onChange={(e) => onBookingChange({...booking, guests: parseInt(e.target.value, 10)})} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Tables</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {booking.tables.map(table => (
                <Badge key={table.id} variant="secondary" className="px-2 py-1 bg-blue-50">
                  {table.tableType} {table.tableNumber}
                  <button 
                    onClick={() => handleRemoveTable(table.id)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Select value={newTableType} onValueChange={setNewTableType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select table type" />
                </SelectTrigger>
                <SelectContent>
                  {tableTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={tableNumber.toString()} 
                onValueChange={(value) => setTableNumber(parseInt(value, 10))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="#" />
                </SelectTrigger>
                <SelectContent>
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button type="button" onClick={handleAddTable} size="sm">
                Add
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={booking.status}
              onValueChange={(value) => onBookingChange({...booking, status: value})}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Input 
              id="notes"
              value={booking.notes} 
              onChange={(e) => onBookingChange({...booking, notes: e.target.value})} 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={onSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookingDialog;
