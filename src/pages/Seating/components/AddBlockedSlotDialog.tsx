
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [selectedTableType, setSelectedTableType] = useState<string>("");
  const [selectedTableNumbers, setSelectedTableNumbers] = useState<number[]>([]);
  
  const handleTableTypeChange = (value: string) => {
    setSelectedTableType(value);
    setSelectedTableNumbers([]);
    
    setNewBlockedSlot({
      ...newBlockedSlot,
      tableType: value,
      tableCount: 0
    });
  };
  
  const handleTableNumberToggle = (tableNumber: number) => {
    const updatedTables = selectedTableNumbers.includes(tableNumber)
      ? selectedTableNumbers.filter(num => num !== tableNumber)
      : [...selectedTableNumbers, tableNumber];
      
    setSelectedTableNumbers(updatedTables);
    
    setNewBlockedSlot({
      ...newBlockedSlot,
      tableCount: updatedTables.length,
      selectedTables: updatedTables
    });
  };
  
  const selectedTableType = tableTypes.find(t => t.name === newBlockedSlot.tableType);
  const tableQuantity = selectedTableType ? selectedTableType.quantity : 0;
  
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
            <div className="border rounded-md">
              <Calendar
                mode="single"
                selected={newBlockedSlot.date}
                onSelect={(date) => date && setNewBlockedSlot({...newBlockedSlot, date})}
                className="p-3 w-full pointer-events-auto"
              />
            </div>
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
              onValueChange={handleTableTypeChange}
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
              <Label>Select Specific Tables</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Array.from({ length: tableQuantity }, (_, i) => i + 1).map(num => (
                  <div key={num} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`table-${num}`} 
                      checked={selectedTableNumbers.includes(num)}
                      onCheckedChange={() => handleTableNumberToggle(num)}
                    />
                    <Label htmlFor={`table-${num}`} className="text-sm">
                      {newBlockedSlot.tableType} {num}
                    </Label>
                  </div>
                ))}
              </div>
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
