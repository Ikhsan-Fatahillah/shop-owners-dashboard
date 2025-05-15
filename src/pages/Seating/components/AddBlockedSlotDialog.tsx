
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
  const [selectedTableNumbers, setSelectedTableNumbers] = useState<number[]>([]);
  
  const handleTableTypeChange = (value: string) => {
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
  
  // Find the selected table type from the tableTypes array
  const currentTableType = tableTypes.find(t => t.name === newBlockedSlot.tableType);
  // Get the quantity or default to 0 if not found
  const tableQuantity = currentTableType ? currentTableType.quantity : 0;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 text-blue-700">Block New Time Slot</Button>
      </DialogTrigger>
      <DialogContent className="bg-white/95 backdrop-blur-sm border border-blue-100">
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
              className="border-blue-100"
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <div className="flex justify-center border rounded-md border-blue-100 bg-white p-2">
              <Calendar
                mode="single"
                selected={newBlockedSlot.date}
                onSelect={(date) => date && setNewBlockedSlot({...newBlockedSlot, date})}
                className="mx-auto pointer-events-auto"
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
                className="border-blue-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <Input 
                id="end-time" 
                type="time"
                value={newBlockedSlot.endTime}
                onChange={(e) => setNewBlockedSlot({...newBlockedSlot, endTime: e.target.value})}
                className="border-blue-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="table-type">Table Type</Label>
            <Select 
              value={newBlockedSlot.tableType}
              onValueChange={handleTableTypeChange}
            >
              <SelectTrigger className="border-blue-100">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 border rounded-md border-blue-100 bg-blue-50/30">
                {Array.from({ length: tableQuantity }, (_, i) => i + 1).map(num => (
                  <div key={num} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm">
                    <Checkbox 
                      id={`table-${num}`} 
                      checked={selectedTableNumbers.includes(num)}
                      onCheckedChange={() => handleTableNumberToggle(num)}
                      className="border-blue-200"
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
          <Button onClick={onAddBlockedSlot} className="bg-blue-600 hover:bg-blue-700">Block Time Slot</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBlockedSlotDialog;
