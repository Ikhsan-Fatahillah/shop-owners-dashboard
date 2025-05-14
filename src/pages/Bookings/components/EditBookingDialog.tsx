
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Booking } from "./BookingsTable";

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
  if (!booking) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tableType">Table Type</Label>
              <Select 
                value={booking.tableType}
                onValueChange={(value) => onBookingChange({...booking, tableType: value})}
              >
                <SelectTrigger id="tableType">
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
