
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableType } from "../hooks/useTableTypes";
import { NewBlockedSlot } from "../hooks/useBlockedSlots";

type AddBlockedSlotDialogProps = {
  tableTypes: TableType[];
  newBlockedSlot: NewBlockedSlot;
  setNewBlockedSlot: React.Dispatch<React.SetStateAction<NewBlockedSlot>>;
  onAddBlockedSlot: () => void;
};

const AddBlockedSlotDialog = ({ 
  tableTypes, 
  newBlockedSlot, 
  setNewBlockedSlot, 
  onAddBlockedSlot 
}: AddBlockedSlotDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">Block New Time Slot</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block Time Slot</DialogTitle>
          <DialogDescription>
            Reserve tables for a special event or closure.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input 
              id="event-name" 
              placeholder="e.g., Private Party, Staff Meeting"
              value={newBlockedSlot.name}
              onChange={(e) => setNewBlockedSlot({...newBlockedSlot, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Calendar
              mode="single"
              selected={newBlockedSlot.date}
              onSelect={(date) => date && setNewBlockedSlot({...newBlockedSlot, date})}
              className="border rounded-md p-3 pointer-events-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <Input 
                id="start-time" 
                type="time"
                value={newBlockedSlot.startTime}
                onChange={(e) => setNewBlockedSlot({...newBlockedSlot, startTime: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input 
                id="end-time" 
                type="time"
                value={newBlockedSlot.endTime}
                onChange={(e) => setNewBlockedSlot({...newBlockedSlot, endTime: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="table-type">Table Type</Label>
            <Select 
              value={newBlockedSlot.tableType}
              onValueChange={(value) => setNewBlockedSlot({...newBlockedSlot, tableType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a table type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All tables">All tables (Full closure)</SelectItem>
                {tableTypes.map(table => (
                  <SelectItem key={table.id} value={table.name}>
                    {table.name} ({table.capacity} people × {table.quantity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newBlockedSlot.tableType && newBlockedSlot.tableType !== "All tables" && (
            <div className="space-y-2">
              <Label htmlFor="table-count">Number of Tables</Label>
              <Input 
                id="table-count" 
                type="number" 
                min="1"
                value={newBlockedSlot.tableCount}
                onChange={(e) => setNewBlockedSlot({...newBlockedSlot, tableCount: parseInt(e.target.value, 10)})}
                max={tableTypes.find(t => t.name === newBlockedSlot.tableType)?.quantity || 1}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onAddBlockedSlot}>Block Time Slot</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlockedSlotDialog;
